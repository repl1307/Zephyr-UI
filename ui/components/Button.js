import UI from '../Ui.js';

export default class Button extends UI {
  constructor(text){
    super(document.createElement('button'));
    this.setInnerHtml(`<span style="z-index: 1;">${text}</span>`);
    this.setStyle('width', 'fit-content');
  }
}