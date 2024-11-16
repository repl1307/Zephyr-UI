import UIEvents from './ui-helpers/UIEvents.js';
import UIMods from './ui-helpers/UIMods.js';

const mods = new UIMods();
const events = new UIEvents();

function getPrototypeMethods(object){
  const proto = Object.getPrototypeOf(object);
  const properties = Object.getOwnPropertyNames(proto).filter(prop => typeof proto[prop] == 'function' && prop != 'constructor');
  return properties;
}

//ui
export default class UI {
  static elements = [];
  static parser = new DOMParser();
  static initialized = false;

  static parse(htmlString) {
    return UI.parser.parseFromString(htmlString, 'text/html').body;
  }

  static createElement(tag, textContent = '') {
    const element = document.createElement(tag);
    element.textContent = textContent;
    return element;
  }

  constructor(html = 'div') {
    if(typeof html == 'string')
      this.html = document.createElement(html);
    else
      this.html = html ?? document.createElement('div');
    this.children = [];
    this.preserveOnRerender = false;
    // add functions from helper classes
    const extensions = [
      {
        proto: mods,
        methodNames: getPrototypeMethods(mods)
      },
      {
        proto: events,
        methodNames: getPrototypeMethods(events)
      }
    ];
    
    for(const extension of extensions){
      for (const name of extension.methodNames) {
        this[name] = extension.proto[name].bind(this);
      }
    }
    UI.elements.push(this);
  }
}