export default class UIMods {
  // legacy support function for append
  appendChild(uiElement){
    return this.append(uiElement);
  }
  //append child to ui element
  append(uiElement) {
    //handle appending a single param
    const handleAppend = elem => {
      if (elem instanceof HTMLElement) {
        const ui = new UI(elem);
        ui.setTheme('');
        this.html.appendChild(ui.html);
        this.children.push(ui);
        return this;
      }
      this.children.push(elem);
      this.html.appendChild(elem.html);
    };
    //check if array of elems is being added
    if(Array.isArray(uiElement)){
      for(const elem of uiElement)
        handleAppend(elem);
    } else {
      handleAppend(uiElement);
    }
    
    return this;
  }
  //insert child before another child
  insertBefore(uiElement, beforeChild) {
    const before = beforeChild instanceof HTMLElement ?
      beforeChild : beforeChild.html;
    const newElem = uiElement instanceof HTMLElement ?
      uiElement : uiElement.html;
    this.html.insertBefore(newElem, before);
    if (!(uiElement instanceof HTMLElement)) {
      this.children.push(uiElement);
    }
    return this;
  }
  //child is the actual ui element or index of the child
  removeChild(child) {
    if (typeof child == 'number')
      child = this.children[child];
    this.children.splice(this.children.indexOf(child), 1);
    this.html.removeChild(child.html);
    return child;
  }

  //set text content of ui element
  setText(text) {
    this.html.textContent = text;
    return this;
  }
  //add to text content of ui element
  addText(text) {
    this.html.textContent += text;
    return this;
  }
  //set inner html of ui element
  setInnerHtml(html) {
    const doc = UI.parser.parseFromString(html, 'text/html');
    for (const child of this.html.children) {
      child.remove();
    }
    this.append(doc.body);
    return this;
  }
  //add to inner html of ui element
  addInnerHtml(html) {
    const doc = UI.parser.parseFromString(html, 'text/html');
    this.append(doc.body);
    return this;
  }
  //set css property of ui element
  setStyle(...args) {
    if (args.length == 2) {
      const property = args[0];
      const value = args[1];
      this.html.style[property] = value;
    }
    else {
      for (const [property, value] of Object.entries(args[0])) {
        this.html.style[property] = value;
      }
    }
    return this;
  }

  //set html attribute of ui element
  setAttribute(attribute, value) {
    this.html[attribute] = value;
    return this;
  }

  //get html attribute of ui element
  getAttribute(attribute) {
    return this.html[attribute];
  }

  //modify children
  modifyChildren(callback = child => { console.log(child); }) {
    for (const child of this.children) {
      callback(child);
    }
    return this;
  }

  //add class
  addClass(...args) {
    for (const c of args)
      this.html.classList.add(c);
    return this;
  }
  //remove class
  removeClass(...args) {
    for (const c of args)
      this.html.classList.remove(c);
    return this;
  }
  //toggle class(es)
  toggleClass(...args) {
    for (const c of args)
      this.html.classList.toggle(c);
    return this;
  }

  //remove element
  remove() {
    this.html.remove();
    for (const child of this.children) {
      if (child.html)
        child.html.remove();
      else
        child.remove();
    }
    return this;
  }
}