import { LitElement, html, property } from "lit-element";
import { Tag } from "../../../interfaces/tag";
import { Subscription } from "rxjs";
import { store } from "../../../store";
import { navigate } from "../../../actions/router-actions";
import { queryTag } from "../../../actions/posts-list-actions";
import { getState$ } from "../../../utils/get-state";
import { AppState } from "../../../reducers";

class DfTagsList extends LitElement {
    
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


    render() {
        return html`
        <div>
        <style>
        :host {
            display: block;
            width: 100%;
        }
        </style>
        ${this.tags.map(tag => {
            return html`
                <df-tag-card @click="${() => this._tagChosen(tag)}" .tag=${tag}></df-tag-card>
            `
        })}
        </div>
        `
    }
    _tagChosen(tag: Tag): void {
        store.dispatch(navigate(tag));
        store.dispatch(queryTag(tag.id));
    }
}

customElements.define('df-tags-list', DfTagsList);