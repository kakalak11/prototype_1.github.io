import { Node } from "./Node.js";
import { Label } from "./Label.js";
import { Game } from "./Game.js";
import { Manager } from "./GameManager.js";

function createMenu() {
    let manager = new Manager();
    let menu = new Menu();
    document.body.appendChild(menu.view);
    let startButton = new Start();
    let _onClickStart = onClickStart.bind(manager);
    startButton.view.addEventListener("click", _onClickStart);
    let resetButton = new Reset();
    let _onClickReset = onClickReset.bind(manager);
    resetButton.view.addEventListener("click", _onClickReset);
    
    menu.addChild(startButton);
    menu.addChild(resetButton);
    
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