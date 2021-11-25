import { Cover } from "./core/Cover.js";
import { Label } from "./core/Label.js";
import { Node } from "./core/Node.js";
import { Sprite } from "./core/Sprite.js";

export class Manager extends Node {
    constructor(deck) {
        super();
        this.coin = null;
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
        this.coin = 10000;
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
        this._createScoreBoard(this.coin);
    }

    _newStartGame() {
        console.log(this);
        this.deck.children.forEach(element => {
            let _onClickCard = onClickCard.bind(element, this);
            element.view.addEventListener("click", _onClickCard);
        });

        function onClickCard(game) {
            console.log(this);
            if (!game.canClick) return null;
            if (!game.firstCard) {
                game.firstCard = this;
                this.flipOpen();
                return null;
            }
            if (game.firstCard === this) {
                console.log("same card");
                return null
            }
            game.secondCard = this;
            this.flipOpen();

            if (game.firstCard.children[0].image === game.secondCard.children[0].image) {
                cardMatch(game.firstCard, game.secondCard);
                game.secondCard = null;
                game.firstCard = null;
                return null;
            } else {
                cardMiss(game.firstCard, game.secondCard);
                game.secondCard = null;
                game.firstCard = null;
                return null;
            }
        }

        function cardMatch(firstCard, secondCard) {
            firstCard.flipAway();
            secondCard.flipAway();
        }
        function cardMiss(firstCard, secondCard) {
            firstCard.flipClose();
            secondCard.flipClose();
        }
    }
    _createScoreBoard(coin) {
        let board = new Board();
        let score = new Score(coin);
        this.deck.addChild(board)
        board.addChild(score);

        function Board() {
            let scoreBoard = new Node();
            scoreBoard.height = 100;
            scoreBoard.width = 502;
            scoreBoard.y = 400;
            scoreBoard.view.style.backgroundColor = "black";
            return scoreBoard;
        }

        function Score(coin) {
            let score = new Label(coin);
            score.x = 30;
            score.y = 20;
            score.view.style.fontSize = "60px";
            return score;
        }
    }
}
