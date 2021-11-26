import { Node } from "./core/Node.js";
import { Label } from "./core/Label.js";
import { Manager } from "./GameManager.js";
import { Sprite } from "./core/Sprite.js";

const WINDOW_WIDTH = 700;
const WINDOW_HEIGHT = 800;

function createWindow() {
    var game_window = new Window(WINDOW_WIDTH, WINDOW_HEIGHT);
    document.body.appendChild(game_window.view);
    let click = new Audio('click.wav');
    let deck = new Deck();
    let manager = new Manager(deck);
    let menu = new Menu();
    let background = new Background(WINDOW_WIDTH, WINDOW_HEIGHT);
    let title = new Title();

    let startButton = new Start();
    let resetButton = new Reset();
    let retryButton = new Retry();
    let _onClickStart = onClickStart.bind(manager);
    let _onClickReset = onClickReset.bind(manager);
    let _onClickRetry = onClickRetry.bind(manager);
    startButton.view.addEventListener("click", _onClickStart, deck);
    resetButton.view.addEventListener("click", _onClickReset, deck);
    retryButton.view.addEventListener("click", _onClickRetry, deck);

    game_window.addChild(background);
    game_window.addChild(menu);
    game_window.addChild(title);
    game_window.addChild(deck);
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

    function Deck() {
        let deck = new Node();
        deck.x = 100;
        deck.y = 100;
        return deck;
    }



    function onClickStart(deck) {
        click.play();
        console.log("game start");
        this.setup();
        startButton.view.removeEventListener("click", _onClickStart)
        return null;
    }


    function onClickReset(deck) {
        click.play();
        location.reload();
        this.setup();
        return null;
    }

    function onClickRetry() {
        alert("not work yet");
        // this._onClickRetry()
    }
}


// document.body.appendChild(deck.view);
createWindow();