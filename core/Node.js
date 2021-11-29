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
    set color(value) {
        this.view.style.backgroundColor = value;
    }
    set active(value) {
        this._active = value;
    }
    initView() {
        this.view = document.createElement('div');
        return null;
    }
    addChild(node) {
        this.children.push(node);
        this.view.appendChild(node.view);
        return null;
    }
    unfold() {
        this.view.style.display = "none";
        return null;
    }
    fold() {
        this.view.style.display = "initial";
        return null;
    }
    showAgain() {
        if (this._active) this.view.style.display = "initial";
        return null;
    }
    show() {
        let tl = gsap.timeline({ repeat: 0, repeatDelay: 0 });
        tl.to(this.view, { scaleX: 0, duration: 0.5, transformOrigin: '50px 50px' });
        tl.add(() => this.children.forEach(element => element.unfold()));
        tl.to(this.view, { scaleX: 1, duration: 0.5, transformOrigin: '50px 50px' });
        return null;
    }
    hide() {
        let tl = gsap.timeline({ repeat: 0, repeatDelay: 0 });
        tl.to(this.view, { scaleX: 0, duration: 0.5, transformOrigin: '50px 50px' });
        tl.add(() => this.children.forEach(element => element.fold()));
        tl.to(this.view, { scaleX: 1, duration: 0.5, transformOrigin: '50px 50px' });
        tl.delay(0.5);
        return null;
    }
    disappear(active = true) {
        let tl = gsap.timeline({ repeat: 0, repeatDelay: 0 });
        tl.to(this.view, { opacity: 0, duration: 0.5 });
        tl.add(() => this._active = active);
        tl.add(() => this.children.forEach(element => element.view.style.display = "none"));
        tl.delay(0.5);
        return null;
    }

    continue() {
        let tl = gsap.timeline({ repeat: 0, repeatDelay: 0 });
        tl.to(this.view, { opacity: 0, duration: 0 });
        tl.add(() => this.children.forEach(element => element.showAgain()));
        tl.to(this.view, { opacity: 1, duration: 1 });
        tl.delay(0.5);
        return null;
    }

    spreadDeck(x, y, index, audio) {
        shuffle(this, index, audio);
        let tl = gsap.timeline({ repeat: 0, repeatDelay: 0 });
        tl.to(this.view, { x: x, y: y, ease: Back.easeOut.config(3), duration: 0.5 });
        tl.delay(3.2 + index * 0.1);

        function shuffle(card, index, audio) {
            let tl = gsap.timeline({ repeat: 0, repeatDelay: 0 });
            tl.to(card.view, { x: 200, y: 150, opacity: 0, duration: 0 });
            tl.to(card.view, { opacity: 1, duration: 0.2, });
            tl.add(() => audio.shuffle());
            tl.delay(0.5 + index * 0.1);
        }

        return null;
    }
}