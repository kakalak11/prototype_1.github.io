import { Node } from "./core/Node.js";
import { Label } from "./core/Label.js";
import { Manager } from "./GameManager.js";
import { Sprite } from "./core/Sprite.js";

function createMenu() {
    let manager = new Manager();
    let menu = new Menu();
    let background = new Background();
    document.body.appendChild(menu.view);
    let startButton = new Start();
    let _onClickStart = onClickStart.bind(manager);
    startButton.view.addEventListener("click", _onClickStart);
    let resetButton = new Reset();
    let _onClickReset = onClickReset.bind(manager);
    resetButton.view.addEventListener("click", _onClickReset);

    menu.addChild(startButton);
    menu.addChild(resetButton);
    menu.addChild(background);

    function Menu() {
        let menu = new Node();
        menu.view.style.backgroundColor = "black";
        menu.y = 600;
        menu.x = 100;
        menu.width = 502;
        menu.height = 100;
        return menu;
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
        resetButton.x = 502 / 3 + 30;
        resetButton.height = 30;
        resetButton.view.style.border = "2px solid white";
        return resetButton;
    }

    function Background() {
        let background = new Node();
        let sprite = new Sprite();
        sprite.setImage("./BG.jpg");
        return background;
    }
}

function onClickStart() {
    let deck = new Node();
    this.createDeck(deck);
}

function onClickReset() {
    alert("Not work yet!");
}

// document.body.appendChild(deck.view);
createMenu();