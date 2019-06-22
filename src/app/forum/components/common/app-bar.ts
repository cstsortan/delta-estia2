import { LitElement, html, customElement } from "lit-element";

export class AppBar extends LitElement {
    render() {
        return html`
        <style>
            :host {
                margin-top: 46px;
            }
        .app-bar-style {
            display: flex;
            width: 100%;
            height: 46px;
            background: #FFFFFF;
            border-bottom-color: #ECEDEE;
            border-bottom-style: solid;
            border-bottom-width: 1px;
            justify-content: space-between;
            user-select: none;
        }
        .app-bar-title {
            color: #6EA6E5;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 18px;
            flex: 1;
        }
        .app-bar-title:active {
            opacity: 0.6;
        }
        .end {
            align-self: center;
            flex: 0;
            color: #7A8185;
            font-size: 18px;
        }
        .start {
            flex: 0;
            color: #7A8185;
            font-size: 18px;
        }
        </style>
        <div class="app-bar-style sticky">
            <div class="start">
            <slot name="start"></slot>
            </div>
            <div class="app-bar-title">
            <slot></slot>
            </div>
            <div class="end">
                <slot name="end"></slot>
            </div>
        </div>
        `;
    }
}

customElements.define('app-bar', AppBar);