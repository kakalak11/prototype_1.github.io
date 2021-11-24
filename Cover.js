import { Node } from "./Node.js";
export class Cover extends Node {
    constructor() {
        super();
        this.view.style.backgroundColor = "pink";
        this.view.style.border = "2px solid black";
        this.width = 98;
        this.height = 98;
    }
}