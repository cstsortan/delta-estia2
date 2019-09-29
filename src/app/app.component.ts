import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Semester } from './models/semester';
import { DataService } from './services/data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserFacingContentFormComponent } from './user-facing-content-form/user-facing-content-form.component';
import { Components } from 'cstsortan-components';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { User } from 'firebase/app';
import { AuthService } from './services/auth.service';
import { ModalController } from '@ionic/angular';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  faBars = faBars;

  semesters$: Observable<Semester[]>;

  isAdmin$: Observable<boolean>;
  authState$: Observable<User>;

  @ViewChild('drawer', {static: false}) drawer: ElementRef<Components.SideDrawer>;

  @ViewChild('modal', {static: false}) csModal: ElementRef<Components.CsModal>;

  constructor(
    private data: DataService,
    private authService: AuthService,
    private modal: NgbModal,
    private router: Router,
  ) {
    this.semesters$ = data.getSemesters();
    this.isAdmin$ = data.isAdmin();
    this.authState$ = authService.getAuthState();
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

  logout() {
    this.authService.logout();
  }

  async openCourses() {
    const sems = await this.semesters$.pipe(first()).toPromise();
    if (sems && sems.length > 0) {
      this.router.navigate([`semester`, sems[0].id])
    }
  }

}