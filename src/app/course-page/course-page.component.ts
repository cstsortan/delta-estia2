import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CourseService } from '../services/course.service';
import { Observable } from 'rxjs';
import { Course } from '../models/course';
import { switchMap } from 'rxjs/operators';
import { InstructorService } from '../services/instructor.service';
import { Instructor } from '../models/instructor';
import { ContentService } from '../services/content.service';
import { Content } from '../models/content';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.scss']
})
export class CoursePageComponent implements OnInit {

  course$: Observable<Course>;

  lectureNotes$: Observable<Content[]>;

  questions$: Observable<Content[]>;

  courseMaterial$: Observable<Content[]>;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private contentService: ContentService,
  ) { }

  ngOnInit() {
    this.course$ = this.route.paramMap.pipe(
      switchMap((paramMap: ParamMap) => {
        return this.courseService.getCourse(paramMap.get('id'));
      })
    );

    this.lectureNotes$ = this.route.paramMap
    .pipe(
      switchMap(params => {
        return this.contentService.getCourseContent(params.get('id'), 'notes');
      })
    );

    this.questions$ = this.route.paramMap
    .pipe(
      switchMap(params => {
        return this.contentService.getCourseContent(params.get('id'), 'questions');
      })
    );

    this.courseMaterial$ = this.route.paramMap
    .pipe(
      switchMap(params => {
        return this.contentService.getContentsOfType('material', params.get('id'));
      })
    );
  }

}
