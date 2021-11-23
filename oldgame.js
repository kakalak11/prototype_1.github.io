import { Cover } from "./Cover.js";
import { Label } from "./Label.js";
import { Node } from "./Node.js"
import { Sprite } from "./Sprite.js"

// // let cover = new Cover();
// // let label = new Label();
// // label.string = 20;
// // cover.addChild(label);
// // console.log(cover);
// // document.body.appendChild(cover.view);

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

// console.log(shuffledArray);

const cards = [];
const nodes = [];

for (let index = 0; index < 20; index++) {
    let node = new Node();
    nodes.push(node);
}

function setPosition(nodes) {
    let index = 0;
    // this.nodes = nodes;
    for (let x = 0; x < 5; x++) {
        for (let y = 0; y < 4; y++) {
            nodes[index].children[0]
            nodes[index].x = x * 90;
            nodes[index].y = y * 90;
            nodes[index].children[0].x = x * 90;
            nodes[index].children[0].y = y * 90;
            nodes[index].pushChild(index + 1);
            // console.log(nodes[index].children);
            index++;
        }
    }
}


nodes.forEach((node, index) => {
    let cover = new Cover();
    let sprite = new Sprite();
    node.addChild(cover);
    node.addChild(sprite);
    // console.log(shuffledArray[index]);
    sprite.setImage(shuffledArray[index]);
    // node.initView(cover);
    let _onClickFunction = onClickFunction.bind(node);
    node.children[0].view.addEventListener("click", _onClickFunction);
});

function onClickFunction() {
    // console.log(this.index);
    // temp.push(nodes[this.index]);
    checkLogic(this.index);
    this.view.style.display = "none";
}

let temp = [];
let canClick = true;

function checkLogic(index) {
    console.log(index);
    temp.push(index);
    if (temp.length === 2 && temp[0] !== temp[1]) {
        canClick = false;
        //     if (nodes[temp[0]].children)
    }
    else {
        console.log("same card");
        temp = [];
    }
}

function setCover(nodes) {
    nodes.forEach(node => {
        document.body.appendChild(node.children[0].view);
    });
}


function startGame() {
    setPosition(nodes);
    setCover(nodes);
    console.log(nodes[0].children);
}

startGame();