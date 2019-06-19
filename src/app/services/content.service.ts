import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Content } from '../models/content';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  contentCol: AngularFirestoreCollection<Content>;
  userContentCol: AngularFirestoreCollection<Content>;

  constructor(
    private db: AngularFirestore,
  ) {
    this.contentCol = this.db.collection('content');
    this.userContentCol = this.db.collection('user-content');
  }

  getContent(): Observable<Content[]> {
    return this.db.collection('content', ref => ref.orderBy('timestamp', 'desc'))
    .snapshotChanges()
    .pipe(map(snapshots => {
      return snapshots.map(snap => {
        const data = snap.payload.doc.data() as Content;
        const id = snap.payload.doc.id;
        return {...data, id: id};
      });
    }));
  }

  getContentsOfType(type: string = 'other', courseId: string = ''): Observable<Content[]> {
    return this.db.collection('content', ref => ref.orderBy('name')
    .where('type', '==', type)
    .where('courseId', '==', courseId))
    .snapshotChanges()
    .pipe(map(snapshots => {
      return snapshots.map(snap => {
        const data = snap.payload.doc.data() as Content;
        const id = snap.payload.doc.id;
        return {...data, id: id};
      });
    }));
  }

  getCourseContent(courseId: string, type: string): Observable<Content[]> {
    return this.db.collection('content', ref => ref
      .orderBy('name')
      .where('courseId', '==', courseId)
      .where('type', '==', type))
    .snapshotChanges()
    .pipe(map(snapshots => {
      return snapshots.map(snap => {
        const data = snap.payload.doc.data() as Content;
        const id = snap.payload.doc.id;
        return {...data, id: id};
      });
    }));
  }

  addContent(content: Content) {
    return this.contentCol.add({
      ...content,
      timestamp: Date.now(),
    });
  }

  deleteContent(contentId: string) {
    return this.contentCol.doc(contentId).delete();
  }

  deleteUserContent(contentId: string) {
    return this.userContentCol.doc(contentId).delete();
  }

  publishUserContent(content: Content) {
    this.userContentCol.doc<Content>(content.id).update({isPublished: true, timestamp: Date.now()});
    this.addContent(content);
  }

  updateUserContent(content: Content) {
    console.log('should update');
    this.userContentCol.doc<Content>(content.id).update({...content, timestamp: Date.now()});
  }

  submitUserContent(content: Content) {
    return this.userContentCol.add({
      ...content,
      timestamp: Date.now(),
    });
  }

  getUserContent(): Observable<Content[]> {
    return this.db.collection('user-content', ref => ref.orderBy('timestamp', 'desc'))
    .snapshotChanges()
    .pipe(map(snapshots => {
      return snapshots.map(snap => {
        const data = snap.payload.doc.data() as Content;
        const id = snap.payload.doc.id;
        return {...data, id: id};
      });
    }));
  }


}
