import { Node } from "./Node.js";
export class Cover extends Node {
    constructor() {
        super();
        this.view.style.backgroundColor = "pink";
        this.view.style.width = "88px";
        this.view.style.height = "88px";
        this.view.style.border = "2px solid black";
    }
}