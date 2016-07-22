//common block class,described the common property of block
export default class Block {
  protected isBomb: boolean = false;
  protected isBlank: boolean = true;
  protected isTurned: boolean = false;
  protected turnColor:string;
  protected content: string = "";
  protected innerContent: string = "";
  protected elem: HTMLElement;

  constructor(elem: HTMLElement, isBomb: boolean, content: string) {
    this.elem = elem;
    this.isBomb = isBomb;
    this.content = content;
    this.turnColor = this.isBomb?"#000":"#fff";
  }

  setContent(content: string) {
    this.content = content;
    this.elem.innerHTML = this.content;
  }

  setInnerContent(innerContent: string) {
    this.innerContent = innerContent;
    this.elem.innerHTML = this.innerContent;
  }

  setBomb(isBomb: boolean) {
    this.isBomb = isBomb;
    this.turnColor = this.isBomb?"#000":"#fff";
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

  turn() {
    this.isTurned = true;
    this.elem.onmouseup = null;
    if (this.isBlank) {
      this.turnAround(this);
    } else if(this.isBomb) {
    } else {
      this.elem.style.backgroundColor = this.turnColor;
      this.elem.innerHTML = this.innerContent;
    }
  }

  turnAround(block: Block) {
    this.elem.style.backgroundColor = this.turnColor;
    this.elem.innerHTML = this.innerContent;
  }

}
