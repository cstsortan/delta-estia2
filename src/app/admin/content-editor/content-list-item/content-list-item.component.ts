import { Component, OnInit, Input } from '@angular/core';
import { Content } from 'src/app/models/content';
import { Observable } from 'rxjs';
import { Course } from 'src/app/models/course';
import { CourseService } from '../../../services/course.service';
import { ContentService } from '../../../services/content.service';

@Component({
  selector: 'app-content-list-item',
  templateUrl: './content-list-item.component.html',
  styleUrls: ['./content-list-item.component.scss']
})
export class ContentListItemComponent implements OnInit {

  @Input()
  content: Content;

  course$: Observable<Course>;

  constructor(
    private cs: CourseService,
    private contentService: ContentService,
  ) { }

  ngOnInit() {
    if (this.content.courseId !== '') {
      this.course$ = this.cs.getCourse(this.content.courseId);
    }
  }

  delete() {
    this.contentService.deleteContent(this.content.id);
  }

}
