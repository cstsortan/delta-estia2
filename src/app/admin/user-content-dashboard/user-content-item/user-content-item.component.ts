import { Component, OnInit, Input } from '@angular/core';
import { Content } from '../../../models/content';
import { Observable } from 'rxjs';
import { Course } from 'src/app/models/course';
import { CourseService } from '../../../services/course.service';
import { ContentService } from '../../../services/content.service';

@Component({
  selector: 'app-user-content-item',
  templateUrl: './user-content-item.component.html',
  styleUrls: ['./user-content-item.component.scss']
})
export class UserContentItemComponent implements OnInit {

  @Input()
  content: Content;

  course$: Observable<Course>;

  courses$: Observable<Course[]>;

  isEditing = false;
  editableContent: Content;

  constructor(
    private courseService: CourseService,
    private contentService: ContentService,
  ) { }

  ngOnInit() {
    this.course$ = this.courseService.getCourse(this.content.courseId);
    this.courses$ = this.courseService.getCourses();
    this.editableContent = this.content;
  }

  publish() {
    this.contentService.publishUserContent(this.content);
  }

  delete() {
    this.contentService.deleteUserContent(this.content.id);
  }

  save() {
    this.contentService.updateUserContent(this.editableContent);
    this.isEditing = false;
  }

  cancel() {
    this.isEditing = false;
    this.editableContent = this.content;
  }

  edit() {
    this.isEditing = true;
  }

}
