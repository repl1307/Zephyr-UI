import { Themes } from './utilities/theme.js';
export default class UI {
  static elements = [];
  static parser = new DOMParser();
  static parse(htmlString){
    return UI.parser.parseFromString(htmlString, 'text/html').body;
  }
  static createElement(tag, textContent='', classes=[]){
    const element = document.createElement(tag);
    element.textContent = textContent;
    for(const className of classes)
      element.classList.add(className);
    return element;
  }
  constructor(html=null) {
    this.html = html ?? document.createElement('div');
    this.children = [];
    this.setTheme(Themes.default);
    UI.elements.push(this);
    return this;
  }
  //set theme (see theme.js)
  setTheme(theme){
    this.html.style = '';
    const nodeName = this.html.nodeName.toLowerCase();
    let themeKey;

    switch(nodeName){
      case 'button':
        themeKey = 'button';
        break;
      case 'div':
        themeKey = 'div';
        break;
      default:
        themeKey = 'default';
        break;
    }
    //get uppercase indexes in string
    const getUpperCaseIndexes = str => {
      const indexes = [];
      for(const char of str){
        if(char != char.toLowerCase())
          indexes.push(str.indexOf(char));
      }
      return indexes;
    };

    //converts camelCase to kebab-case
    const convertToCssProperty = str => {
      let propertyName = str;
      if(propertyName.toLowerCase() != propertyName){
        const indexes = getUpperCaseIndexes(propertyName);
        for(const index of indexes){
          propertyName = propertyName.slice(0, index)+'-'+propertyName[index].toLowerCase() + propertyName.slice(index + 1);
        }
      }
      return propertyName;
    };

    //apply default theme
    for(const c of theme.default.classes){
      this.html.classList.add(c);
    }
    for(const [key, val] of Object.entries(theme.default.style)){
      const cssProperty = convertToCssProperty(key);
      this.html.style[cssProperty] = val;
    }
    
    //apply element's respective theme
    for(const c of theme[themeKey].classes){
      this.html.classList.add(c);
    }

    for(const [key, val] of Object.entries(theme[themeKey].style)){
      const cssProperty = convertToCssProperty(key);
      this.html.style[cssProperty] = val;
    }
    return this;
  }

  //append child to ui element
  appendChild(uiElement){
    if(uiElement instanceof HTMLElement){
      this.html.appendChild(uiElement);
      return this;
    }
    this.children.push(uiElement);
    this.html.appendChild(uiElement.html);
    return this;
  }
  
  //child is the actual ui element or index of the child
  removeChild(child){
    if(typeof child == 'number')
      child = this.children[child];

    this.children.splice(this.indexOf(child), 1);
    child.html.remove();
    return this;
  }

  //set text content of ui element
  setText(text){
    this.html.textContent = text;
    return this;
  }
  //add to text content of ui element
  addText(text){
    this.html.textContent += text;
    return this;
  }
  //set inner html of ui element
  setInnerHtml(html){
    const doc = UI.parser.parseFromString(html, 'text/html');
    for(const child of this.html.children){
      child.remove();
    }
    this.appendChild(doc.body);
    return this;
  }
  //add to inner html of ui element
  addInnerHtml(html){
    const doc = UI.parser.parseFromString(html, 'text/html');
    this.appendChild(doc.body);
    return this;
  }
  //set css property of ui element
  setStyle(...args){
    if(args.length == 2){
      const property = args[0];
      const value = args[1];
      this.html.style[property] = value;
    }
    else {
      for(const [property, value] of Object.entries(args[0])){
        this.html.style[property] = value;
      }
    }
    return this;
  }

  //set html attribute of ui element
  setAttribute(attribute, value){
    this.html[attribute] = value;
    return this;
  }

  //modify children
  modifyChildren(callback = child => { console.log(child); }){
    for(const child of this.children){
      callback(child);
    }
    return this;
  }

  //add event listener
  addEventListener(event, callback){
    this.html.addEventListener(event, callback);
    return this;
  }

  //add class
  addClass(...args){
    for(const c of args)
      this.html.classList.add(c);
    return this;
  }
  //remove class
  removeClass(...args){
    for(const c of args)
      this.html.classList.remove(c);
    return this;
  }
  //toggle class(es)
  toggleClass(...args){
    for(const c of args)
      this.html.classList.toggle(c);
    return this;
  }
}