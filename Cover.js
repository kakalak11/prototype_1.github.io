import { Node } from "./Node.js";
export class Cover extends Node {
    constructor() {
        super();
        this.view.style.backgroundColor = "rgb(255, 0, 255)";
        this.view.style.border = "2px solid black";
        this.width = 98;
        this.height = 98;
    }
}