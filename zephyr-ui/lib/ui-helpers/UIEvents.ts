/*!
 * zephyr-ui v1.1.3
 * (c) 2025 Zacharia Haggy (repl1307)
 * Released under the MIT License
 */
import { BaseUI } from "../UI";

type Constructor<T = {}> = new (...args: any[]) => T;

/** A mixin for all UI event listener functions. */
function UIEventsMixin<TBase extends Constructor<BaseUI>>(Base: TBase) {
  return class extends Base {
    /** Add a specific event listener, same as vanilla js method */
    addEventListener(event:string, callback: (event?: Event) => void) {
      this.html.addEventListener(event, callback);
      return this;
    }

    /** Adds an event listener triggered on click. */
    onClick(func: (event?: Event) => void): this {
      this.addEventListener('click', func);
      return this;
    }

    /** Adds an event listener triggered on mouse release */
    onMouseUp(func: (event?: Event) => void): this {
      this.addEventListener('mouseup', func);
      return this;
    }

    /** Adds an event listener triggered on mouse press */
    onMouseDown(func: (event?: Event) => void): this {
      this.addEventListener('mousedown', func);
      return this;
    }
  };
}

export default UIEventsMixin;