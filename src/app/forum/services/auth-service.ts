import { Observable, of, from, combineLatest } from "rxjs";
import { AppUser } from "../interfaces/app-user";
import { lazyLoad } from "./firebase-service";
import { switchMap, first, map } from "rxjs/operators";
import { docData } from 'rxfire/firestore';
import { authState } from 'rxfire/auth';
import * as firebase from 'firebase/app';

export function getUser(userUid: string): Observable<AppUser> {
  return docData<AppUser>(firebase.firestore().doc(`users/${userUid}`), 'userUid');
}

  export function getAuthState() {
    return authState(firebase.auth())
      .pipe(
            map(user => {
            if(!user) return null;
            return {
                name: user.displayName,
                profilePhotoUrl: user.photoURL,
                userUid: user.uid,
            } as AppUser;
        })
      )
}

export async function startAuth(navigationFunc: () => void) {
    const [ui] = await Promise.all([import('firebaseui')]);
    navigationFunc();
    return {app: firebase, ui};
}