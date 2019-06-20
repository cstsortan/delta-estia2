import { LitElement, html, property } from "lit-element";

class OpaqueBackground extends LitElement {
    
    @property()
    open: boolean = false;

    render() {
        return html`
        <style>
        .background {
          position: absolute;
          z-index: -10;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: black;
          transition: opacity 0.2s;
          opacity: 0;
        }
        .background-open {
          display: block;
          opacity: 0.5;
          z-index: 1;
        }
      </style>
      <div class="background${this.open ? ' background-open' : ''}"></div>         
        `
    }
  
}
customElements.define('opaque-background', OpaqueBackground)