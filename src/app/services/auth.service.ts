import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DataService } from './data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthModalComponent } from '../auth-modal/auth-modal.component';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(
        private auth: AngularFireAuth,
        private db: AngularFirestore,
        private dataService: DataService,
        private ngbModal: NgbModal,
    ) {
    }

    isAdmin(): Observable<boolean> {
        return this.dataService.isAdmin();
    }

    openLoginModal() {
        this.ngbModal.open(AuthModalComponent, {
            centered: true,
            windowClass: 'h-100',
            size: 'lg'
        })
    }
}