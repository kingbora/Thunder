//common block class,described the common property of block
export default class Block {
  protected isBomb: boolean = false;
  protected isBlank: boolean = true;
  protected isTurned: boolean = false;
  protected isFlag: boolean = false;
  protected turnColor:string;
  protected content: string = "";
  protected innerContent: string = "";
  protected elem: HTMLElement;
  protected x: number;
  protected y: number;
  protected raw: number;
  protected col: number;

  constructor(elem: HTMLElement, isBomb: boolean, content: string,x: number,y: number,col: number, raw: number) {
    this.elem = elem;
    this.isBomb = isBomb;
    this.content = content;
    this.turnColor = this.isBomb?"#000":"#fff";
    this.x = x;
    this.y = y;
    this.raw = raw;
    this.col = col;
  }

  setFlag(flag: boolean) {
    this.isFlag = flag;
  }

  getFlag() {
    return this.isFlag;
  }

  setBlank(flag: boolean) {
    this.isBlank = flag;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  getElement() {
    return this.elem;
  }

  getBlank() {
    return this.isBlank;
  }

  setTurn(flag: boolean) {
    this.isTurned = flag;
  }

  setContent(content: string) {
    this.content = content;
    this.elem.innerHTML = this.content;
  }

  setInnerContent(innerContent: string) {
    this.innerContent = innerContent;
    if (this.isTurned) {
      this.elem.innerHTML = this.innerContent;
    }
  }

  setBomb(isBomb: boolean) {
    this.isBomb = isBomb;
    this.turnColor = this.isBomb?"#000":"#fff";
  }

  getTurn(): boolean {
    return this.isTurned;
  }

  getBomb(): boolean{
    return this.isBomb;
  }

  getContent() {
    return this.content;
  }

  getInnerContent() {
    return this.innerContent;
  }



}
