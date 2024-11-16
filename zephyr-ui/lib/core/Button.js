import UI from '../UI.js';

export default class Button extends UI {
  constructor(text){
    super(document.createElement('button'));
    this.setText(text);
    this.setStyle('width', 'fit-content');
  }
}