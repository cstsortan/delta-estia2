import { Component, OnInit } from '@angular/core';
import { InstructorService } from '../../services/instructor.service';
import { Instructor } from 'src/app/models/instructor';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-instructors-editor',
  templateUrl: './instructors-editor.component.html',
  styleUrls: ['./instructors-editor.component.scss']
})
export class InstructorsEditorComponent implements OnInit {
  instructors$: Observable<Instructor[]>;
  currentInstructor: Instructor = {
    name: '',
    link: '',
  };

  constructor(
    private instr: InstructorService,
  ) {
    this.instructors$ = this.instr.getInstructors();
  }

  ngOnInit() {
  }

  deleteInstructor(instructor: Instructor) {
    this.instr.deleteInstructor(instructor.id);
  }

  submitInstructor() {
    this.instr.submitInstructor(this.currentInstructor);
    this.currentInstructor.name = '';
    this.currentInstructor.link = '';
  }

}
