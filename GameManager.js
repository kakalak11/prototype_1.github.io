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
        this.deck = deck;
        this.firstCard = null;
        this.secondCard = null;
        this.temp = [];
        this.canClick = true;
    }

    setup() {
        console.log(this.canClick);
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
        this.canClick = false;
        for (let y = 0; y < this.row; y++) {
            for (let x = 0; x < this.collum; x++) {
                let card = new Node();
                setPosition(card, x, y, this.deck, index);
                addCardElement(card, index);
                this.deck.addChild(card);
                index++;
            }
        }
        setTimeout(() => this.canClick = true, 2500);
        function addCardElement(card, index) {
            let cover = new Cover();
            card.addChild(cover);
            let label = new Label(Math.floor(index + 1));
            cover.addChild(label);
            let sprite = new Sprite(shuffledArray[index]);
            card.addChild(sprite);
        }
        function setPosition(card, x_pos, y_pos, deck, delayStep) {
            // card.x = x_pos * 100;
            // card.y = y_pos * 100;
            // card.spreadDeck(x_pos * 100, y_pos * 100);

            spread(card, x_pos * 100, y_pos * 100, delayStep);

            function spread(card, x, y, delayStep) {
                let tl = gsap.timeline({ repeat: 0, repeatDelay: 0 });
                tl.to(card.view, { x: 200, y: 150, duration: 0 });
                tl.to(card.view, { ease: Back.easeOut.config(3), x: x, y: y, duration: 0.5 });
                tl.delay(0.5 + delayStep * 0.1);
            }
        }
        this._newStartGame(this.coin);
        this.board = this._createScoreBoard(this.coin);
    }

    reset() {

    }

    _newStartGame(coin) {
        console.log(this);
        this.deck.children.forEach(element => {
            let _onClickCard = onClickCard.bind(element, this);
            element.view.addEventListener("click", _onClickCard);
        });
        let countWin = 10;
        function onClickCard(game) {
            console.log(game);
            console.log(game.canClick);
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
            firstCard.flipAway();
            secondCard.flipAway();
            coin += 1000;
            console.log(win);
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
        let score = new Score("Score: " + coin);
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
            this.board.children[0].string = "Score: " + coin;
            this.change.string = diff;
            flashChange(this.change);
        }

        if (diff === 1000) {
            this.board.children[0].string = "Score: " + coin;
            this.change.string = "+" + diff;
            flashChange(this.change);
        }

        if (coin <= 0) {
            this.deck.flipAway();
            setTimeout(() => {
                this.board.view.style.display = "initial";
                this.board.children[0].string = "GAME OVER !!!";

                let winBoard = new Board(coin);
                this.board.addChild(winBoard);

                function Board(coin) {
                    let winBoard = new Label();
                    let image = new Img("./fail.gif");
                    winBoard.addChild(image)
                    // winBoard.view.style.backgroundColor = "black";
                    winBoard.x = -45;
                    winBoard.y = -300;
                    // winBoard.string = coin + "/n";

                    function Img(image) {
                        let winImage = new Sprite(image);
                        winImage.view.style.display = "initial";
                        winImage.view.style.border = "none";
                        winImage.width = 500;
                        winImage.height = 250;
                        return winImage;
                    }
                    return winBoard;
                }
            }, 1000);
        }

        if (win > 9) {
            this.deck.flipAway();
            setTimeout(() => {
                this.board.view.style.display = "initial";
                this.board.children[0].string = "YOUR SCORE: " + coin + "!!!";
                this.board.children[0].view.style.fontSize = "45px";

                let winBoard = new Board(coin);
                this.board.addChild(winBoard);

                function Board(coin) {
                    let winBoard = new Label();
                    let image = new Img("./win.gif");
                    winBoard.addChild(image)
                    // winBoard.view.style.backgroundColor = "black";
                    winBoard.x = -45;
                    winBoard.y = -300;
                    // winBoard.string = coin + "/n";

                    function Img(image) {
                        let winImage = new Sprite(image);
                        winImage.view.style.display = "initial";
                        winImage.view.style.border = "none";
                        winImage.width = 500;
                        winImage.height = 250;
                        return winImage;
                    }
                    return winBoard;
                }
            }, 1000);
        }

        function Change() {
            let change = new Label();
            change.y = 20;
            change.x = 325;
            change.view.style.fontSize = "60px";
            return change;
        }

        function flashChange(change) {
            change.view.style.visibility = "visible";
            setTimeout(() => change.view.style.visibility = "hidden", 500);
        }
    }

    _onClickRetry() {

    }
}
