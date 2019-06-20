import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Tag } from '../forum/interfaces/tag';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

constructor(
  private db: AngularFirestore,
) {}
  createTag(tag: Tag) {
    this.db.collection('tags').add(tag);
  }

  deleteTag(tagId: string) {
    return this.db.doc(`tags/${tagId}`).delete();
  }

  getTags(): Observable<Tag[]> {
    return this.db.collection<Tag>('tags')
      .snapshotChanges()
      .pipe(
        map(docs => docs.map(doc => ({ ...doc.payload.doc.data(), id: doc.payload.doc.id })))
      )
  }
  
}
