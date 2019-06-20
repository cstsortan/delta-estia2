import { LitElement, html, property } from "lit-element";
import { Tag } from "../../../interfaces/tag";

export class DfTagCard extends LitElement {

    @property()
    tag!: Tag;

    render() {
        return html`
        <style>
        :host {
            cursor: pointer;
            user-select: none;
        }
        .card {
            height: 200px;
            width: 100%;
            color: white;
            display: flex;
            flex-direction: column;
        }
        .title {
            font-size: 20px;
            margin: 20px;
            flex: 0;
        }
        .description {
            font-size: 14px;
            margin-left: 20px;
            flex: 1;
            display: flex;
            align-items: flex-start;
            color: #DBDBDB;
        }
        .bottom {
            font-size: 12px;
            margin-left: 20px;
            flex: 0;
            padding: 7px 0;
            font-size: 12px;
            line-height: 21px;
            margin: 0 20px;
            height: 42px;
            border-top: 1px solid rgba(0,0,0,0.15);
            color: #DBDBDB;
        }
        </style>
        <div
            .style="background-color: ${this.tag.colour};" class="card">
            <div class="title">
                ${this.tag.name}
            </div>
            <div class="description">
                ${this.tag.description}
            </div>
            <div class="bottom">
                ${this.tag.latestPost ? this.tag.latestPost : "No posts yet"}
            </div>
        </div>
        `;
    }
}
customElements.define('df-tag-card', DfTagCard);