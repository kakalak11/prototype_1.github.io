import { Node } from "./Node.js";
export class Label extends Node {

    constructor(string) {
        super();
        this._string = string || "";
        this.string = this._string;
        this.view.style.color = 'white';
        this.view.style.fontSize = "30px";
        this.view.style.cursor = "pointer";
        this.view.style.textAlign = "center";
        this.width = 100;
        this.height = 100;
        this.y = this.height / 2 - 15;
    }

    get string() {
        return this._string;
    }

    set string(value) {
        this._string = value;
        this.view.innerHTML = this._string;
    }
}