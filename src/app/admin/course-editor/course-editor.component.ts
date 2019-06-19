import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Observable } from 'rxjs';
import { Semester } from '../../models/semester';
import { CourseService } from '../../services/course.service';
import { Course } from 'src/app/models/course';

@Component({
  selector: 'app-course-editor',
  templateUrl: './course-editor.component.html',
  styleUrls: ['./course-editor.component.scss']
})
export class CourseEditorComponent implements OnInit {
  semesters$: Observable<Semester[]>;
  constructor(
    private data: DataService,
  ) {
    this.semesters$ = this.data.getSemesters();
  }

  ngOnInit() {
  }

}
