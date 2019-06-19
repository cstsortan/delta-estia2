import { Component, OnInit } from '@angular/core';
import { AngularFireStorageReference, AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course.service';
import { ContentService } from 'src/app/services/content.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Content } from 'src/app/models/content';

@Component({
  selector: 'app-user-facing-content-form',
  templateUrl: './user-facing-content-form.component.html',
  styleUrls: ['./user-facing-content-form.component.scss']
})
export class UserFacingContentFormComponent implements OnInit {

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
    const filePath = `user_content_files/${Date.now()}_${this.currentFile.name.replace(' ', '')}`;
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
    this.isUploading = true;
    this.currentFilePercentage = task.percentageChanges();
  }

  submit() {
    if (!this.validate) {
      return;
    }
    this.content.submitUserContent(this.currentContent);
    this.closeModal();
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
