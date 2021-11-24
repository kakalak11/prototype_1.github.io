import { Cover } from "./Cover.js";
import { Label } from "./Label.js";
import { Node } from "./Node.js";
import { Sprite } from "./Sprite.js";

export class Manager extends Node {
    constructor() {
        super();
        this.coin = 1000;
        this.collum = 5;
        this.row = 4;
        this.deck = new Node();
        this.createDeck();
    }

    createDeck() {
        document.body.appendChild(this.deck.view);
        this.deck.x = 100;
        this.deck.y = 100;
        // this.deck.view.style.display = "none";
        for (let y = 0; y < this.row; y++) {
            for (let x = 0; x < this.collum; x++) {
                let node = new Node();
                
                setPosition(node,x,y);
                addElement(node);
                this.deck.addChild(node);
            }
        }
        function addElement(node) {
            let cover = new Cover();
            node.addChild(cover);
            let label = new Label(Math.floor((node.x)/(90) + 1 + (node.y)/(20)));
            node.addChild(label);
            let sprite = new Sprite();
            node.addChild(sprite);
        }
        function setPosition(node, x_pos, y_pos) {
            node.x = x_pos*100;
            node.y = y_pos*100;
        }
    }
}