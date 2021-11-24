import { Cover } from "./Cover.js";
import { Label } from "./Label.js";
import { Node } from "./Node.js";
import { Sprite } from "./Sprite.js";

export class Game extends Node {
    constructor() {
        super();
        // this.createReplayButton();
        // this.startGame();
        // this.setup();
    }
    get check() {
        value = this._correct;
        this._correct = false;
        return value;
    }


    startGame() {
        let nodes = [];
        let countWin = 0;
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
                // console.log(nodes);
                nodes.push(node)
                document.body.appendChild(node.view);
                // console.log(nodes);
            }
        }
        // this.createReplayButton();
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
            label.string = index;
            node.addChild(cover);
            node.addChild(sprite);
            node.addChild(label);
            node.children.forEach(element => element.display());
            setTimeout(() => {
                node.children.forEach(element => element.hide());
                canClick = true;
            }, 500);

        }

        function onClickFunction() {
            if (canClick) {
                console.log("clicked", this);
                temp.push(this);
                console.log(this.active);
                fadeOut(this);
                const sprite1 = temp[0].children[1];
                if (temp.length === 2) {
                    canClick = false;
                    const sprite2 = temp[1].children[1];
                    setTimeout(() => {
                        if (temp[0].children[2] !== temp[1].children[2]) {
                            canClick = false;
                            if (sprite1.image === sprite2.image) {
                                countWin++;
                                coin += 1000;
                                setTimeout(() => {
                                    // temp.forEach(element => element.delete());
                                    temp.forEach(element => fadeAway(element));
                                    console.log("matched");
                                    temp = [];
                                    canClick = true;
                                }, 1000);
                                createScoreboard(1000);
                            }
                            else {
                                coin -= 500;
                                setTimeout(() => {
                                    temp.forEach(element => fadeIn(element));
                                    console.log("not matched");
                                    temp = [];
                                    canClick = true;
                                }, 1000);
                                createScoreboard(-500);
                            }
                        }
                        else {
                            console.log("same card, please choose again");
                            temp.forEach((element) => element.children.forEach((element) => element.hide()));
                            canClick = true;

                            temp = [];
                        }
                    }, 1000);
                }
            }
        }

        function fadeOut(element) {
            console.log(element.view);
            let tl = gsap.timeline({ repeat: 0, repeatDelay: 0 });
            tl.to(element.view, { scaleX: 0, duration: 1 });
            tl.add(() => element.children.forEach(element => element.display()));
            tl.to(element.view, { scaleX: 1, duration: 1 });
        }

        function fadeIn(element) {
            console.log(element.view);
            let tl = gsap.timeline({ repeat: 0, repeatDelay: 0 });
            tl.to(element.view, { scaleX: 0, duration: 1 });
            tl.add(() => element.children.forEach(element => element.hide()));
            tl.to(element.view, { scaleX: 1, duration: 1 });
        }

        function fadeAway(element) {
            console.log(element.view);
            let tl = gsap.timeline({ repeat: 0, repeatDelay: 0 });
            tl.to(element.view, { opacity: 0, duration: 1 });
            tl.add(() => element.children.forEach(element => element.delete()));
            // tl.to(element.view, { scaleX: 1, duration: 1 });
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

            function createLabel(label) {
                label.x = 10;
                label.y = 15;
                label.view.style.visibility = "visible";
                label.view.style.fontSize = "60px";
                label.string = coin;
                label.view.style.color = "white";
                console.log(countWin);
                if (countWin > 9) {
                    label.string = "GAME WIN !!!";
                    countWin = 0;
                }
                if (coin <= 0) {
                    label.string = "GAME OVER !!!";
                    nodes.forEach(node => node.children.forEach(element => element.delete()));
                    // retry();
                    // gameWin();
                    // nodes.forEach(node => node.delete());
                    canClick = false;
                }
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
                    setTimeout(() => change.view.style.visibility = "hidden", 500);
                }
            }
        }
    }
    reset() {
        let game = Game();
        game.startGame();
    }
    createReplayButton() {
        let node = new Node();
        document.body.appendChild(node.view)
        let button = new Label();
        node.addChild(button);
        button.string = "REPLAY";
        button.view.style.color = "black";
        button.view.style.border = "2px solid black"
        node.y = 450;
        node.x = 0;
        button.view.addEventListener("click", this.reset);
    }
    setup() {
        let node = new Node();
        document.body.appendChild(node.view)
        let button = new Label();
        node.addChild(button);
        button.string = "REPLAY";
        button.view.style.color = "white";
        button.view.style.border = "2px solid white";
        node.y = 360;
        node.x = 300;
        button.view.addEventListener("click", this.startGame);
    }
}