import * as firebase from 'firebase/app';
import { AppUser } from "../../interfaces/app-user";
import * as ui from 'firebaseui';

export class DfUiAuth extends HTMLElement {
    connectedCallback() {
        const fbUi = ui.auth.AuthUI.getInstance() ||  new ui.auth.AuthUI(firebase.auth());
        fbUi.start(this, {
            signInOptions: [
                {
                    provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                    authMethod: 'https://accounts.google.com',
                    clientId: '24506276035-7jlkfpoeqksbdi5koloaj9h94fak1npp.apps.googleusercontent.com',
                },
                {
                    provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                    requireDisplayName: true,
                }
            ],
            signInFlow: 'popup',
            credentialHelper: ui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM,
            callbacks: {
                signInSuccessWithAuthResult: (authResult, redirectUrl) => {
                    const user = authResult.user as firebase.User;
                    const credential = authResult.credential;
                    const isNewUser = authResult.additionalUserInfo.isNewUser;
                    const providerId = authResult.additionalUserInfo.providerId;
                    const operationType = authResult.operationType;

                    if(isNewUser) {
                        firebase.firestore().collection('users')
                            .doc(user.uid)
                            .set({
                                name: user.displayName,
                                profilePhotoUrl: user.photoURL
                            } as AppUser);
                    }

                    this.dispatchEvent(new CustomEvent('signin-success'));

                    return false;
                }
            },
        });

    }
}
customElements.define('df-ui-auth', DfUiAuth);
