import { Component, OnInit, Input } from '@angular/core';
import { Semester } from '../../../models/semester';
import { Observable } from 'rxjs';
import { CourseService } from '../../../services/course.service';
import { Course } from 'src/app/models/course';
import { InstructorService } from '../../../services/instructor.service';

@Component({
  selector: 'app-semester-courses',
  templateUrl: './semester-courses.component.html',
  styleUrls: ['./semester-courses.component.scss']
})
export class SemesterCoursesComponent implements OnInit {

  @Input()
  semester: Semester;

  newCourse: Course;

  courses$: Observable<Course[]>;

  constructor(
    private cs: CourseService,
    private is: InstructorService,
  ) { }

  ngOnInit() {
    this.courses$ = this.cs.getCourses(this.semester.id);
    this.newCourse = {
      name: '',
      semesterId: this.semester.id,
    };
  }

  addCourse() {
    this.cs.addCourse(this.newCourse);
    this.newCourse.name = '';
  }

}
