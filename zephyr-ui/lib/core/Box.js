import UI from '../UI.js';

export default class Box extends UI {
  constructor(html=null){
    super(html);
    this.html.style.display = 'flex';
  }
  center(){
    this.html.style.alignItems = 'center';
    this.html.style.justifyContent = 'center';
    return this;
  }
  centerVertically(){
    this.html.style.alignItems = 'center';
    return this;
  }
  centerHorizontally(){
    this.html.style.justifyContent = 'center';
    return this;
  }
  column(){
    this.html.style.flexDirection = 'column';
    return this;
  }
  row(){
    this.html.style.flexDirection = 'row';
    return this;
  }
  
}