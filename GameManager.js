import { Cover } from "./core/Cover.js";
import { Label } from "./core/Label.js";
import { Node } from "./core/Node.js";
import { Sprite } from "./core/Sprite.js";

export class Manager extends Node {
    constructor(deck) {
        super();
        this.coin = 10000;
        this.collum = 5;
        this.row = 4;
        this.canClick = true;
        this.deck = deck;
        this.firstCard = null;
        this.secondCard = null;
        this.temp = [];
        this.setup();
    }
    setup() {
        let index = 0;
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
                setPosition(card, x, y);
                addCardElement(card, index);
                this.deck.addChild(card);
                index++;
            }
        }
        function addCardElement(card, index) {
            let sprite = new Sprite(shuffledArray[index]);
            card.addChild(sprite);
            let cover = new Cover();
            card.addChild(cover);
            let label = new Label(Math.floor((card.x) / (90) + 1 + (card.y) / (20)));
            cover.addChild(label);
        }
        function setPosition(card, x_pos, y_pos) {
            card.x = x_pos * 100;
            card.y = y_pos * 100;
        }
        this._newStartGame();
        this._createScoreBoard();
    }
    startGame() {
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

            if (coin <= 0) {
                alert("you lose");
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

        function Board(deck) {
            let board = new Board();
            let label = new setLabel();
            board.addChild(label);

            function Board() {
                console.log(deck);
                let board = new Node();
                deck.addChild(board);
                board.y = 100 * 4;
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

    _newStartGame() {
        this.deck.children.forEach((element, index) => {
            let _onClickCard = onClickCard.bind(element, this.canClick);
            element.view.addEventListener("click", _onClickCard);
        });

        function onClickCard(canClick) {
            console.log(this);
            let firstCard = null;
            if (!canClick) return null;
            if (!firstCard) {
                firstCard = 
                return null;
            }
            this.secondCard = this;
            console.log(this.secondCard);

        }
    }
    _createScoreBoard() {
        let board = new Board();
        this.deck.addChild(board)

        function Board() {
            let scoreBoard = new Node();
            scoreBoard.height = 100;
            scoreBoard.width = 500;
            scoreBoard.y = 400;

            return scoreBoard;
        }
    }
}
