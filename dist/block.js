"use strict";
var Block = (function () {
    function Block(elem, isBomb, content, x, y, col, raw) {
        this.isBomb = false;
        this.isBlank = true;
        this.isTurned = false;
        this.isFlag = false;
        this.content = "";
        this.innerContent = "";
        this.elem = elem;
        this.isBomb = isBomb;
        this.content = content;
        this.turnColor = this.isBomb ? "#000" : "#fff";
        this.x = x;
        this.y = y;
        this.raw = raw;
        this.col = col;
    }
    Block.prototype.setFlag = function (flag) {
        this.isFlag = flag;
    };
    Block.prototype.getFlag = function () {
        return this.isFlag;
    };
    Block.prototype.setBlank = function (flag) {
        this.isBlank = flag;
    };
    Block.prototype.getX = function () {
        return this.x;
    };
    Block.prototype.getY = function () {
        return this.y;
    };
    Block.prototype.getElement = function () {
        return this.elem;
    };
    Block.prototype.getBlank = function () {
        return this.isBlank;
    };
    Block.prototype.setTurn = function (flag) {
        this.isTurned = flag;
    };
    Block.prototype.setContent = function (content) {
        this.content = content;
        this.elem.innerHTML = this.content;
    };
    Block.prototype.setInnerContent = function (innerContent) {
        this.innerContent = innerContent;
        if (this.isTurned) {
            this.elem.innerHTML = this.innerContent;
        }
    };
    Block.prototype.setBomb = function (isBomb) {
        this.isBomb = isBomb;
        this.turnColor = this.isBomb ? "#000" : "#fff";
    };
    Block.prototype.getTurn = function () {
        return this.isTurned;
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
    return Block;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Block;
