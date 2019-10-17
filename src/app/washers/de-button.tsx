import Vue from 'vue';

const getH = createElement => (element, props, ...children) => {
    return createElement(element, {
        domProps: props,
        ...children
    })
}

class DEButton extends HTMLElement {
    static styles = `
        .button {
            color: white;
            background-color: #464545;
            padding: 8px;
            margin: 4px;
            margin-bottom: 20px;
            user-select: none;
            border-radius: 8px;
        }
    `;
    constructor() {
        super();
        this.attachShadow({ mode: 'open' }).innerHTML = `
            <style>${DEButton.styles}</style>
        `;
        const root = this.shadowRoot.appendChild(document.createElement('div'));
        new Vue({
            el: root,
            render: createElement => {
                const h = getH(createElement);
                return <button>Is this even working?</button> as any
            },
        })
    }
}
customElements.define('de-button', DEButton);
