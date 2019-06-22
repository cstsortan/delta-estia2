import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Semester } from './models/semester';
import { DataService } from './services/data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserFacingContentFormComponent } from './user-facing-content-form/user-facing-content-form.component';
import { Components } from 'cstsortan-components';
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  faBars = faBars;

  semesters$: Observable<Semester[]>;

  isAdmin$: Observable<boolean>;

  @ViewChild('drawer', {static: false}) drawer: ElementRef<Components.SideDrawer>;

  @ViewChild('modal', {static: false}) csModal: ElementRef<Components.CsModal>;

  constructor(
    private data: DataService,
    private modal: NgbModal,
  ) {
    this.semesters$ = data.getSemesters();
    this.isAdmin$ = data.isAdmin();
  }

  openDrawer() {
    this.drawer.nativeElement.openDrawer();
  }

  openUserFacingContentForm() {
    this.modal.open(UserFacingContentFormComponent);
  }

  openModal() {
    this.csModal.nativeElement.openModal();
  }

}
