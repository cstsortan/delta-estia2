import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, CollectionReference} from '@angular/fire/firestore';
import {Observable, of} from 'rxjs';
import {Semester} from '../models/semester';
import {map, switchMap, tap} from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({providedIn: 'root'})
export class DataService {

  constructor(
    private db: AngularFirestore,
    private auth: AngularFireAuth,
  ) {}

  getSemesters(): Observable <Semester[]> {
    return this.db.collection('semesters', ref => ref.orderBy('count'))
      .stateChanges()
      .pipe(map(snapshots => {
        return snapshots.map(snap => {
          const data = snap.payload.doc.data() as Semester;
          const id = snap.payload.doc.id;
          return {...data, id};
        });
      }));
  }

  getSemester(id: string): Observable<Semester> {
    return this.db.collection('semesters')
    .doc<Semester>(id)
    .valueChanges()
    .pipe(
      map<{}, Semester>((sem: Semester) => ({...sem, id}))
    );
  }

  getFoodStatus(): Observable<string> {
    return this.db.doc<any>('status/food').valueChanges()
    .pipe(map(data => data.currentSchedule as string))
  }

  updateFoodStatus(imageUrl: string) {
    return this.db.doc<any>('status/food')
      .update({
        currentSchedule: imageUrl,
      })
  }

  isAdmin(): Observable<boolean> {
    return this.auth.authState.pipe(
      tap(console.log),
      switchMap(authState => {
        if (!authState) {
          return of(false);
        }
        return this.db.collection('users').doc<any>(authState.uid)
          .valueChanges().pipe(
            tap(console.log),
            map(data => data.isAdmin === true),
          );
      }),
      tap(console.log)
    );
  }
}
