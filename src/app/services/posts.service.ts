import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Post } from '../models/post';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { PostComment } from '../models/post-comment';
import { tap, map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

constructor(
  private db: AngularFirestore,
  private auth: AngularFireAuth,
  private router: Router,
  private authService: AuthService,
) {}

  getPosts(limit: number = 10): Observable<Post[]> {
    console.log(limit)
    return this.db.collection<Post>('posts', ref => ref.orderBy('timestamp', 'desc').limit(limit))
    .snapshotChanges()
    .pipe(
      map(docs => docs.map(doc => ({
        id: doc.payload.doc.id,
        ...doc.payload.doc.data(),
      } as Post))),
    )
  }

  async makePost(post: Post) {
    const id = this.db.createId();
    return this.db.collection<Post>('posts').doc(id).set({
      ...post,
      id,
      timestamp: firebase.firestore.FieldValue.serverTimestamp() as any,
    } as Post);
  }

  async postComment(postId: string, text: string) {
    const user = firebase.auth().currentUser;
    if (!user) {
      this.authService.openLoginModal();
      return;
    }

    const commentId = this.db.createId();
    this.db.doc(`posts/${postId}/comments/${commentId}`).set({
      id: commentId,
      authorName: user.displayName||null,
      photoUrl: user.photoURL||null,
      text,
      timestamp: firebase.firestore.FieldValue.serverTimestamp() as any,
      userUid: user.uid,
    } as PostComment)
  }

  getComments(postId: string): Observable<PostComment[]> {
    return this.db.collection<PostComment>(`posts/${postId}/comments`, ref => ref.orderBy('timestamp'))
      .snapshotChanges()
      .pipe(
        map(docs => docs.map(doc => ({
          id: doc.payload.doc.id,
          ...doc.payload.doc.data(),
        } as PostComment))),
      );
  }
}
