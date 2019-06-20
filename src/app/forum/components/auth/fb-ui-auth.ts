import * as firebase from 'firebase/app';
import { AppUser } from "../../interfaces/app-user";

export class DfUiAuth extends HTMLElement {

    async connectedCallback() {
        const [ui] = await Promise.all([import('firebaseui')]);
        const fbUi = ui.auth.AuthUI.getInstance() ||  new ui.auth.AuthUI(firebase.auth());
        fbUi.start(this, {
            signInOptions: [
                {
                    provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                    authMethod: 'https://accounts.google.com',
                    clientId: '975027577006-qi4o5qo01uflacv6osvo42appm6jmg2u.apps.googleusercontent.com',
                },
                {
                    provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                    requireDisplayName: true,
                }
            ],
            signInFlow: 'popup',
            credentialHelper: ui.auth.CredentialHelper.GOOGLE_YOLO,
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
