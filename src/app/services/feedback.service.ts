import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

@Injectable({
    providedIn: "root"
})
export class FeedbackService {
    constructor(
        private db: AngularFirestore,
    ) {
    }

    userFeedbackExists() {
        return !!localStorage.getItem('feedback-0');
    }

    async setUserFeedback(like: boolean, comment: string) {
        const auth = firebase.auth();
        try {
            const user = auth.currentUser || (await auth.signInAnonymously()).user;
            await this.db.collection('user-feedback').doc(user.uid).set({
                like,
                comment
            });
            localStorage.setItem('feedback-0', JSON.stringify({like, comment}));
            if (user.isAnonymous) {
                await auth.signOut();
            }
        } catch (error) {
            console.log(error);
            if (auth.currentUser && auth.currentUser.isAnonymous) {
                await auth.signOut();
            }
        }
    }
}
