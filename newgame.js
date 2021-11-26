import { Node } from "./core/Node.js";
import { Label } from "./core/Label.js";
import { Manager } from "./GameManager.js";
import { Sprite } from "./core/Sprite.js";

const WINDOW_WIDTH = 700;
const WINDOW_HEIGHT = 800;

function createWindow() {
    var game_window = new Window(WINDOW_WIDTH, WINDOW_HEIGHT);
    document.body.appendChild(game_window.view);
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
    menu.addChild(startButton);
    menu.addChild(resetButton);
    menu.addChild(retryButton);
    game_window.addChild(deck);

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
        startButton.y = 30;
        startButton.x = 30;
        startButton.height = 30;
        startButton.view.style.border = "2px solid white";
        return startButton;
    }

    function Reset() {
        let resetButton = new Label("RESET");
        resetButton.y = 30;
        resetButton.x = 500 / 3 + 20;
        resetButton.height = 30;
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
        console.log("game start");
        this.setup();
        startButton.view.removeEventListener("click", _onClickStart)
        return null;
    }


    function onClickReset(deck) {
        location.reload();
        this.setup();
        return null;
    }

    function onClickRetry() {
        this._onClickRetry()
    }
}


// document.body.appendChild(deck.view);
createWindow();