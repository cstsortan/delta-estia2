import { LitElement, html, property } from "lit-element";
import { Tag } from "../../interfaces/tag";

export class DfTagOption extends LitElement {

    @property({reflect: false})
    tag!: Tag;
    
    render() {
        return html`
        <style>
        :host {
            height: 54px;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            font-size: 17px;
            padding-left: 20px;
        }
        .tagColor {
            height: 17px;
            width: 21px;
            margin-right: 8px;
            border-radius: 4px;
        }
        @media only screen and (min-width: 800px) {
            :host {
                height: 35px;
                padding-left: 10px;
                padding-right: 10px;
            }
            .tagColor {
                height: 14px;
                width: 18px;
            }
        }
        </style>
        <div .style="background-color: ${this.tag.colour}" class="tagColor"></div>
        <div class="tag">
        ${this.tag.name}</div>
        `
    }

}

customElements.define('df-tag-option', DfTagOption)