import { LitElement, html, property } from "lit-element";
import { Tag } from "../../interfaces/tag";

import { styleMap } from 'lit-html/directives/style-map';


export class DfTagHeaderBar extends LitElement {

    @property({reflect: false})
    tag!: Tag;

    render() {
        return html`
        <style>
            :host {
                display: block;
                box-sizing: border-box;
            }
            .header-bar {
                height: 200px;
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                align-items: center;
            }
            .tagName {
                color: white;
                font-size: 26px;
            }
            .tagDescription {
                color: white;
                font-size: 18px;
            }
            @media screen and (max-width: 800px) {
                .header-bar {
                    height: 120px;
                }
                .tagName {
                    font-size: 20px;
                }
                .tagDescription{font-size: 14px;}
            }
        </style>
        <div
        style="${styleMap({backgroundColor: this.tag.colour})}"
        class="header-bar">
            <div class="tagName">${this.tag.name}</div>
            <div class="tagDescription">${this.tag.description}</div>
        </div>
        `;
    }
}
customElements.define('df-tag-header-bar', DfTagHeaderBar);