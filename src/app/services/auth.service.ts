import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DataService } from './data.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(
        private auth: AngularFireAuth,
        private db: AngularFirestore,
        private dataService: DataService,
    ) {
    }

    isAdmin(): Observable<boolean> {
        return this.dataService.isAdmin();
    }
}