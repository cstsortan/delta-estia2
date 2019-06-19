import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Semester } from './models/semester';
import { DataService } from './services/data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserFacingContentFormComponent } from './user-facing-content-form/user-facing-content-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  semesters$: Observable<Semester[]>;

  constructor(
    private data: DataService,
    private modal: NgbModal,
  ) {
    this.semesters$ = data.getSemesters();
  }

  openUserFacingContentForm() {
    this.modal.open(UserFacingContentFormComponent);
  }

}
