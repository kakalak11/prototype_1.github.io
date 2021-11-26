import { Cover } from "./core/Cover.js";
import { Label } from "./core/Label.js";
import { Node } from "./core/Node.js";
import { Sprite } from "./core/Sprite.js";

export class Game {
    constructor() {
        this.countWin = 9;
        this.coin = 1000;
        this.firstCard = null;
        this.secondCard = null;
        this.canClick = true;
        this.audio = this._audioSetup();
        this.deck = this._deckInit();
        this.scoreBoard = this._scoreBoardInit();
        this.gameWindow = this._gameWindowInit(this.deck, this.scoreBoard);
    }

    _audioSetup() {
        var audio = {
            click: () => {
                if (!this.click) this.click = new Audio('./click.wav');
                this.click.play();
            },
            lose: () => {
                if (!this.lose) this.lose = new Audio('over.wav');
                this.lose.play();
            },
            win: () => {
                if (!this.win) this.win = new Audio('win.wav');
                this.win.play();
            },
            correct: () => {
                if (!this.correct) this.correct = new Audio('correct.wav');
                this.correct.play();
            },
            wrong: () => {
                if (!this.wrong) this.wrong = new Audio('wrong.wav');
                this.wrong.play();
            }
        };
        return audio;
    }

    _gameWindowInit(deck, scoreBoard) {
        const WINDOW_WIDTH = 700;
        const WINDOW_HEIGHT = 800;
        let game_window = new Window(WINDOW_WIDTH, WINDOW_HEIGHT);
        document.body.appendChild(game_window.view);
        let menu = new Menu();
        let background = new Background(WINDOW_WIDTH, WINDOW_HEIGHT);
        let title = new Title();

        let startButton = new Start();
        let resetButton = new Reset();
        let retryButton = new Retry();
        // let _onClickStart = onClickStart.bind(game);
        // let _onClickReset = onClickReset.bind(manager);
        // let _onClickRetry = onClickRetry.bind(manager);
        // startButton.view.addEventListener("click", _onClickStart, deck);
        // resetButton.view.addEventListener("click", _onClickReset, deck);
        // retryButton.view.addEventListener("click", _onClickRetry, deck);

        game_window.addChild(background);
        game_window.addChild(menu);
        game_window.addChild(title);
        game_window.addChild(deck);
        game_window.addChild(scoreBoard);
        menu.addChild(startButton);
        menu.addChild(resetButton);
        // menu.addChild(retryButton);

        function Title() {
            let title = new Label("TRUC XANH");
            title.view.style.fontSize = "60px";
            title.x = 100;
            title.y = 10;
            title.width = 500;
            title.height = 65;
            // title.view.style.backgroundColor = "black";

            return title
        }

        function Menu() {
            let menu = new Node();
            menu.view.style.backgroundColor = "black";
            menu.y = 620;
            menu.x = 100;
            menu.width = 502;
            menu.height = 100;
            return menu;
        }

        function Retry() {
            let retryButton = new Label("RETRY");
            retryButton.x = 350;
            retryButton.y = 30;
            retryButton.height = 30;
            retryButton.view.style.border = "2px solid white";
            return retryButton;
        }

        function Start() {
            let startButton = new Label("START");
            startButton.y = 5;
            startButton.x = 5;
            startButton.height = 85;
            startButton.width = 241;
            startButton.view.style.fontSize = "65px";
            startButton.view.style.border = "2px solid white";
            return startButton;
        }

        function Reset() {
            let resetButton = new Label("RESET");
            resetButton.y = 5;
            resetButton.x = 256;
            resetButton.height = 85;
            resetButton.width = 236;
            resetButton.view.style.fontSize = "65px";
            resetButton.view.style.border = "2px solid white";
            return resetButton;
        }

        function Background(width, height) {
            let background = new Sprite("./BG.jpg");
            background.view.style.display = "initial";
            background.width = width;
            background.height = height;
            background.view.style.border = "none";
            return background;
        }

        function Window(width, height) {
            let game_window = new Node();
            game_window.width = width;
            game_window.height = height;
            game_window.view.style.border = "2px solid black";
            return game_window;
        }
        return game_window;
    }

    _deckInit() {
        if (!this.image) {
            this.image = new shuffleImage();
        }
        let deck = new Deck(this.image);

        function shuffleImage() {
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
            return shuffledArray;
        }

        function Deck(image) {
            let deck = new Node();
            deck.x = 100;
            deck.y = 100;
            deck.width = 500;
            deck.height = 400;
            addElement(image);

            function addElement(image) {
                let index = 0
                for (let y = 0; y < 4; y++) {
                    for (let x = 0; x < 5; x++) {
                        let card = new Node();
                        card.x = x * 100;
                        card.y = y * 100;
                        let sprite = new Sprite(image[index]);
                        card.addChild(sprite);
                        let cover = new Cover();
                        card.addChild(cover);
                        let label = new Label(index + 1);
                        card.addChild(label);
                        deck.addChild(card);
                        index++;
                    }
                }

            }

            return deck;
        }
        deck.children.forEach(element => {
            let _onClick = this._onClickCard.bind(element, this);
            element.view.addEventListener("click", _onClick);
        });
        return deck;
    }

