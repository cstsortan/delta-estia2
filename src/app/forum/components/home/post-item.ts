import { LitElement, html, property } from "lit-element";
import { Post } from "../../interfaces/post";

class PostItem extends LitElement {

    @property({
        reflect: false,
    }) post!: Post;

    render() {
        return html`
          <style>
            .post-item {
            user-select: none;
            display: flex;
            flex-direction: row;
            min-height: 60px;
            cursor: pointer;
            }
            .post-item:hover {
                opacity: 0.8;
                background-color: #DFE1E2;
            }
            .start {
            width: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            }
            .body {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            }
            .end {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 50px;
            }
            .title {
            font-size: 14px;
            }
            .tag {
            display: inline-block;
            align-self: flex-start;
            color: white;
            padding: 2px;
            font-size: 12px;
            border-radius: 4px;
            }
            .replies {
            background-color: #ECEDEE;
            display: inline-block;
            padding: 5px;
            font-size: 12px;
            border-radius: 5px;
            color: #7A8185;
            }
            img {
            display: block;
            margin: auto;
            border-radius: 50%;
            height: 36px;
            }
            .alternative {
            display: block;
            margin: auto;
            border-radius: 50%;
            background-color: #ECEDEE;
            height: 36px;
            width: 36px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #7A8185;
            }
        </style>
        <div class="post-item">
            <div class="start">
                ${this.post.author!.profilePhotoUrl 
                ? html`<img src="${this.post.author!.profilePhotoUrl}">`
                : html `<div class="alternative">${this.post.author!.name[0]}</div>`
                }
            </div>
            <div class="body">
            <div class="title">
                ${this.post.title}
            </div>
            <div .style="background-color: ${this.post.tag!.colour}" class="tag">
                ${this.post.tag!.name}
            </div>
            </div>
            <div class="end">
            <div class="replies">
                ${this.post.responses || 0}
            </div>
            </div>
        </div>
        `;
    }

}

customElements.define('post-item', PostItem);