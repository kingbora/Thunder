(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
        //屏蔽鼠标右键定义的菜单功能
        this.area.oncontextmenu = function (event) {
            event.returnValue = false;
        };
        this.area.onselectstart = function (event) {
            event.returnValue = false;
        };
        //初始化雷区
        this.randomBomb();
        //初始化数字界面
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
        //生成随机雷数组
        while (this.bombArray.length < this.bombNum) {
            var x = Math.floor(Math.random() * (this.colNum * this.rawNum));
            if (this.bombArray.indexOf(x) == -1) {
                this.bombArray.push(x);
            }
        }
        console.log(this.bombArray);
        //初始化雷
        for (var i = 0; i < this.bombArray.length; i++) {
            this.blockArray[this.bombArray[i]].setBomb(true);
        }
    };
    return Game;
}());
window.onload = function () {
    new Game().initUI();
};
},{"./block":2}],2:[function(require,module,exports){
"use strict";
//common block class,described the common property of block
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
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvR2FtZS50cyIsInNyYy9ibG9jay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUNBQSxzQkFBa0IsU0FBUyxDQUFDLENBQUE7QUFFNUI7SUFBQTtRQUNFLFdBQU0sR0FBVyxFQUFFLENBQUM7UUFDcEIsV0FBTSxHQUFXLEVBQUUsQ0FBQztRQUNwQixVQUFLLEdBQVcsRUFBRSxDQUFDO1FBQ25CLFlBQU8sR0FBVyxDQUFDLENBQUM7UUFFcEIsY0FBUyxHQUFhLEVBQUUsQ0FBQztRQUN6QixlQUFVLEdBQVksRUFBRSxDQUFDO1FBQ3pCLGFBQVEsR0FBVyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBeUZsQyxDQUFDO0lBdkZDLHFCQUFNLEdBQU47UUFBQSxpQkF5REM7UUF4REMsSUFBSSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDNUQsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUMvRCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUM7UUFDN0IsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JDLEdBQUcsQ0FBQSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUcsRUFBRSxDQUFDO1lBQ3JDO2dCQUNN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c0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgQmxvY2sgZnJvbSBcIi4vYmxvY2tcIjtcclxuXHJcbmNsYXNzIEdhbWUge1xyXG4gIGNvbE51bTogbnVtYmVyID0gMTA7XHJcbiAgcmF3TnVtOiBudW1iZXIgPSAxMDtcclxuICB3aWR0aDogbnVtYmVyID0gMzA7XHJcbiAgYm9tYk51bTogbnVtYmVyID0gNTtcclxuICBhcmVhOiBIVE1MRWxlbWVudDtcclxuICBib21iQXJyYXk6IG51bWJlcltdID0gW107XHJcbiAgYmxvY2tBcnJheTogQmxvY2tbXSA9IFtdO1xyXG4gIHJlc3RCb21iOiBudW1iZXIgPSB0aGlzLmJvbWJOdW07XHJcblxyXG4gIGluaXRVSSgpe1xyXG4gICAgdGhpcy5hcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIHRoaXMuYXJlYS5zdHlsZS53aWR0aCA9ICh0aGlzLndpZHRoKzIpICogdGhpcy5jb2xOdW0gKyBcInB4XCI7XHJcbiAgICB0aGlzLmFyZWEuc3R5bGUuaGVpZ2h0ID0gKHRoaXMud2lkdGggKyAyKSAqIHRoaXMucmF3TnVtICsgXCJweFwiO1xyXG4gICAgdGhpcy5hcmVhLmNsYXNzTmFtZSA9IFwiYXJlYVwiO1xyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmFyZWEpO1xyXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IHRoaXMuY29sTnVtOyBpICsrKSB7XHJcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy5yYXdOdW07IGogKyspIHtcclxuICAgICAgICB2YXIgYmxvY2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIGJsb2NrLmNsYXNzTmFtZSA9IFwiYmxvY2tcIjtcclxuICAgICAgICBibG9jay5zdHlsZS53aWR0aCA9IHRoaXMud2lkdGggKyBcInB4XCI7XHJcbiAgICAgICAgYmxvY2suc3R5bGUuaGVpZ2h0ID0gdGhpcy53aWR0aCArIFwicHhcIjtcclxuICAgICAgICBibG9jay5zdHlsZS5saW5lSGVpZ2h0ID0gdGhpcy53aWR0aCArIFwicHhcIjtcclxuICAgICAgICBsZXQgYjogQmxvY2s7XHJcbiAgICAgICAgYiA9IG5ldyBCbG9jayhibG9jayxmYWxzZSxcIlwiKTtcclxuICAgICAgICBibG9jay5vbm1vdXNldXAgPSAoZSk9PntcclxuICAgICAgICAgIGlmIChlLmJ1dHRvbiA9PSAwKSB7IC8vIOm8oOagh+W3pumUruaMieS4i1xyXG4gICAgICAgICAgICBiLnR1cm4oKTtcclxuICAgICAgICAgICAgaWYgKGIuZ2V0Qm9tYigpKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy50dXJuT3RoZXJCb21iKCk7XHJcbiAgICAgICAgICAgICAgYWxlcnQoXCJHYW1lIE92ZXIhISFcIik7XHJcbiAgICAgICAgICAgICAgLy8gd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGUuYnV0dG9uID09IDIpIHsgLy/pvKDmoIflj7PplK7mjInkuItcclxuICAgICAgICAgICAgaWYgKGIuZ2V0Q29udGVudCgpID09IFwiMVwiKSB7XHJcbiAgICAgICAgICAgICAgYi5zZXRDb250ZW50KFwiXCIpO1xyXG4gICAgICAgICAgICAgIHRoaXMucmVzdEJvbWIgKys7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgYi5zZXRDb250ZW50KFwiMVwiKTtcclxuICAgICAgICAgICAgICB0aGlzLnJlc3RCb21iIC0tO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2JvbWInKVswXS5pbm5lckhUTUwgPSB0aGlzLnJlc3RCb21iICtcIlwiO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5ibG9ja0FycmF5LnB1c2goYik7XHJcbiAgICAgICAgdGhpcy5hcmVhLmFwcGVuZENoaWxkKGJsb2NrKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgZGl2LmlubmVySFRNTCA9IFwi5Ymp5L2Z6Zu35pWw77yaPGxhYmVsIGNsYXNzPSdib21iJz5cIisgdGhpcy5yZXN0Qm9tYiArXCI8L2xhYmVsPlwiICtcclxuICAgIFwiPGJ1dHRvbiBvbmNsaWNrPSd3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7Jz7ph43mlrDlvIDlp4s8L2J1dHRvbj5cIjtcclxuXHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRpdik7XHJcbiAgICAvL+Wxj+iUvem8oOagh+WPs+mUruWumuS5ieeahOiPnOWNleWKn+iDvVxyXG4gICAgdGhpcy5hcmVhLm9uY29udGV4dG1lbnU9ZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgZXZlbnQucmV0dXJuVmFsdWU9ZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5hcmVhLm9uc2VsZWN0c3RhcnQ9ZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgZXZlbnQucmV0dXJuVmFsdWU9ZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy/liJ3lp4vljJbpm7fljLpcclxuICAgIHRoaXMucmFuZG9tQm9tYigpO1xyXG4gICAgLy/liJ3lp4vljJbmlbDlrZfnlYzpnaJcclxuICAgIHRoaXMuaW5pdE51bWJlcigpO1xyXG4gIH1cclxuXHJcbiAgdHVybk90aGVyQm9tYigpIHtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5ib21iQXJyYXkubGVuZ3RoOyBpICsrKSB7XHJcbiAgICAgIHRoaXMuYmxvY2tBcnJheVt0aGlzLmJvbWJBcnJheVtpXV0udHVybigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaW5pdE51bWJlcigpIHtcclxuICAgIHZhciBjb3VudCA9IDA7XHJcblxyXG4gIH1cclxuXHJcbiAgcmFuZG9tQm9tYigpIHtcclxuICAgIC8v55Sf5oiQ6ZqP5py66Zu35pWw57uEXHJcbiAgICB3aGlsZSh0aGlzLmJvbWJBcnJheS5sZW5ndGggPCB0aGlzLmJvbWJOdW0pIHtcclxuICAgICAgdmFyIHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqKHRoaXMuY29sTnVtKnRoaXMucmF3TnVtKSk7XHJcbiAgICAgIGlmICh0aGlzLmJvbWJBcnJheS5pbmRleE9mKHgpID09IC0xKSB7XHJcbiAgICAgICAgdGhpcy5ib21iQXJyYXkucHVzaCh4KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnNvbGUubG9nKHRoaXMuYm9tYkFycmF5KTtcclxuICAgIC8v5Yid5aeL5YyW6Zu3XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuYm9tYkFycmF5Lmxlbmd0aDsgaSArKykge1xyXG4gICAgICB0aGlzLmJsb2NrQXJyYXlbdGhpcy5ib21iQXJyYXlbaV1dLnNldEJvbWIodHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbn1cclxuXHJcbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcclxuICBuZXcgR2FtZSgpLmluaXRVSSgpO1xyXG59O1xyXG4iLCIvL2NvbW1vbiBibG9jayBjbGFzcyxkZXNjcmliZWQgdGhlIGNvbW1vbiBwcm9wZXJ0eSBvZiBibG9ja1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCbG9jayB7XHJcbiAgcHJvdGVjdGVkIGlzQm9tYjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHByb3RlY3RlZCBpc0JsYW5rOiBib29sZWFuID0gdHJ1ZTtcclxuICBwcm90ZWN0ZWQgaXNUdXJuZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBwcm90ZWN0ZWQgdHVybkNvbG9yOnN0cmluZztcclxuICBwcm90ZWN0ZWQgY29udGVudDogc3RyaW5nID0gXCJcIjtcclxuICBwcm90ZWN0ZWQgaW5uZXJDb250ZW50OiBzdHJpbmcgPSBcIlwiO1xyXG4gIHByb3RlY3RlZCBlbGVtOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgY29uc3RydWN0b3IoZWxlbTogSFRNTEVsZW1lbnQsIGlzQm9tYjogYm9vbGVhbiwgY29udGVudDogc3RyaW5nKSB7XHJcbiAgICB0aGlzLmVsZW0gPSBlbGVtO1xyXG4gICAgdGhpcy5pc0JvbWIgPSBpc0JvbWI7XHJcbiAgICB0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xyXG4gICAgdGhpcy50dXJuQ29sb3IgPSB0aGlzLmlzQm9tYj9cIiMwMDBcIjpcIiNmZmZcIjtcclxuICB9XHJcblxyXG4gIHNldENvbnRlbnQoY29udGVudDogc3RyaW5nKSB7XHJcbiAgICB0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xyXG4gICAgdGhpcy5lbGVtLmlubmVySFRNTCA9IHRoaXMuY29udGVudDtcclxuICB9XHJcblxyXG4gIHNldElubmVyQ29udGVudChpbm5lckNvbnRlbnQ6IHN0cmluZykge1xyXG4gICAgdGhpcy5pbm5lckNvbnRlbnQgPSBpbm5lckNvbnRlbnQ7XHJcbiAgICB0aGlzLmVsZW0uaW5uZXJIVE1MID0gdGhpcy5pbm5lckNvbnRlbnQ7XHJcbiAgfVxyXG5cclxuICBzZXRCb21iKGlzQm9tYjogYm9vbGVhbikge1xyXG4gICAgdGhpcy5pc0JvbWIgPSBpc0JvbWI7XHJcbiAgICB0aGlzLnR1cm5Db2xvciA9IHRoaXMuaXNCb21iP1wiIzAwMFwiOlwiI2ZmZlwiO1xyXG4gIH1cclxuXHJcbiAgZ2V0Qm9tYigpOiBib29sZWFue1xyXG4gICAgcmV0dXJuIHRoaXMuaXNCb21iO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q29udGVudCgpIHtcclxuICAgIHJldHVybiB0aGlzLmNvbnRlbnQ7XHJcbiAgfVxyXG5cclxuICBnZXRJbm5lckNvbnRlbnQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5pbm5lckNvbnRlbnQ7XHJcbiAgfVxyXG5cclxuICB0dXJuKCkge1xyXG4gICAgdGhpcy5pc1R1cm5lZCA9IHRydWU7XHJcbiAgICB0aGlzLmVsZW0ub25tb3VzZXVwID0gbnVsbDtcclxuICAgIGlmICh0aGlzLmlzQmxhbmspIHtcclxuICAgICAgdGhpcy50dXJuQXJvdW5kKHRoaXMpO1xyXG4gICAgfSBlbHNlIGlmKHRoaXMuaXNCb21iKSB7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmVsZW0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhpcy50dXJuQ29sb3I7XHJcbiAgICAgIHRoaXMuZWxlbS5pbm5lckhUTUwgPSB0aGlzLmlubmVyQ29udGVudDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHR1cm5Bcm91bmQoYmxvY2s6IEJsb2NrKSB7XHJcbiAgICB0aGlzLmVsZW0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhpcy50dXJuQ29sb3I7XHJcbiAgICB0aGlzLmVsZW0uaW5uZXJIVE1MID0gdGhpcy5pbm5lckNvbnRlbnQ7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=
