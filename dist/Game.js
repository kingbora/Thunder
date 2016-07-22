"use strict";
var block_1 = require("./block");
var Game = (function () {
    function Game() {
        this.colNum = 10;
        this.rawNum = 10;
        this.width = 30;
        this.bombNum = 5;
        this.bombArray = [];
        this.blockArray = [];
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
                b = new block_1.default(block, false, "");
                block.onmouseup = function (e) {
                    if (e.button == 0) {
                        b.turn();
                        if (b.getBomb()) {
                            _this.turnOtherBomb();
                            alert("Game Over!!!");
                        }
                    }
                    else if (e.button == 2) {
                        if (b.getContent() == "1") {
                            b.setContent("");
                            _this.restBomb++;
                        }
                        else {
                            b.setContent("1");
                            _this.restBomb--;
                        }
                        document.getElementsByClassName('bomb')[0].innerHTML = _this.restBomb + "";
                    }
                };
                this_1.blockArray.push(b);
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
            this.blockArray[this.bombArray[i]].turn();
        }
    };
    Game.prototype.initNumber = function () {
        var count = 0;
    };
    Game.prototype.randomBomb = function () {
        while (this.bombArray.length < this.bombNum) {
            var x = Math.floor(Math.random() * (this.colNum * this.rawNum));
            if (this.bombArray.indexOf(x) == -1) {
                this.bombArray.push(x);
            }
        }
        console.log(this.bombArray);
        for (var i = 0; i < this.bombArray.length; i++) {
            this.blockArray[this.bombArray[i]].setBomb(true);
        }
    };
    return Game;
}());
window.onload = function () {
    new Game().initUI();
};
