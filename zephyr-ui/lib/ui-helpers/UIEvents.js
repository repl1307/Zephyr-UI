export default class UIEvents {
  addEventListener(event, callback){
    this.html.addEventListener(event, callback);
    return this;
  }
  onClick(func){
    this.addEventListener('click', func);
  }
  onMouseUp (func) {
    this.addEventListener('mouseup', func);
  }
  onMouseDown (func) {
    this.addEventListener('mousedown', func);
  }
};