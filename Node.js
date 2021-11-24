export class Node {
    constructor() {
        this._x = 0;
        this._y = 0;
        this._width = 0;
        this._height = 0;
        this._active = true;
        this.children = [];
        this.initView();
        this.view.style.position = "absolute";
        this.view.style.opacity = this._opacity;
    }
    get x() {
        return this._x;
    }
    set x(value) {
        this._x = value;
        this.view.style.left = this._x + 'px';
    }
    get y() {
        return this._y;
    }
    set y(value) {
        this._y = value;
        this.view.style.top = this._y + 'px';
    }
    get index() {
        return this.children[1];
    }
    get active() {
        return this._active;
    }
    initView() {
        this.view = document.createElement('div');
    }
    addChild(node) {
        this.children.push(node);
        this.view.appendChild(node.view);
    }
    display() {
        if (this._active) {
            this.view.style.display = "none";
        }
    }
    hide() {
        if (this._active) {
            this.view.style.display = "initial";
        }
    }
    delete() {
        this._active = false;
        this.view.style.display = "none";
        // this.view.style.backgroundColor = "black";
    }
}