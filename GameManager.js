import { Cover } from "./core/Cover.js";
import { Label } from "./core/Label.js";
import { Node } from "./core/Node.js";
import { Sprite } from "./core/Sprite.js";

export class Manager extends Node {
    constructor(deck) {
        super();
        this.started = null;
        this.coin = 1000;
        this.collum = 5;
        this.row = 4;
        this.canClick = true || this._canClick;
        this.deck = deck;
        this.firstCard = null;
        this.secondCard = null;
        this.temp = [];
    }

    set canClick(value) {
        this._canClick = value;
    }

    setup() {
        if (this.started) {
            console.log("game started");
        }
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
                setPosition(card, x, y, this.deck, index);
                addCardElement(card, index);
                // this.deck.addChild(card);
                index++;
            }
        }
        function addCardElement(card, index) {
            let cover = new Cover();
            card.addChild(cover);
            let label = new Label(Math.floor(index + 1));
            cover.addChild(label);
            let sprite = new Sprite(shuffledArray[index]);
            card.addChild(sprite);
        }
        function setPosition(card, x_pos, y_pos, deck, delayStep) {
            deck.addChild(card)
            // card.x = x_pos * 100;
            // card.y = y_pos * 100;
            // card.spreadDeck(x_pos * 100, y_pos * 100);

            spread(card, x_pos * 100, y_pos * 100);

            function spread(card, x, y) {
                let tl = gsap.timeline({ repeat: 0, repeatDelay: 0 });
                tl.to(card.view, 1, { x: x, y: y, duration: 0.1 });
                tl.delay(0.5 + delayStep * 0.5);
            }
        }
        this._newStartGame(this.coin);
        this.board = this._createScoreBoard(this.coin);
    }

    reset() {

    }

    _newStartGame(coin) {
        this.deck.children.forEach(element => {
            let _onClickCard = onClickCard.bind(element, this);
            element.view.addEventListener("click", _onClickCard);
        });
        let countWin = 9;
        function onClickCard(game) {
            if (!game.canClick) return null;
            if (!game.firstCard) {
                game.firstCard = this;
                this.flipOpen();
                return null;
            }
            if (game.firstCard === this) {
                game.firstCard.flipClose();
                game.firstCard = null;
                console.log("same card");
                return null;
            }
            game.secondCard = this;
            game.canClick = false;
            this.flipOpen();
            setTimeout(() => {
                if (game.firstCard.children[1].image === game.secondCard.children[1].image) {
                    countWin++;
                    cardMatch(game.firstCard, game.secondCard, countWin);
                    game.secondCard = null;
                    game.firstCard = null;
                    return null;
                } else {
                    cardMiss(game.firstCard, game.secondCard);
                    game.secondCard = null;
                    game.firstCard = null;
                    return null;
                }
            }, 500);
            setTimeout(() => game.canClick = true, 1000);
        }

        function cardMatch(firstCard, secondCard, win) {
            console.log("match");
            firstCard.flipAway();
            secondCard.flipAway();
            coin += 1000;
            update(1000, coin, win);
        }
        function cardMiss(firstCard, secondCard) {
            firstCard.flipClose();
            secondCard.flipClose();
            coin -= 500;
            update(-500, coin);
        }
        let update = (diff, coin, win) => this._update(diff, coin, win);

    }
    _createScoreBoard(coin) {
        let board = new Board();
        let score = new Score(coin);
        console.log(this.deck);
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
            score.width = 500;
            score.height = 100;
            score.view.style.textAlign = "left";
            score.view.style.fontSize = "60px";
            return score;
        }

        return board;
    }
    _update(diff, coin, win) {
        console.log(this.deck);
        if (!this.change) {
            this.change = new Change();
        }
        this.board.addChild(this.change);

        if (diff === -500) {
            this.board.children[0].string = coin;
            this.change.string = diff;
            flashChange(this.change);
        }

        if (diff === 1000) {
            this.board.children[0].string = coin;
            this.change.string = "+" + diff;
            flashChange(this.change);
        }

        if (coin <= 0) {
            this.deck.flipAway();
            setTimeout(() => {
                this.board.view.style.display = "initial";
                this.board.children[0].string = "GAME OVER !!!";
            }, 1000);
        }
        console.log(win);

        if (win > 9) {
            this.deck.flipAway();
            setTimeout(() => {
                this.board.view.style.display = "initial";
                this.board.children[0].string = "GAME WIN !!!";
            }, 1000);
        }

        function Change() {
            let change = new Label();
            change.y = 20;
            change.x = 200;
            change.view.style.fontSize = "60px";
            return change;
        }

        function flashChange(change) {
            change.view.style.visibility = "visible";
            setTimeout(() => change.view.style.visibility = "hidden", 500);
        }
    }
}
