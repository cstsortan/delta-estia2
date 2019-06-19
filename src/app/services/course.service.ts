import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Course } from 'src/app/models/course';
import { map } from 'rxjs/operators';
import { Instructor } from '../models/instructor';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  coursesCol: AngularFirestoreCollection<Course>;

  constructor(
    private db: AngularFirestore
  ) {
    this.coursesCol = db.collection('courses');
   }

   getCourse(courseId: string): Observable<Course> {
    return this.coursesCol.doc<Course>(courseId)
      .snapshotChanges()
      .pipe(map(snapshot => ({
        ...(snapshot.payload.data()),
        id: snapshot.payload.id,
      })));
   }

   getCourses(semesterId: string = null, instructorId: string = null): Observable<Course[]> {
    return this.db.collection<Course>('courses', ref => {
      if (semesterId === null && instructorId === null) {
        return ref.orderBy('name');
      } else if (semesterId !== null && instructorId === null) {
        return ref.where('semesterId', '==', semesterId);
      } else if (semesterId === null && instructorId !== null) {
        return ref.where(`instructors.${instructorId}.id`, '==', instructorId);
      } else if (semesterId !== null && instructorId !== null) {
        return ref.where('semesterId', '==', semesterId)
        .where(`instructors.${instructorId}.id`, '==', instructorId);
      } else {
        return ref;
      }
      // return!semesterId ? ref.orderBy('name') : ref.where('semesterId', '==', semesterId);
    })
    .snapshotChanges()
    .pipe(map(snapshots => {
      return snapshots.map(snap => {
        const data = snap.payload.doc.data() as Course;
        const id = snap.payload.doc.id;
        return {...data, id};
      });
    }));
   }

   addCourse(course: Course) {
    return this.coursesCol.add(course);
   }

   deleteCourse(courseId: string) {
    return this.coursesCol.doc(courseId).delete();
   }

   addCourseInstructor(instructor: Instructor, course: Course) {
    const data = course;
    data.instructors = {
      ...(data.instructors),
      [instructor.id]: instructor
    };
    return this.coursesCol.doc(course.id).set(data, {merge: true});
   }

  removeCourseInstructor(instructorId: string, course: Course) {
    const data = course;
    data.instructors[instructorId] = firebase.firestore.FieldValue.delete();
    return this.coursesCol.doc(course.id).set(data, {merge: true});
  }
}
