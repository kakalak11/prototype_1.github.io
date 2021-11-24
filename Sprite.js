import { Node } from "./Node.js";

export class Sprite extends Node {
    constructor(image) {
        super();
        this.image = image;
        this.setImage();
    }
    initView() {
        this.view = document.createElement('img');
        this.view.style.width = "88px";
        this.view.style.opacity = "1";
        this.view.style.height = "88px";
        this.view.style.border = "2px solid black";
        this.view.style.display = "none";
    }
    setImage() {
        this.view.src = this.image;
    }
    display() {
        if (this._active) {
            this.view.style.display = "initial";
        }
    }
    hide() {
        if (this._active) {
            this.view.style.display = "none";
        }
    }

}