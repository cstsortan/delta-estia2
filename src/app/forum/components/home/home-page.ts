import { LitElement, html, property, css, customElement } from "lit-element";
import { store } from "../../store";
import { Route, routes } from "../../routes";
import { toggleBottomSheet } from "../../actions/layout-actions";
import { navigate } from "../../actions/router-actions";
import { Post } from "../../interfaces/Post";
import * as ui from 'firebaseui';
import * as firebase from 'firebase/app';

const dbUi = new ui.auth.AuthUI(firebase.auth());

export class HomePage extends LitElement {
    @property({
        reflect: false,
    })
    scrolled!: boolean ;

    @property({
        reflect: false,
    })
    route!: Route;

    @property({
        reflect:false,
    })
    sheetOpen: boolean = true;

    @property({
        reflect: false,
    })
    posts!: Post[];

    @property({reflect: false})
    selectedPost!: Post | null;

    connectedCallback() {
        super.connectedCallback();
        document.addEventListener('scroll', (e: any) => {
            this.scrolled = e.target.scrollingElement.scrollTop > 0;
        });
        this._stateChanged();
        store.subscribe(() => {
            this._stateChanged();
        });

        if (dbUi.isPendingRedirect()) {
            this.requestLogin();
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback();
    }

    _stateChanged() {
        this.route = store.getState().router;
        this.sheetOpen = store.getState().layout.sheetOpen;
        this.posts = store.getState().postsList.posts;
        this.selectedPost = store.getState().postsList.selectedPost;
    }

    openNewPostForm() {
        if(store.getState().auth) {
            store.dispatch(navigate('new-post'));
        }
        else {
            this.requestLogin();
        }
    }

    requestLogin = () => {
        this.dispatchEvent(new CustomEvent('should-login'));
    }

    static get styles() {
        return css`
        app-bar {
                position: fixed;
                display: block;
                width: 100%;
                top: 0;
                left: 0;
                right: 0;
                transition: box-shadow 0.2s;
                z-index: 1;
            }
            posts-list, df-tags-list {
                display: block;
                width: 100%;
                flex: 8;
                margin-top: 10px;
            }
            .shadow {
                box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
            }
            .btn-new-post {
                margin-right: 5px;
                padding: 3px;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: #ECEDEE
            }
            buttom-sheet {
                position: fixed;
            }
            .page-container {
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
            }
            df-tag-header-bar {
                display: block;
                margin-top: 47px;
            }
            .topPadding {
                height: 46px;
                display: block;
            }
            @media only screen and (min-width: 800px) {
                bottom-sheet.sheet {
                    display: none;
                }
                .page-container {
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                }
                posts-list {
                    flex: 12;
                }
                .side-spacing {
                    flex: 2;
                }
                .btn-new-post {
                    display: none;
                }
            }

        `;
    }

    render() {
        if(!this.route.tag) {
            if(this.route.routeName === "new-post") {
                return html`
                    <df-post-form></df-post-form>
                `;
            }
            else if(this.route.routeName === 'auth') {
                return html`
                    <df-auth></df-auth>
                `;
            }
            else if(this.route.routeName === 'post-page') {
                return html`<post-page @should-login=${this.requestLogin} .post="${this.selectedPost}"></post-page>`;
            } else {
                return html`
                    <h1>Hold on! This route isn't there yet!</h1>
                `;
            }
        }

        const showBottomTags = this.route.tag.id !== 'tags';

        let renderedPage;
        if(this.route.tag.id === 'tags') {
            renderedPage = html`
            <df-tags-list>Tags...</df-tags-list>
            `;
        } else {
            renderedPage = html`
            <posts-list .posts="${this.posts}" class="no-scroll"></posts-list>
            `;
        }

        return html`
        <app-bar class="${this.scrolled ? 'shadow' : ''}">
            <div @click="${() => this.openNewPostForm()}" class="btn-new-post" slot="end">
                +
            </div>
            <div @click="${() => this.handleBarTitleClick()}">${this.route.tag.name}</div>
        </app-bar>
        ${this.route.tag!==null 
            && this.route.tag !== routes[0] 
            && this.route.tag !== routes[1] 
            ? html`<df-tag-header-bar .tag="${this.route.tag}"></df-tag-header-bar>`:html`<div class="topPadding"></div>`}
        <div class="page-container">
            <div class="side-spacing"></div>
            ${renderedPage}
            <div class="side-spacing"></div>
        </div>
        <bottom-sheet
            class="sheet"
            @bs-close="${() => this.handleSheetClose()}" 
            .open="${this.sheetOpen}">
            <df-bottom-options
            .showTags="${showBottomTags}"></df-bottom-options>
        </bottom-sheet>
        `;
    }

    handleBarTitleClick() {
        console.log("Clicked");
        store.dispatch(toggleBottomSheet());
        // document.body.style.overflowY = 'hidden';
    }

    handleSheetClose() {
        store.dispatch(toggleBottomSheet());
        // document.body.style.overflowY = 'unset';
    }
}

customElements.define('home-page', HomePage);