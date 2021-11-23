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
        value = this._correct;
        this._correct = false;
        return value;
    }
    startGame() {
        let coin = 1000;
        let index = 0;
        let temp = [];
        let canClick = false;
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
        createScoreboard(0);
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
            setTimeout(() => {
                sprite.hide();
                canClick = true;
            }, 3000);
            label.string = index;

            node.addChild(cover);
            node.addChild(sprite);
            node.addChild(label);
        }

        function onClickFunction() {
            if (canClick) {
                console.log("clicked", this);
                temp.push(this);
                const sprite1 = temp[0].children[1];
                temp.forEach((element) => element.children.forEach((element) => element.hide()));
                sprite1.display();
                if (temp.length === 2 && temp[0].active && temp[1].active) {
                    canClick = false;
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
                            canClick = true;
                            coin += 1000;
                            createScoreboard(1000);
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
                            canClick = true;
                            coin -= 500;
                            createScoreboard(-500);
                        }, 500);
                    }
                }
            }
        }

        function createScoreboard(diff) {
            let coinBoard = document.createElement("div");
            document.body.appendChild(coinBoard);
            createCoinBoard(coinBoard);

            let label = new Label();
            coinBoard.appendChild(label.view);
            createLabel(label);

            coinChange(diff);

            function createCoinBoard(coinBoard) {
                coinBoard.style.top = "360px";
                coinBoard.style.left = "0px";
                coinBoard.style.width = "452px";
                coinBoard.style.height = "92px";
                coinBoard.style.position = "absolute";
                coinBoard.style.backgroundColor = "black";
            }

            createLabel(label);

            function createLabel(label) {
                label.x = 10;
                label.y = 15;
                label.view.style.visibility = "visible";
                label.view.style.fontSize = "60px";
                label.string = coin + diff;
                label.view.style.color = "white";
            }

            function coinChange(diff) {
                let change = new Label();
                coinBoard.appendChild(change.view);
                change.x = 175;
                change.y = 15;
                change.view.style.fontSize = "60px";
                change.view.style.visibility = "hidden";
                change.view.style.color = "white";
                if (diff === 1000) {
                    change.string = "+" + diff;
                    flashScore();
                }
                else if (diff === (-500)) {
                    change.string = " " + diff;
                    flashScore();
                }
                else if (diff === 0) {
                    change.string = " ";
                }

                function flashScore() {
                    change.view.style.visibility = "visible";
                    setInterval(() => change.view.style.visibility = "hidden", 500);
                }
            }
        }
    }
    reset() {
        this.startGame();
        this.nodes = [];
    }

    // createScoreboard(diff) {
    //     let coinBoard = document.createElement("div");
    //     document.body.appendChild(coinBoard);
    //     createCoinBoard(coinBoard);

    //     let label = new Label();
    //     coinBoard.appendChild(label.view);
    //     label.x = 10;
    //     label.y = 15;
    //     label.view.style.visibility = "visible";
    //     label.view.style.fontSize = "60px";
    //     label.string = this.coin + diff;
    //     label.view.style.color = "white";

    //     coinChange(label, diff);

    //     function createCoinBoard(coinBoard) {
    //         coinBoard.style.top = "362px";
    //         coinBoard.style.left = "0px";
    //         coinBoard.style.width = "452px";
    //         coinBoard.style.height = "90px";
    //         coinBoard.style.position = "absolute";
    //         coinBoard.style.backgroundColor = "black";
    //     }

    //     function coinChange(diff) {

    //         let change = new Label();
    //         coinBoard.appendChild(change.view);
    //         change.x = 175;
    //         change.y = 15;
    //         change.view.style.fontSize = "60px";
    //         change.view.style.visibility = "hidden";
    //         change.view.style.color = "white";
    //         if (diff === 1000) {
    //             change.string = "+" + diff;
    //             flashScore();
    //         }
    //         else if (diff === (-500)) {
    //             change.string = "-" + diff;
    //             flashScore();
    //         }
    //         else if (diff === 0) {
    //             change.string = " ";
    //         }

    //         function flashScore() {
    //             change.view.style.visibility = "visible";
    //             setInterval(() => {
    //                 change.view.style.visibility = "hidden";
    //             }, 500);
    //         }
    //     }
    // }
}