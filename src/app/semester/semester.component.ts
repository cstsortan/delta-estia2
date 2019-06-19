import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Semester } from 'src/app/models/semester';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '../services/data.service';
import { switchMap } from 'rxjs/operators';
import { Course } from '../models/course';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-semester',
  templateUrl: './semester.component.html',
  styleUrls: ['./semester.component.scss']
})
export class SemesterComponent implements OnInit {

  semester$: Observable<Semester>;

  courses$: Observable<Course[]>;

  constructor(private route: ActivatedRoute,
    private data: DataService,
    private cs: CourseService,
  ) {

  }

  ngOnInit() {
    this.semester$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.data.getSemester(params.get('id'));
      })
    );

    this.courses$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.cs.getCourses(params.get('id'));
      })
    );
  }

}
