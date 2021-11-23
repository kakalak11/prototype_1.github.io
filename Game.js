import { Cover } from "./Cover.js";
import { Label } from "./Label.js";
import { Node } from "./Node.js";
import { Sprite } from "./Sprite.js";

export class Game extends Node {
    constructor() {
        super();
        this.nodes = [];
        this.startGame();
        this._correct;
    }
    get check() {
        return this._correct;
    }
    startGame() {
        let index = 0;
        let temp = [];
        let array = ["./Images/circle.png",
            "./Images/diamond.png",
            "./Images/halfsquare.png",
            "./Images/heart.png",
            "./Images/rectangle.png",
            "./Images/shape.png",
            "./Images/sixstar.png",
            "./Images/square.png",
            "./Images/star.png",
            "./Images/triangle.png",
            "./Images/triangle.png",
            "./Images/circle.png",
            "./Images/diamond.png",
            "./Images/halfsquare.png",
            "./Images/heart.png",
            "./Images/rectangle.png",
            "./Images/shape.png",
            "./Images/sixstar.png",
            "./Images/square.png",
            "./Images/star.png"];
        const shuffledArray = array.sort((a, b) => 0.5 - Math.random());
        for (let y = 0; y < 4; y++) {
            for (let x = 0; x < 5; x++) {
                index++;
                let node = new Node();
                setPosition(node, x, y);
                setElement(node);
                let _onClickFunction = onClickFunction.bind(node);
                node.view.addEventListener("click", _onClickFunction);
                this.nodes.push(node)
                document.body.appendChild(node.view);
                // console.log(node);
            }
        }

        function setPosition(node, x_pos, y_pos) {
            // console.log(this.node.view);
            node.x = x_pos * 90;
            node.y = y_pos * 90;
        }

        function setElement(node) {
            let cover = new Cover();
            let sprite = new Sprite(shuffledArray[index - 1]);
            let label = new Label();
            label.hide();
            setTimeout(() => label.display(), 3000);
            sprite.display();
            setTimeout(() => sprite.hide(), 3000);
            label.string = index;

            node.addChild(cover);
            node.addChild(sprite);
            node.addChild(label);
        }

        function onClickFunction() {
            console.log("clicked", this);
            temp.push(this);
            const sprite1 = temp[0].children[1];
            temp.forEach((element) => element.children.forEach((element) => element.hide()));
            sprite1.display();

            if (temp.length === 2 && temp[0].active && temp[1].active) {
                const sprite2 = temp[1].children[1];
                sprite2.display();
                if (sprite1.image === sprite2.image) {
                    setTimeout(() => {
                        temp.forEach(element => element.delete())
                        sprite1.hide();
                        sprite2.hide();
                        console.log("matched");
                        temp = [];
                        this._correct = true;
                        console.log(this._correct);
                    }, 500);

                }
                else {
                    setTimeout(() => {
                        temp.forEach((element) => element.children.forEach((element) => element.display()));
                        sprite1.hide();
                        sprite2.hide();
                        console.log("not matched");
                        temp = [];
                        this._correct = true;
                    }, 500);
                }
            }

        }
    }
    reset() {
        this.startGame();
        this.nodes = [];
    }
    checkWin() {

    }

}