    _scoreBoardInit() {
        let scoreBoard = new Board(this.coin);
        let change = new Change();

        scoreBoard.addChild(change);

        function Board(coin) {
            let scoreBoard = new Node();
            scoreBoard.x = 100;
            scoreBoard.y = 502;
            scoreBoard.width = 502;
            scoreBoard.height = 100;
            scoreBoard.color = "black";
            let text = new Label("Score: ");
            text.view.style.fontSize = "50px";
            text.y = 22;
            text.x = 20;

            let score = new Score();
            scoreBoard.addChild(text);
            scoreBoard.addChild(score);

            function Score() {
                let score = new Label(coin);
                score.y = 22;
                score.x = -30;
                score.width = 502;
                score.height = 100;
                score.view.style.fontSize = "50px";
                return score;
            }

            return scoreBoard;
        }

        function Change() {
            let change = new Label("+ 1000");
            change.view.style.fontSize = "50px";
            change.x = 275;
            change.y = 20;
            change.width = 200;
            change.view.style.display = 'none';
            return change;
        }

        return scoreBoard;
    }

    _onClickCard(game) {
        game.audio.click();
        if (!game.canClick) return null;
        if (!game.firstCard) {
            game.firstCard = this;
            game.firstCard.flipOpen();
            return null;
        }
        if (game.firstCard === this) {
            console.log("same card");
            game.firstCard.flipClose();
            game.firstCard = null;
            return null;
        }

        game.secondCard = this;
        game.secondCard.flipOpen();
        game.canClick = false;
        setTimeout(() => {
            if (game.firstCard.children[0].image === game.secondCard.children[0].image) {
                game._matchCard(game.firstCard, game.secondCard);
                game.firstCard = null;
                game.secondCard = null;
                game.canClick = true;
                return true;
            } else {
                game._missCard(game.firstCard, game.secondCard);
                game.firstCard = null;
                game.secondCard = null;
                game.canClick = true;
                return false;
            }
        }, 500);
    }

    _matchCard(firstCard, secondCard) {
        this.audio.correct();
        this.coin += 1000;
        firstCard.flipAway();
        secondCard.flipAway();
        this.countWin++;
        this._update(1000);
        return null;
    }

    _missCard(firstCard, secondCard) {
        this.audio.wrong();
        this.coin -= 500;
        firstCard.flipClose();
        secondCard.flipClose();
        // this.countWin++;
        this._update(-500);
        return null;
    }

    _update(value) {
        if (!this.text) this.text = this.scoreBoard.children[0];
        if (!this.score) this.score = this.scoreBoard.children[1];
        if (!this.change) this.change = this.scoreBoard.children[2];
        this.score.string = this.coin;
        console.log(this.scoreBoard);
        if (this.coin <= 0) {
            this._lose();
            return null
        }

        if (this.countWin > 9) {
            this._win();
            return null
        }

        if (value === 1000) {
            this.change.string = "+" + value;
            flashChange(this.change);
            return null;
        }

        if (value === -500) {
            this.change.string = value;
            flashChange(this.change);
            return null;
        }

        function flashChange(change) {
            change.view.style.display = "initial";
            setTimeout(() => change.view.style.display = "none", 500);
        }


    }

    _lose() {
        this.audio.lose();
        this.deck.flipAway();
        setTimeout(() => {
            this.score.string = "GAME OVER !!!";
            this.score.view.style.fontSize = "60px";
            this.score.x = 0;
            this.score.y = 20;
            this.text.string = "";
            let image = new Img();
            this.scoreBoard.addChild(image);

            function Img() {
                let loseImage = new Sprite("./fail.gif");
                loseImage.view.style.display = "initial";
                loseImage.view.style.border = "none";
                loseImage.width = 502;
                loseImage.height = 250;
                loseImage.y = -300;
                return loseImage;
            }
        }, 500);
    }

    _win() {
        this.audio.win();
        this.deck.flipAway();
        setTimeout(() => {
            this.score.string = "YOUR SCORE: " + this.coin + "!!!";
            this.score.view.style.fontSize = "45px";
            this.score.x = 0;
            this.score.y = 20;
            this.text.string = "";
            let image = new Img("./win.gif");
            this.scoreBoard.addChild(image);

            function Img(image) {
                let winImage = new Sprite(image);
                winImage.view.style.display = "initial";
                winImage.view.style.border = "none";
                winImage.width = 502;
                winImage.height = 250;
                winImage.y = -300;
                return winImage;
            }
            return winBoard;
        }, 1000);
    }
}