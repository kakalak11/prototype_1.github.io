export class Node {
    constructor() {
        this._x = 0;
        this._y = 0;
        this._width = 0;
        this._height = 0;
        this._active = true;
        // this._index = index;
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
    set width(value) {
        this._width = value;
        this.view.style.width = value + 'px';
    }
    get width() {
        return this._width;
    }
    set height(value) {
        this._height = value;
        this.view.style.height = value + 'px';
    }
    get height() {
        return this._height;
    }
    get index() {
        return this.children[1];
    }
    get active() {
        return this._active;
    }
    set active(value) {
        this._active = value;
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
    flipOpen() {
        console.log(this.view);
        let tl = gsap.timeline({repeat: 0, repeatDelay: 0});
        tl.to(this.view, {opacity: 0, duration: 0.5});
        tl.add(() => this.children.forEach(element => element.display()));
        tl.to(this.view, {opacity: 1, duration: 0.5});
    }
    flipClose() {
        console.log(this.view);
        let tl = gsap.timeline({repeat: 0, repeatDelay: 0});
        tl.to(this.view, {opacity: 0, duration: 0.5});
        tl.add(() => this.children.forEach(element => element.hide()));
        tl.to(this.view, {opacity: 1, duration: 0.5});
    }
    flipAway() {
        console.log(this.view);
        let tl = gsap.timeline({repeat: 0, repeatDelay: 0});
        tl.to(this.view, {opacity: 0, duration: 0.5});
        tl.add(() => this.children.forEach(element => element.delete()));
        tl.to(this.view, {opacity: 1, duration: 0.5});
    }
}