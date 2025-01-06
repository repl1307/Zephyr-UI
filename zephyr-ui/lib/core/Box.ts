import UI from '../UI';

/** 
 * A flexbox component containing some useful methods.
 * Inherits all methods and properties from {@link UI}.
 * @class
 * @extends {UI}
*/
class Box extends UI {
  /**
   * Creates an instance of the Box class.
   * @param {string|HTMLElement|null} html - If not specified the box utilizes a div element.
   */
  constructor(html=null){
    super(html);
    this.html.style.display = 'flex';
  }
  /**
   * Aligns flexbox content both vertically and horizontally
   * @returns {this}
   */
  center(){
    this.html.style.alignItems = 'center';
    this.html.style.justifyContent = 'center';
    return this;
  }
  /**
   * Aligns flexbox content vertically
   * @returns {this}
   */
  centerVertically(){
    if(this.html.style.flexDirection == 'row')
      this.html.style.alignItems = 'center';
    else
      this.html.style.justifyContent = 'center';
    return this;
  }
  /**
   * Aligns flexbox content horizontally
   * @returns {this}
   */
  centerHorizontally(){
    if(this.html.style.flexDirection == 'row')
      this.html.style.justifyContent = 'center';
    else
      this.html.style.alignItems = 'center';
    return this;
  }
  /**
   * Changes flexbox direction to column
   * @returns {this}
   */
  column(){
    this.html.style.flexDirection = 'column';
    return this;
  }
  /**
   * Changes flexbox direction to row
   * @returns {this}
   */
  row(){
    this.html.style.flexDirection = 'row';
    return this;
  }
  
}

export default Box;