import { LitElement, html, property } from "lit-element";
import { LoginInfo, RegisterInfo } from "./auth-info";
import { store } from "../../store";
import { navigate } from "../../actions/router-actions";
import { routes } from "../../routes";


export class DfAuth extends LitElement {

    @property()
    isSignIn: boolean = false; // OR signup?

    @property()
    useFirebaseUI: boolean = true;

    @property()
    loginInfo: LoginInfo = {
        email: '',
        password: '',
    }

    @property()
    registerInfo: RegisterInfo = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    }

    handleLogin() {
        console.log(this.loginInfo);
        this.dispatchEvent(new CustomEvent('df-login', {
            detail: {
                info: this.loginInfo,
            }
        }));
    }

    handleRegister() {
        console.log(this.registerInfo);
    }

    _signInSuccess() {
        store.dispatch(navigate(routes[0]));
    }

    render() {
        return html`
        <style>
            /* @import url('https://cdn.firebase.com/libs/firebaseui/3.4.1/firebaseui.css'); */
            :host {
                height: 100%;
                display: flex;
                flex-direction: column;
            }
            app-bar {
                flex: 0;
            }
            .background {
                z-index: 2;
                flex: 1;
                background-color: #ECEDEE;
            }
            .form-container {
            display: flex;
            flex-direction: column;
            width: 100%;
            }
            .df-form {
            text-align: center;
            padding: 15px;
            font-size: 16px;
            color: black;
            background-color: #FFFFFF;
            border: none;
            border-radius: 3px;
            margin: 8px 30px;
            }
            .df-form-btn {
                background-color: #4E92DF;
                padding: 15px;
                font-size: 18px;
                color: white;
                border: none;
                border-radius: 3px;
                margin: 8px 30px;
                cursor: pointer;
            }
            .df-form::placeholder {
            color: #7A8185;
            }

            .switch-btn {
                background-color: transparent;
                font-size: 18px;
                color: #4E92DF;
                border: none;
                border-radius: 3px;
                cursor: pointer;
                width: 100%;
                display: flex;
                justify-content: center;
                margin-top: 16px;
                outline: none;
                transition: opacity 0.1s;
            }
            .switch-btn:active {
                opacity: 0.5;
            }
            
            .back-btn {
                background-color: transparent;
                font-size: 14px;
                color: #4E92DF;
                border: none;
                border-radius: 3px;
                cursor: pointer;
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                outline: none;
                transition: opacity 0.1s;
                margin-left: 5px;
            }
            .back-btn:active {
                opacity: 0.5;
            }
            
        </style>
        <app-bar>
        SIGN IN
        <div
        @click="${() => store.dispatch(navigate(routes[0]))}"
        class="back-btn" slot="start">back</div>
        </app-bar>
        ${this.useFirebaseUI ? html`<df-ui-auth @signin-success="${() => this._signInSuccess()}"></df-ui-auth>` : this._buildAuthForm()}
        `;
    }


    _buildAuthForm() {
        return html`
        <div class="background">
            <form class="form-container">
                ${this.isSignIn ? html`

                    <!-- Login form -->
                    <input .value="${this.loginInfo.email}"
                    @change="${(e: any) => this.loginInfo.email = e.target.value}"
                    name="email" 
                    class="df-form" 
                    placeholder="Email">

                    <input @change="${(e: any) => this.loginInfo.password = e.target.value}"
                    .value="${this.loginInfo.password}" 
                    name="password" class="df-form" placeholder="Password">

                    <input @click="${() => this.handleLogin()}" class="df-form-btn" type="button" value="Login">
                ` 
                
                : html`
                    <!-- Register form -->
                    <input @change="${(e: any) => this.registerInfo.name = e.target.value}"
                    .value="${this.registerInfo.name}" 
                    name="name" class="df-form" placeholder="Name">

                    <input @change="${(e: any) => this.registerInfo.email = e.target.value}"
                    .value="${this.registerInfo.email}" 
                    name="email" class="df-form" placeholder="Email">

                    <input @change="${(e: any) => this.registerInfo.password = e.target.value}"
                    .value="${this.registerInfo.password}" 
                    name="password" class="df-form" placeholder="Password">

                    <input @change="${(e: any) => this.registerInfo.confirmPassword = e.target.value}"
                    .value="${this.registerInfo.confirmPassword}" 
                    name="passrepeat" class="df-form" placeholder="Confirm Password">

                    <input @click="${() => this.handleRegister()}" class="df-form-btn" type="button" value="Register">
                    
                `}            
            </form>
            <button 
            @click="${() => this.isSignIn = !this.isSignIn}"
            class="switch-btn">
            ${this.isSignIn ? "I don't have any account ": "I already have an account"}</button>
        </div>
        `
    }
}
customElements.define('df-auth', DfAuth);