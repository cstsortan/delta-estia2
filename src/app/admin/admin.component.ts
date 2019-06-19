import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs';
import { Course } from 'src/app/models/course';
import { Instructor } from 'src/app/models/instructor';
import { InstructorService } from '../services/instructor.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  courses$: Observable<Course[]>;

  instructors$: Observable<Instructor[]>;

  constructor(private data: DataService, private instr: InstructorService) {
    this.instructors$ = this.instr.getInstructors();
  }

  ngOnInit() {
  }



}
