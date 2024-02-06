import UI from '../Ui.js';

export default class Box extends UI {
  constructor(html=null){
    super(html);
    this.html.style.display = 'flex';
  }
  center(){
    this.html.style.alignItems = 'center';
    this.html.style.justifyContent = 'center';
  }
  centerVertically(){
    this.html.style.alignItems = 'center';
  }
  centerHorizontally(){
    this.html.style.justifyContent = 'center';
  }
  
}