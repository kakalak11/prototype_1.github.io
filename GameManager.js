import { Cover } from "./Cover.js";
import { Label } from "./Label.js";
import { Node } from "./Node.js";
import { Sprite } from "./Sprite.js";

export class Manager extends Node {
    constructor() {
        super();
        this.coin = 10000;
        this.collum = 5;
        this.row = 4;
        this.canClick = true;
        // this.createDeck();
    }
    createDeck(deck) {
        this.deck = deck;
        console.log(this.deck);
        document.body.appendChild(this.deck.view);
        this.deck.x = 100;
        this.deck.y = 100;
        // this.deck.view.style.display = "none";
        let index = 0
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
        for (let y = 0; y < this.row; y++) {
            for (let x = 0; x < this.collum; x++) {
                let card = new Node();
                setPosition(card,x,y);
                addElement(card,index);
                // let _onClickCard = this.onClickCard.bind(card)
                // card.view.addEventListener("click",_onClickCard);
                this.deck.addChild(card);
                index++;
            }
        }
        function addElement(card,index) {
            let sprite = new Sprite(shuffledArray[index]);
            card.addChild(sprite);
            let cover = new Cover();
            card.addChild(cover);
            let label = new Label(Math.floor((card.x)/(90) + 1 + (card.y)/(20)));
            card.addChild(label);
        }
        function setPosition(card, x_pos, y_pos) {
            card.x = x_pos*100;
            card.y = y_pos*100;
        }
        this.startGame();
    }
    startGame() {
        console.log(this.coin);
        let board = new createScoreBoard(this.deck);
        let countWin = 0;
        let temp = [];
        let canClick = true;
        let coin = this.coin;
        this.deck.children.forEach(element => {
            let _onClickCard = onClickCard.bind(element);
            element.view.addEventListener("click", _onClickCard);
        });
        function onClickCard() {
            if (canClick) {
                console.log("clicked", this);
                temp.push(this);
                this.flipOpen();
                console.log(temp);
                if (temp.length === 2) {
                    canClick = false;
                    console.log(temp[0] !== temp[1]);
                    setTimeout(() => {
                        if (temp[0] !== temp[1]) {
                            canClick = false;
                            console.log("different card");
                            if (temp[0].children[0].image === temp[1].children[0].image) {
                                countWin++;
                                coin += 1000;
                                setTimeout(() => {
                                    // temp.forEach(element => element.delete());
                                    temp.forEach(element => element.flipAway());
                                    console.log("matched");
                                    temp = [];
                                    canClick = true;
                                }, 500);
                                update(board, coin, 1000);
                            }
                            else {
                                coin -= 500;
                                setTimeout(() => {
                                    temp.forEach(element => element.flipClose());
                                    console.log("not matched");
                                    temp = [];
                                    canClick = true;
                                }, 500);
                                console.log(board);
                                update(board, coin, -500);
                            }
                        }
                        else {
                            console.log("same card, please choose again");
                            temp.forEach((element) => element.flipClose());
                            canClick = true;
    
                            temp = [];
                        }
                    }, 500);
                }
            }
        }

        function update(board, coin, value) {
            board.children[0].string = coin + value;

            let change = new Change();
            board.addChild(change);

            if (value === 1000) {
                change.string = "+" + 1000;
                flashChange();
            }
            else if (value === -500) {
                change.string = "-" + 500;
                flashChange();
            }

            function flashChange() {
                change.view.style.visibility = "visible";
                setTimeout(() => change.view.style.visibility = "hidden", 500);
            }

            function Change() {
                let change = new Label();
                change.view.style.fontSize = "40px";
                change.y = 30;
                change.x = 125;
                return change;
            }
        }

        function createScoreBoard(deck) {
            let board = new Board();
            let label = new setLabel();
            board.addChild(label);

            function Board() {
                console.log(deck);
                let board = new Node();
                deck.addChild(board);
                board.y = 100*4 + 20;
                board.width = 502;
                board.height = 100;
                board.view.style.backgroundColor = "black";
                return board
            }

            function setLabel() {
                console.log('here label');
                let label = new Label();
                label.string = 10000;
                label.view.style.fontSize = "40px";
                label.y = 30;
                return label;
            }
            return board;
        }

    
    }
}
