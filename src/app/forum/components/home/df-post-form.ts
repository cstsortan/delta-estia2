import { LitElement, html, property, query, customElement } from "lit-element";
import { store } from "../../store";
import { navigate } from "../../actions/router-actions";
import { routes } from "../../routes";
import { Post } from "../../interfaces/post";
import { Tag } from "../../interfaces/tag";
import { addPost } from "../../services/posts-service";
import { Subscription } from "rxjs";
import { getState$ } from "../../utils/get-state";
import { AppState } from "../../reducers";

export class DfPostForm extends LitElement {

    navigateToHome() {
        store.dispatch(navigate(routes[0]));
    }

    @query('#tag')
    tagElm!: HTMLSelectElement;

    @property({
        reflect: false
    })
    post: Post = {
        text: '',
        title: '',
    };

    @property({
        reflect: false,
    })
    tags: Tag[] = [];

    _sub!: Subscription;

    connectedCallback() {
        super.connectedCallback();
        this._sub = getState$(store)
            .subscribe(state => this.tags = (state as AppState).postsList.tags);
    }

    disconnectedCallback() {
        this._sub.unsubscribe();
        super.disconnectedCallback();
    }

    _tagSelected() {
        const selectedId = this.tagElm.options[this.tagElm.selectedIndex].value;
        this.post.tag = this.tags.find(e => e.id === selectedId);
    }

    _submited() {
        // console.log(this.post)
        if(this.post.title === '' 
        || this.post.text === ''
        || store.getState().auth === null) {
            return;
        }
        addPost({
            ...this.post,
            tag: this.post.tag || this.tags[0],
            author: store.getState().auth!,
        });
        this.navigateToHome();
    }

    render() {
        return html`
            <style>
                app-bar {
                    cursor: pointer;
                }
                .btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: blueviolet;
                    height: 100%;
                    margin-left: 8px;
                    margin-right: 8px;
                }
                .form-container {
                    display: flex;
                    flex-direction: column;

                }
                .text-field, .title-field, .tag-field {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                }
                input, textarea, label, select {
                    padding: 8px;
                    font-size: 14px;
                    border: none;
                    outline: none;
                    
                }
                textarea {
                    resize: none;
                }
            </style>
            <app-bar>
                <div @click="${() => this.navigateToHome()}" class="btn" slot="start">back</div>
                <div>New Post</div>
                <div @click="${() => this._submited()}" class="btn" slot="end">Post</div>
            </app-bar>
            <form class="form-container">
                <div class="tag-field">
                    <label for="tag">Choose Tag</label>
                    <select id="tag" @change="${(e: any) => this._tagSelected()}">
                        ${this.tags.map(tag => {
                            return html`
                                <option
                                 
                                ?selected="${this.post.tag && tag.id === this.post.tag.id}" .value="${tag.id}">${tag.name}</option>
                            `;
                        })}
                    </select>
                </div>
                <div class="title-field">
                    <label for="title">Τίτλος</label>
                    <input
                        @change="${(e: any) => this.post.title = e.target.value}"
                        .value="${this.post.title}"
                        required class="" type="text" id="title" placeholder="Γράψτε έναν τίτλο συζήτησης">
                </div>
                <div class="text-field">
                    <label for="text">Θέμα</label>
                    <textarea 
                        @change="${(e: any) => this.post.text = e.target.value}"
                        .value="${this.post.text}"
                        required id="text" placeholder="Περιγράψτε το θέμα της συζήτησής σας..."></textarea>
                </div>
            </form>
        `;
    }
}
customElements.define('df-post-form', DfPostForm);