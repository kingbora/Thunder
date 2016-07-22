import Block from "./block";

class Game {
  colNum: number = 10;
  rawNum: number = 10;
  width: number = 30;
  bombNum: number = 5;
  area: HTMLElement;
  bombArray: number[] = [];
  blockArray: Block[] = [];
  restBomb: number = this.bombNum;

  initUI(){
    this.area = document.createElement("div");
    this.area.style.width = (this.width+2) * this.colNum + "px";
    this.area.style.height = (this.width + 2) * this.rawNum + "px";
    this.area.className = "area";
    document.body.appendChild(this.area);
    for(var i = 0; i < this.colNum; i ++) {
      for (var j = 0; j < this.rawNum; j ++) {
        var block = document.createElement("div");
        block.className = "block";
        block.style.width = this.width + "px";
        block.style.height = this.width + "px";
        block.style.lineHeight = this.width + "px";
        let b: Block;
        b = new Block(block,false,"");
        block.onmouseup = (e)=>{
          if (e.button == 0) { // 鼠标左键按下
            b.turn();
            if (b.getBomb()) {
              this.turnOtherBomb();
              alert("Game Over!!!");
              // window.location.reload();
            }
          } else if (e.button == 2) { //鼠标右键按下
            if (b.getContent() == "1") {
              b.setContent("");
              this.restBomb ++;
            } else {
              b.setContent("1");
              this.restBomb --;
            }
            document.getElementsByClassName('bomb')[0].innerHTML = this.restBomb +"";
          }
        };
        this.blockArray.push(b);
        this.area.appendChild(block);
      }
    }

    var div = document.createElement("div");
    div.innerHTML = "剩余雷数：<label class='bomb'>"+ this.restBomb +"</label>" +
    "<button onclick='window.location.reload();'>重新开始</button>";

    document.body.appendChild(div);
    //屏蔽鼠标右键定义的菜单功能
    this.area.oncontextmenu=function(event) {
      event.returnValue=false;
    }

    this.area.onselectstart=function(event) {
      event.returnValue=false;
    }

    //初始化雷区
    this.randomBomb();
    //初始化数字界面
    this.initNumber();
  }

  turnOtherBomb() {
    for (var i = 0; i < this.bombArray.length; i ++) {
      this.blockArray[this.bombArray[i]].turn();
    }
  }

  initNumber() {
    var count = 0;

  }

  randomBomb() {
    //生成随机雷数组
    while(this.bombArray.length < this.bombNum) {
      var x = Math.floor(Math.random()*(this.colNum*this.rawNum));
      if (this.bombArray.indexOf(x) == -1) {
        this.bombArray.push(x);
      }
    }

    console.log(this.bombArray);
    //初始化雷
    for (var i = 0; i < this.bombArray.length; i ++) {
      this.blockArray[this.bombArray[i]].setBomb(true);
    }

  }

}

window.onload = function() {
  new Game().initUI();
};
