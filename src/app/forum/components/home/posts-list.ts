import { LitElement, html, property } from "lit-element";
import { Post } from "../../interfaces/post";
import { Subscription, iif, of } from "rxjs";
import { getState$ } from "../../utils/get-state";
import { store } from "../../store";
import { switchMap } from "rxjs/operators";
import { Route, routes } from "../../routes";

import {repeat} from 'lit-html/directives/repeat';
import { navigate, openPost } from "../../actions/router-actions";
import { selectPost, showMorePosts } from "../../actions/posts-list-actions";
import { styleMap } from "lit-html/directives/style-map";
import { AppState } from "../../reducers";
import { connect } from "../../utils/connect-mixin";
import { Tag } from "../../interfaces/tag";

class PostsList extends connect(store)(LitElement) {

    _stateChanged(state: AppState) {
        this.tag = state.router.tag || null;
    }

    @property({reflect: false}) posts: Post[] = [];

    @property()
    tag!: Tag|null;

    postChosen(post: Post) {
        store.dispatch(openPost(post));
        store.dispatch(selectPost(post));
    }

    _createNewPost() {
        store.dispatch(navigate('new-post'));
    }
    
    loadMore() {
        store.dispatch(showMorePosts());
    }

    render() {
        if(!this.tag) return html``;
        return html`
            <style>
            .row {
                display: flex;
                flex-direction: row;
            }
            post-item {
                display: block;
            }
            .posts {
                flex: 1;
            }
            .start-discussion-btn {
                color: white;
                user-select: none;
                cursor: pointer;
                padding: 12px 18px;
                font-size: 16px;
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 36px 0;
                border-radius: 4px;
                transition: opacity 0.2s;
            }
            .start-discussion-btn:active {
                opacity: 0.5;
            }
            .between-space {
                display: block;
                width: 20px;
            }
            .load-more-btn {
                margin: 20px;
                color: white;
                user-select: none;
                cursor: pointer;
                padding: 12px 18px;
                font-size: 16px;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 4px;
                transition: opacity 0.2s;
                background-color: #DCDCDC;
            }
            @media only screen and (max-width: 800px) {
                .tags {
                    display: none;
                    margin-right: 50px;
                }
                .between-space {
                    width: 0;
                }
            }
            </style>
            <div class="row">
                <div class="tags">
                    <div 
                        @click="${() => this._createNewPost()}"
                        style="${styleMap({backgroundColor: this.tag === routes[0] ? 'blue' :  this.tag!.colour || 'blue'})}"
                        class="start-discussion-btn">Start a Discussion</div>
                    <df-bottom-options></df-bottom-options>
                </div>
                <div class="between-space"></div>
                <div class="posts">
                ${repeat(this.posts, i => i.id, (post, i) => {
                    return html`<post-item
                    @click="${() => this.postChosen(post)}"
                    .post="${post}"></post-item>`;
                })}
                </div>
            </div>
            ${this.posts.length > 9 
                ? html`<div 
                    @click="${() => (this as any)._loadMore()}"
                    class="load-more-btn">Load more</div>` 
                : null
            }
        `;
    }
}

customElements.define('posts-list', PostsList);