import { Component, OnInit } from '@angular/core';
import { Content } from '../../../models/content';
import { AngularFireStorage, AngularFireUploadTask, AngularFireStorageReference } from '@angular/fire/storage';
import { UploadTask, UploadTaskSnapshot } from '@angular/fire/storage/interfaces';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { CourseService } from '../../../services/course.service';
import { Course } from '../../../models/course';
import { ContentService } from '../../../services/content.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-content-form',
  templateUrl: './content-form.component.html',
  styleUrls: ['./content-form.component.scss']
})
export class ContentFormComponent implements OnInit {

  courses$: Observable<Course[]>;

  constructor(
    private storage: AngularFireStorage,
    private cs: CourseService,
    private content: ContentService,
    private activeModal: NgbActiveModal,
  ) { }

  currentFilePercentage: Observable<number>;
  currentFileUrl: Observable<string>;
  currentContent: Content;
  currentFile: File;

  isUploading = false;
  isUploaded = false;

  ngOnInit() {
    this.courses$ = this.cs.getCourses();
    this.currentContent = {
      name: '',
      description: '',
      fileLink: '',
      courseId: '',
      otherLink: '',
      type: 'other',
    };
  }

  fileAdded(event) {
    this.currentFile = event.target.files[0] as File;
    const filePath = `content_files/${Date.now()}_${this.currentFile.name.replace(' ', '')}`;
    const ref: AngularFireStorageReference = this.storage.ref(filePath);
    const task = ref.put(this.currentFile);
    task.snapshotChanges().pipe(
      finalize(() => {
        this.currentFileUrl = ref.getDownloadURL();
        this.currentFileUrl.toPromise().then(url => this.currentContent.fileLink = url);
        this.isUploading = false;
        this.isUploaded = true;
      })
    ).subscribe();
    //   task.then(snap => {
    // });
    this.isUploading = true;
    this.currentFilePercentage = task.percentageChanges();
  }

  submit() {
    if (!this.validate) {
      return;
    }
    this.content.addContent(this.currentContent);
    this.reset();
  }

  get validate() {
    if (this.isUploading) {
      return false;
    }
    return true;
  }

  reset() {
    this.currentContent.courseId = '';
    this.currentContent.description = '';
    this.currentContent.fileLink = '';
    this.currentContent.otherLink = '';
    this.currentContent.name = '';
    this.currentFile = null;
    this.currentFilePercentage = null;
    this.currentFileUrl = null;
    this.currentContent.type = 'other';
    this.isUploaded = false;
  }

  closeModal() {
    this.activeModal.close();
  }
}
