import { LitElement, html, property } from "lit-element";
import { store } from "../../../store";
import { Post } from "../../../interfaces/post";
import { getState$ } from "../../../utils/get-state";
import { switchMap, first, map } from "rxjs/operators";
import { getPostDoc, getPostResponses, addPostResponse } from "../../../services/posts-service";
import { Subscription } from "rxjs";
import { navigate } from "../../../actions/router-actions";
import { routes } from "../../../routes";
import { AppUser } from "../../../interfaces/app-user";
import { PostResponse } from "../../../interfaces/post-response";
import { repeat } from "lit-html/directives/repeat";
import { PostsState } from "../../../reducers/posts-list-reducer";
import * as equals from 'fast-deep-equal';

export class PostPage extends LitElement {

    @property()
    post!: Post;

    @property({
        reflect: false,
    })
    auth!: AppUser | null;

    @property({
        reflect: false
    })
    responses: PostResponse[] = [];

    @property()
    responseText: string = "";


    _storeSub!: Subscription;
    _responsesSub!: Subscription;
    connectedCallback() {
        super.connectedCallback();
        this._storeSub = getState$(store).subscribe((state: any) => {
            this.auth = state.auth as AppUser|null;
            this.post = (state.postsList as PostsState).selectedPost!;
        });

        this._responsesSub = getState$(store).pipe(
            first((state: any) => !equals((state.postsList as PostsState).selectedPost, null)),
            map((state: any) => state.postsList.selectedPost),
            switchMap((post: Post) => getPostResponses(post.id!))
        ).subscribe(responses => this.responses = responses);

    }

    disconnectedCallback() {
        this._storeSub.unsubscribe();
        if(this._responsesSub) this._responsesSub.unsubscribe();
        super.disconnectedCallback();
    }

    _navigateBack() {
        store.dispatch(navigate(routes[0]));
    }

    _navigateToAuth() {
        store.dispatch(navigate('auth'));
    }

    _sendResponse() {
        console.log(this.responseText);
        if(this.responseText === '') return;
        if(this.auth) addPostResponse(this.post, this.responseText, this.auth);
        this.responseText = '';
    }

    render() {
        if(!this.post) {
            return html`<h1></h1>`;
        }
        return html`
        <style>
        :host {
            display: flex;
            height: 100%;
            flex-direction: column;
        }
        .center-child {
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .back-btn {
            color: #6EA6E6;
            font-size: 14px;
            padding: 8px;
            height: 100%;
            cursor: pointer;
        }
        div.content {
            flex: 1;
            overflow-y: auto;
        }
        .tag-card {
            height: 102px;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            align-items: center;
            margin-bottom: 18px;
        }
        .tag-name {
            background-color: white;
            border-radius: 5px;
            font-size: 13px;
            padding: 4px;
        }
        .tag-desc {
            color: white;
            font-size: 15px;
        }
        .author-info {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
        }
        .info-start {
            width: auto;
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0 10px;
        }
        img {
            display: block;
            margin: auto;
            border-radius: 50%;
            height: 36px;
        }
        .alternative {
            display: block;
            margin: auto;
            border-radius: 50%;
            background-color: #ECEDEE;
            height: 36px;
            width: 36px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #7A8185;
            }
        .info-name {
            flex: 1;
        }
        .post-text {
            font-size: 16px;
            padding: 10px;
            border-top: 1px solid #ECEDEE;
            border-bottom: 1px solid #ECEDEE;
        }
        .auth-btn {
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            font-size: 16px;
            background-color: #007ACC;
            cursor: pointer;
        }
        .space {
            height: 20px;
        }
        </style>
        <app-bar>
            <div class="center-child" slot="start">
                <div class="back-btn center-child" @click="${() => this._navigateBack()}">
                    back
                </div>
            </div>
            <div>${this.post.title.substring(0, 15) || this.post.title}...</div>
            <div slot="end"></div>
        </app-bar>
        <div class="content">
            <!-- The card with Tag info -->
            <div .style="background-color: ${this.post.tag!.colour}" 
                class="tag-card">
                <div .style="color: ${this.post.tag!.colour}" 
                class="tag-name">${this.post.tag!.name}</div>

                <div class="tag-desc">${this.post.title}</div>
            </div>

            <!-- Author Info -->
            <div class="author-info">
                <div class="info-start">
                    ${this.post.author!.profilePhotoUrl 
                        ? html`<img src="${this.post.author!.profilePhotoUrl}">`
                        : html `<div class="alternative">${this.post.author!.name[0]}</div>`
                    }
                </div>
                <div class="info-name">
                    ${this.post.author!.name}
                </div>
            </div>

            <!-- Post Text here -->
            <div class="post-text">
                ${this.post.text}
            </div>

            <div class="space"></div

            <!-- Responses -->
            ${repeat(this.responses, response => response.id, response => html`
                <!-- Author Info -->
                <div class="author-info">
                    <div class="info-start">
                        ${response.author!.profilePhotoUrl 
                            ? html`<img src="${response.author!.profilePhotoUrl}">`
                            : html `<div class="alternative">${response.author!.name[0]}</div>`
                        }
                    </div>
                    <div class="info-name">
                        ${response.author!.name}
                    </div>
                </div>

                <!-- Post Text here -->
                <div class="post-text">
                    ${response.text}
                </div>
            `)}
        </div>
        ${
            this.auth ? html`
                <style>
                    .reply-input {
                    flex: 1;
                    border-left: none;
                    border-right: none;
                    border-top: 1px solid #BABABA;
                    border-bottom: 1px solid #BABABA;
                    padding: 12px 20px;
                    font-size: 14px;
                    outline: none;
                    margin: 2px;
                    }
                    .reply-container {
                    display: flex;
                    flex-direction: row;
                    }
                    .send-btn {
                        user-select: none;
                        cursor: pointer;
                        color: white;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        padding: 8px;
                    }
                </style>
                <div class="reply-container">
                    <input
                        @change="${(e: any) => this.responseText = e.target.value}" 
                        .value="${this.responseText}" 
                        class="reply-input" placeholder="Reply">
                    <div
                        @click="${() => this._sendResponse()}" 
                        .style="background-color: ${this.post.tag!.colour}" 
                        class="send-btn">Submit</div>
                </div>
            ` : html`<div @click="${() => this.dispatchEvent(new CustomEvent('should-login'))}" class="auth-btn">Login or Register to reply</div>`
        }
        `;
    }

}
customElements.define('post-page', PostPage);