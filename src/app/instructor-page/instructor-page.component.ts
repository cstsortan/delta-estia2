import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { Instructor } from '../models/instructor';
import { Course } from '../models/course';
import { CourseService } from '../services/course.service';
import { switchMap } from 'rxjs/operators';
import { InstructorService } from '../services/instructor.service';

@Component({
  selector: 'app-instructor-page',
  templateUrl: './instructor-page.component.html',
  styleUrls: ['./instructor-page.component.scss']
})
export class InstructorPageComponent implements OnInit {

  instructor$: Observable<Instructor>;

  courses$: Observable<Course[]>;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private instructorService: InstructorService,
  ) { }

  ngOnInit() {
    this.instructor$ = this.route.paramMap
    .pipe(switchMap((paramMap: ParamMap) => {
      return this.instructorService.getInstructor(paramMap.get('id'));
    }));

    this.courses$ = this.route.paramMap
    .pipe(switchMap((paramMap: ParamMap) => {
      return this.courseService.getCourses(null, paramMap.get('id'));
    }));
  }

}
