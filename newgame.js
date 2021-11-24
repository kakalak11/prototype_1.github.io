import { Cover } from "./Cover.js";
import { Label } from "./Label.js";
import { Node } from "./Node.js";
import { Sprite } from "./Sprite.js";
import { Game } from "./Game.js";

let game = new Game();
function setup() {
    createPlayButton();
}
function createPlayButton() {
    let node = new Node();
    document.body.appendChild(node.view)
    let button = new Label();
    node.addChild(button);
    button.string = "PLAY";
    button.view.style.color = "black";
    button.view.style.border = "2px solid black"
    node.y = 450;
    node.x = 200;
    // let _onClick = onClickStart.bind(game);
    button.view.addEventListener("click", game.startGame);
}
setup();
