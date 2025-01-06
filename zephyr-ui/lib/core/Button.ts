import UI from '../UI';

/**
 * A basic button component
 * @class Button
 * @memberof core
 */
export default class Button extends UI {
  /**
   * Creates a Button instance
   * @param {string} text - The text that should be displayed within the button
   */
  constructor(text:string){
    super(document.createElement('button'));
    this.setText(text);
    this.setStyle('width', 'fit-content');
  }
}