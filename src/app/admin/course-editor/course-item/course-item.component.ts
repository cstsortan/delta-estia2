import { Component, OnInit, Input } from '@angular/core';
import { Course } from '../../../models/course';
import { InstructorService } from '../../../services/instructor.service';
import { Observable } from 'rxjs';
import { Instructor } from 'src/app/models/instructor';
import { CourseService } from '../../../services/course.service';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss']
})
export class CourseItemComponent implements OnInit {

  @Input()
  course: Course;
  allInstructors$: Observable<Instructor[]>;

  constructor(
    private is: InstructorService,
    private cs: CourseService,
  ) { }

  ngOnInit() {
    this.allInstructors$ = this.is.getInstructors();
  }

  deleteCourse() {
    this.cs.deleteCourse(this.course.id);
  }

  addCourseInstructor(instructor: Instructor) {
    this.cs.addCourseInstructor(instructor, this.course);
  }

  removeCourseInstructor(instructor: Instructor) {
    this.cs.removeCourseInstructor(instructor.id, this.course);
  }
}
