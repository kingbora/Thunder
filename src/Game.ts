import Block from "./block";

class Game {
  colNum: number = 10;
  rawNum: number = 10;
  width: number = 30;
  bombNum: number = 10;
  area: HTMLElement;
  bombArray: {x:number,y:number}[] = [];
  blockArray: Block[][] = [[],[],[],[],[],[],[],[],[],[],[],[],[]];
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
        b = new Block(block,false,"",i,j,this.colNum,this.rawNum);
        block.onmouseup = (e)=>{
          if (e.button == 0) { // 鼠标左键按下
            if (!b.getFlag()) {
              this.turn(b);
              if (b.getBomb()) {
                this.turnOtherBomb();
                alert("Game Over!!!");
                // window.location.reload();
              }
            }
          } else if (e.button == 2) { //鼠标右键按下
            if (b.getContent() == "1") {
              b.setContent("");
              b.setFlag(false);
              this.restBomb ++;
            } else {
              b.setContent("1");
              b.setFlag(true);
              this.restBomb --;
            }
            document.getElementsByClassName('bomb')[0].innerHTML = this.restBomb +"";
          }
        };
        this.blockArray[i][j] = b;
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
      this.turn(this.blockArray[this.bombArray[i].x][this.bombArray[i].y]);
      this.blockArray[this.bombArray[i].x][this.bombArray[i].y].getElement().style.backgroundColor = "#000";
    }
  }

  turn(block: Block) {
    block.setTurn(true);
    block.getElement().onmouseup = null;
    if (block.getBlank()) {
      this.turnAround(block);
    } else if(block.getBomb()) {
      block.getElement().style.backgroundColor = "#000";
    } else {
      block.getElement().style.backgroundColor = "#fff";
      block.getElement().innerHTML = block.getInnerContent();
    }
  }

  isNull(Bomb: Block):void {
    var i:number = Bomb.getX(), j:number = Bomb.getY();

    for (var x = i - 1; x < i + 2; x++) {
      for (var y = j - 1; y < j + 2; y++) {
        if ( ( (x != i) || (y != j)) && (x >= 0) && (y >= 0)
            && x < this.rawNum && y < this.colNum) {
          if (this.blockArray[x][y].getBomb() == false
              && this.blockArray[x][y].getTurn() == false) {
            this.turn(this.blockArray[x][y]);
          }
        }
      }
    }
  }

  turnAround(block: Block) {
    block.getElement().style.backgroundColor = "#fff";
    block.getElement().innerHTML = block.getInnerContent();
    this.isNull(block);
  }

  initNumber() {
    for( var i = 0; i < this.colNum; i ++) {
      for (var j = 0; j < this.rawNum; j ++) {
        //当方块本身无雷的情况下，统计周围雷数
        var count: number = 0;
        if (!this.blockArray[i][j].getBomb()) {
          for (var x = i - 1; x < i + 2; x ++) {
            for (var y = j - 1; y < j + 2; y ++) {
              if ( (x >= 0) && (y >= 0) && (x < this.colNum) && (y < this.rawNum) ) {
                if (this.blockArray[x][y].getBomb()) {
                  count ++;
                }
              }
            }
          }
        }

        if (count == 0) {
          this.blockArray[i][j].setInnerContent("");
          this.blockArray[i][j].setBlank(true);
        } else {
          this.blockArray[i][j].setInnerContent(count + "");
          this.blockArray[i][j].setBlank(false);
        }

      }
    }

  }

  randomBomb() {
    //生成随机雷数组
    while(this.bombArray.length < this.bombNum) {
      var x = Math.floor(Math.random()*this.colNum);
      var y = Math.floor(Math.random()*this.rawNum);
      if (this.bombArray.indexOf({'x':x,'y':y}) == -1) {
        this.bombArray.push({'x':x,'y':y});
      }
    }

    console.log(this.bombArray);
    //初始化雷
    for (var i = 0; i < this.bombArray.length; i ++) {
      this.blockArray[this.bombArray[i].x][this.bombArray[i].y].setBomb(true);
    }

  }

}

window.onload = function() {
  new Game().initUI();
};
