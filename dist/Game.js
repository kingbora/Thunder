"use strict";
var block_1 = require("./block");
var Game = (function () {
    function Game() {
        this.colNum = 10;
        this.rawNum = 10;
        this.width = 30;
        this.bombNum = 10;
        this.bombArray = [];
        this.blockArray = [[], [], [], [], [], [], [], [], [], [], [], [], []];
        this.restBomb = this.bombNum;
    }
    Game.prototype.initUI = function () {
        var _this = this;
        this.area = document.createElement("div");
        this.area.style.width = (this.width + 2) * this.colNum + "px";
        this.area.style.height = (this.width + 2) * this.rawNum + "px";
        this.area.className = "area";
        document.body.appendChild(this.area);
        for (var i = 0; i < this.colNum; i++) {
            var _loop_1 = function() {
                block = document.createElement("div");
                block.className = "block";
                block.style.width = this_1.width + "px";
                block.style.height = this_1.width + "px";
                block.style.lineHeight = this_1.width + "px";
                var b;
                b = new block_1.default(block, false, "", i, j, this_1.colNum, this_1.rawNum);
                block.onmouseup = function (e) {
                    if (e.button == 0) {
                        if (!b.getFlag()) {
                            _this.turn(b);
                            if (b.getBomb()) {
                                _this.turnOtherBomb();
                                alert("Game Over!!!");
                            }
                        }
                    }
                    else if (e.button == 2) {
                        if (b.getContent() == "1") {
                            b.setContent("");
                            b.setFlag(false);
                            _this.restBomb++;
                        }
                        else {
                            b.setContent("1");
                            b.setFlag(true);
                            _this.restBomb--;
                        }
                        document.getElementsByClassName('bomb')[0].innerHTML = _this.restBomb + "";
                    }
                };
                this_1.blockArray[i][j] = b;
                this_1.area.appendChild(block);
            };
            var this_1 = this;
            var block;
            for (var j = 0; j < this.rawNum; j++) {
                _loop_1();
            }
        }
        var div = document.createElement("div");
        div.innerHTML = "剩余雷数：<label class='bomb'>" + this.restBomb + "</label>" +
            "<button onclick='window.location.reload();'>重新开始</button>";
        document.body.appendChild(div);
        this.area.oncontextmenu = function (event) {
            event.returnValue = false;
        };
        this.area.onselectstart = function (event) {
            event.returnValue = false;
        };
        this.randomBomb();
        this.initNumber();
    };
    Game.prototype.turnOtherBomb = function () {
        for (var i = 0; i < this.bombArray.length; i++) {
            this.turn(this.blockArray[this.bombArray[i].x][this.bombArray[i].y]);
            this.blockArray[this.bombArray[i].x][this.bombArray[i].y].getElement().style.backgroundColor = "#000";
        }
    };
    Game.prototype.turn = function (block) {
        block.setTurn(true);
        block.getElement().onmouseup = null;
        if (block.getBlank()) {
            this.turnAround(block);
        }
        else if (block.getBomb()) {
            block.getElement().style.backgroundColor = "#000";
        }
        else {
            block.getElement().style.backgroundColor = "#fff";
            block.getElement().innerHTML = block.getInnerContent();
        }
    };
    Game.prototype.isNull = function (Bomb) {
        var i = Bomb.getX(), j = Bomb.getY();
        for (var x = i - 1; x < i + 2; x++) {
            for (var y = j - 1; y < j + 2; y++) {
                if (((x != i) || (y != j)) && (x >= 0) && (y >= 0)
                    && x < this.rawNum && y < this.colNum) {
                    if (this.blockArray[x][y].getBomb() == false
                        && this.blockArray[x][y].getTurn() == false) {
                        this.turn(this.blockArray[x][y]);
                    }
                }
            }
        }
    };
    Game.prototype.turnAround = function (block) {
        block.getElement().style.backgroundColor = "#fff";
        block.getElement().innerHTML = block.getInnerContent();
        this.isNull(block);
    };
    Game.prototype.initNumber = function () {
        for (var i = 0; i < this.colNum; i++) {
            for (var j = 0; j < this.rawNum; j++) {
                var count = 0;
                if (!this.blockArray[i][j].getBomb()) {
                    for (var x = i - 1; x < i + 2; x++) {
                        for (var y = j - 1; y < j + 2; y++) {
                            if ((x >= 0) && (y >= 0) && (x < this.colNum) && (y < this.rawNum)) {
                                if (this.blockArray[x][y].getBomb()) {
                                    count++;
                                }
                            }
                        }
                    }
                }
                if (count == 0) {
                    this.blockArray[i][j].setInnerContent("");
                    this.blockArray[i][j].setBlank(true);
                }
                else {
                    this.blockArray[i][j].setInnerContent(count + "");
                    this.blockArray[i][j].setBlank(false);
                }
            }
        }
    };
    Game.prototype.randomBomb = function () {
        while (this.bombArray.length < this.bombNum) {
            var x = Math.floor(Math.random() * this.colNum);
            var y = Math.floor(Math.random() * this.rawNum);
            if (this.bombArray.indexOf({ 'x': x, 'y': y }) == -1) {
                this.bombArray.push({ 'x': x, 'y': y });
            }
        }
        console.log(this.bombArray);
        for (var i = 0; i < this.bombArray.length; i++) {
            this.blockArray[this.bombArray[i].x][this.bombArray[i].y].setBomb(true);
        }
    };
    return Game;
}());
window.onload = function () {
    new Game().initUI();
};
