import { Node } from "./Node.js";

export class Sprite extends Node {
    constructor(image) {
        super();
        this.image = image;
        this._image = this.image
        this.setImage();
    }
    get image() {
        return this._image;
    }
    set image(value) {
        this._image = value;
        return null;
    }
    initView() {
        this.view = document.createElement('img');
        this.view.width = 98;
        this.view.height = 98;
        this.view.style.border = "2px solid black";
        this.view.style.display = "none";

        return null;
    }
    setImage() {
        this.view.src = this._image;
    }
    unfold() {
            this.view.style.display = "initial";
    }
    fold() {
            this.view.style.display = "none";
    }

}