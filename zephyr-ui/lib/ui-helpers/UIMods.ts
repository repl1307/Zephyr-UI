/*!
 * zephyr-ui v1.1.3
 * (c) 2025 Zacharia Haggy (repl1307)
 * Released under the MIT License
 */
import { BaseUI } from "../UI";

type Constructor<T = {}> = new (...args: any[]) => T;

function UIModsMixin<TBase extends Constructor<BaseUI>>(Base: TBase) {
  return class extends Base {
    /** Append a child UI element, or a list of child UI elements */
    appendChild(uiElement: BaseUI | HTMLElement | (BaseUI | HTMLElement)[]) {
      return this.append(uiElement);
    }

    /**  Append a child UI element, or a list of child UI elements */
    append(uiElement: BaseUI | HTMLElement | (BaseUI | HTMLElement)[]) {
      if (arguments.length > 1) {
        throw new Error("append does not support multiple arguments.");
      }
      const handleAppend = (elem: BaseUI | HTMLElement) => {
        if (elem instanceof HTMLElement) {
          const ui = new BaseUI(elem);
          this.html.appendChild(ui.html);
          this.children.push(ui);
          return this;
        }
        this.children.push(elem);
        this.html.appendChild(elem.html);
      };
  
      if (Array.isArray(uiElement)) {
        for (const elem of uiElement) {
          handleAppend(elem);
        }
      } else {
        handleAppend(uiElement);
      }
  
      return this;
    }

    /** Insert a UI element before another one */
    insertBefore(uiElement: BaseUI|HTMLElement, beforeChild: BaseUI|HTMLElement) {
      const before = beforeChild instanceof HTMLElement ? beforeChild : beforeChild.html;
      const newElem = uiElement instanceof HTMLElement ? uiElement : uiElement.html;
      this.html.insertBefore(newElem, before);
      if (!(uiElement instanceof HTMLElement)) {
        this.children.push(uiElement);
      }
      return this;
    }

    /** Given either the index or the child itself, remove it */
    removeChild(child: number|BaseUI) {
      if (typeof child === "number") {
        child = this.children[child] as BaseUI;
      }
      this.children.splice(this.children.indexOf(child), 1);
      this.html.removeChild(child.html);
      return child;
    }

    /** Set the text content of the UI element, clearing any previously set text and HTML */
    setText(text : string): this {
      this.html.textContent = text;
      return this;
    }
      
    /** Adds to the text content of the UI element, preserving previously set text */
    addText(text: string) {
      this.html.textContent += text;
      return this;
    }
    /** Gets the text content of the UI element */
    getText(){
      return this.html.textContent;
    }

    /** Sets inner HTML content to the provided HTML string */
    setInnerHtml(html: string) {
      const doc = BaseUI.parser.parseFromString(html, "text/html");
      while (this.html.firstChild) {
        this.html.removeChild(this.html.firstChild);
      }
      this.append(doc.body);
      return this;
    }
    
    /** Adds to the inner HTML of the UI element, preserving previously set inner HTML */
    addInnerHtml(html: string) {
      const doc = BaseUI.parser.parseFromString(html, "text/html");
      this.append(doc.body);
      return this;
    }

    /**
     * Modifies the CSS of a UI element. Two possible ways to use:
     *  -  setStyle("property name", "value")  
     *  -  setStyle({ propertyName: "value" })
    */
    setStyle(...args: [string, string|number] | [Record<string, string|number>]) {
      if (args.length === 2) {
        const [property, value] = args;
        this.html.style[property] = value;
      } else {
        const styles = args[0];
        for (const [property, value] of Object.entries(styles)) {
          this.html.style[property] = value;
        }
      }
      return this;
    }

    /** Modifies an HTML attribute of the UI element */
    setAttribute(attribute: string, value: string) {
      this.html.setAttribute(attribute, value);
      return this;
    }

    /** Gets an HTML attribute of the UI element */
    getAttribute(attribute: string) {
      return this.html.getAttribute(attribute);
    }

    /** Gets the value attribute of the UI element's html */
    getValue(){
      const hasValueProperty = (element: HTMLElement): 
        element is
        | HTMLInputElement | HTMLTextAreaElement
        | HTMLSelectElement | HTMLOptionElement
        | HTMLButtonElement | HTMLProgressElement
        | HTMLMeterElement | HTMLOutputElement => {
          return 'value' in element;
      };

      if(hasValueProperty(this.html))
        return this.html.value
      else
        throw Error('The value property does not exist.');
    }

    /** Executes a function on all child elements */
    modifyChildren(callback: (child: BaseUI) => void) {
      for (const child of this.children) {
        callback(child);
      }
      return this;
    }

    /** Adds CSS classes to the UI element */
    addClass(...classes: string[]) {
      this.html.classList.add(...classes);
      return this;
    }

    /** Removes CSS classes from the UI element */
    removeClass(...classes: string[]) {
      this.html.classList.remove(...classes);
      return this;
    }

    /** Toggles CSS classes for the UI element */
    toggleClass(...classes: string[]) {
      for (const c of classes) {
        this.html.classList.toggle(c);
      }
      return this;
    }

    /** Completely removes all HTML and child UI elements attached to this element */
    remove() {
      this.html.remove();
      for (const child of this.children) {
        if (child.html) {
          child.html.remove();
        } else {
          child.remove();
        }
      }
      this.children = [];
      return this;
    }

    /** Completely removes all child UI elements attached to this element */
    removeChildren() {
      for (const child of this.children) {
        if (child.html) {
          child.html.remove();
        } else {
          child.remove();
        }
      }
      this.children = [];
      return this;
    }
  };
}


export default UIModsMixin;