import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, CollectionReference} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Semester} from '../models/semester';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class DataService {

  constructor(private db: AngularFirestore) {}

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
}
