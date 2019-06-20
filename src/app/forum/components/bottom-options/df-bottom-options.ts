import { LitElement, html, property } from "lit-element";
import { Tag } from "../../interfaces/tag";
import { store } from "../../store";
import { routes } from "../../routes";
import { navigate } from "../../actions/router-actions";
import { toggleBottomSheet } from "../../actions/layout-actions";
import { getState$ } from "../../utils/get-state";
import { AppState } from "../../reducers";
import { Subscription } from "rxjs";

class DfBottomOptions extends LitElement {

    @property({
        reflect: false,
    })
    currentTag: Tag = routes[0];

    @property({reflect: false})
    tags: Tag[] = [];

    @property({
        reflect: false,
    }) 
    showTags: boolean = true;

    _storeSub!: Subscription;

    connectedCallback() {
        super.connectedCallback();
        this._updateStoreState();
        store.subscribe(() => {
            this._updateStoreState();
        });

        this._storeSub = getState$(store)
            .subscribe(state => this.tags = (state as AppState).postsList.tags);
    }

    disconnectedCallback() {
        this._storeSub.unsubscribe();
        super.disconnectedCallback();
    }

    _updateStoreState(): void {
        this.currentTag = store.getState().router.tag!;
    }

    _chooseTag(tag: Tag): void {
        store.dispatch(toggleBottomSheet());
        store.dispatch(navigate(tag));
    }

    render() {

        const tagsList = this.tags.map(tag => {
            return html`<df-tag-option
            class="${this.currentTag === tag ? 'enabled-route': ''}"
            @click="${() => this._chooseTag(tag)}"
            .tag="${tag}"></df-tag-option>`;
        });

        const staticRoutes = routes.map(route => {
            return html`<df-tag-option
            class="${this.currentTag === route ? 'enabled-route': ''}"
            @click="${() => this._chooseTag(route)}"
            .tag="${route}"></df-tag-option>`;
        })

        return html`
        <style>
            df-tag-option:hover {
                background-color: #ECEDEE;
                cursor: pointer;
                user-select: none;
                color: black;
            }
            .enabled-route {
                background-color: #4E92DF;
                color: white;
            }
        </style>
        <div>
        ${staticRoutes}
        ${this.showTags ? tagsList : null}
        </div>
        `
    }
}

customElements.define('df-bottom-options', DfBottomOptions)