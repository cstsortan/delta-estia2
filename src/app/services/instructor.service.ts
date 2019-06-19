import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Instructor } from '../models/instructor';
import { map, first, take } from 'rxjs/operators';
import { CourseService } from './course.service';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {

  constructor(
    private db: AngularFirestore,
    private cs: CourseService,
  ) { }

  getInstructors(): Observable<Instructor[]> {
    return this.db.collection('instructors', ref => ref.orderBy('name'))
      .snapshotChanges()
      .pipe(map(snapshots => {
        return snapshots.map(snap => {
          const data = snap.payload.doc.data() as Instructor;
          const id = snap.payload.doc.id;
          return {...data, id};
        });
      }));
  }

  getInstructor(id: string): Observable<Instructor> {
    return this.db.collection('instructors')
    .doc(id)
    .snapshotChanges()
    .pipe(map(snap => {
      return {
        ...snap.payload.data(),
        id: id,
      } as Instructor;
    }));
  }

  deleteInstructor(instructorId: string) {
    const p1 = this.db.collection('instructors').doc(instructorId).delete();

    // Removing instructor from their courses.
    const p2 = this.cs.getCourses(null, instructorId)
      .pipe(first(val => val != null))
      .toPromise()
      .then((courses: Course[]) => {
        return courses.map(course => {
          return this.cs.removeCourseInstructor(instructorId, course);
        });
      });
    return Promise.all([p1, p2]);
  }

  submitInstructor(instructor: Instructor) {
    return this.db.collection('instructors').add(instructor);
  }
}
