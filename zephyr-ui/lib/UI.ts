/*!
 * zephyr-ui v1.0.0
 * (c) 2025 Zacharia Haggy (repl1307)
 * Released under the MIT License
 */
import UIEventsMixin from './ui-helpers/UIEvents';
import UIModsMixin from './ui-helpers/UIMods';

/** The base UI component, all other UI components are subclasses of this */
class BaseUI {
  remove() { throw new Error("Method not implemented."); }
  html: HTMLElement;
  children: BaseUI[];
  parent: BaseUI|null;
  preserveOnRerender: boolean;
  
  /** A list of all existing UI elements */
  static elements: BaseUI[] = [];
  /** A DOMParser instance used to convert strings into html elements */
  static parser = new DOMParser();
  static initialized = false;

  /** Convert an html string into an html element */
  static parse(htmlString: string) {
    return BaseUI.parser.parseFromString(htmlString, 'text/html').body;
  }
  /**
   * @param {string} tag - The tag of the HTML element that should be created (Ex: 'li' )
   * @param {string} [textContent=''] - The text content of the HTML element
   * @returns {HTMLElement} - An HTML element matching the provided tag
   */
  static createElement(tag: string, textContent = '') {
    const element = document.createElement(tag);
    element.textContent = textContent;
    return element;
  }

  /**
  * @param {HTMLElement|string} html - The html element that the flexbox component should be based from, if null a div is used.
  */
  constructor(html:string|HTMLElement|null = 'div') {
    if(typeof html == 'string')
      this.html = document.createElement(html);
    else
      this.html = html ?? document.createElement('div');

    /** A list of all child elements */
    this.children = [];
    /** Whether the UI element should persist across pages, if true, element is preserved */
    this.preserveOnRerender = false;
    /** The UI element's parent, if one exists. */
    this.parent = null;
    BaseUI.elements.push(this);
  }
}

class UI extends UIEventsMixin(UIModsMixin(BaseUI)) {
  declare children: UI[];
}

export { BaseUI };
export default UI;