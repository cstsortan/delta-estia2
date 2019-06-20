import { LitElement, html, property } from 'lit-element';

class BottomSheet extends LitElement {

    @property()
    open: boolean = false;

    render() {
        return html`
        <style>
        :host {
          display: block;
        }
        .sheet {
          height: 0;
          z-index: 1;
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          top: 30%;
          background-color: white;
          transition: transform 0.2s;
          transform: translateY(100%);
          overflow-y: scroll;
        }
        .sheet-open {
          transform: translateY(0%);
          height: 70%;
        }
        .content-hidden {
          display: none;
        }
        </style>
        <opaque-background @click="${() => this.handleBgClick()}" .open="${this.open}"></opaque-background>
        <div class="sheet${this.open ? ' sheet-open' : ''}">
          <div class="${this.open ? '' : 'content-hidden'}">
            <slot></slot>
          </div>
        </div>
        `;
    }

    handleBgClick() {
      this.dispatchEvent(new CustomEvent('bs-close'))
    }
}
customElements.define('bottom-sheet', BottomSheet);