"use strict";
var Block = (function () {
    function Block(elem, isBomb, content) {
        this.isBomb = false;
        this.isBlank = true;
        this.isTurned = false;
        this.content = "";
        this.innerContent = "";
        this.elem = elem;
        this.isBomb = isBomb;
        this.content = content;
        this.turnColor = this.isBomb ? "#000" : "#fff";
    }
    Block.prototype.setContent = function (content) {
        this.content = content;
        this.elem.innerHTML = this.content;
    };
    Block.prototype.setInnerContent = function (innerContent) {
        this.innerContent = innerContent;
        this.elem.innerHTML = this.innerContent;
    };
    Block.prototype.setBomb = function (isBomb) {
        this.isBomb = isBomb;
        this.turnColor = this.isBomb ? "#000" : "#fff";
    };
    Block.prototype.getBomb = function () {
        return this.isBomb;
    };
    Block.prototype.getContent = function () {
        return this.content;
    };
    Block.prototype.getInnerContent = function () {
        return this.innerContent;
    };
    Block.prototype.turn = function () {
        this.isTurned = true;
        this.elem.onmouseup = null;
        if (this.isBlank) {
            this.turnAround(this);
        }
        else if (this.isBomb) {
        }
        else {
            this.elem.style.backgroundColor = this.turnColor;
            this.elem.innerHTML = this.innerContent;
        }
    };
    Block.prototype.turnAround = function (block) {
        this.elem.style.backgroundColor = this.turnColor;
        this.elem.innerHTML = this.innerContent;
    };
    return Block;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Block;
