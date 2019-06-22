import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.css']
})
export class AuthModalComponent implements OnInit {

  constructor(
    private modalRef: NgbActiveModal,
  ) { }

  ngOnInit() {
  }

  signinSuccess() {
    this.modalRef.close();
  }

}
