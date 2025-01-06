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
    onClick(func: (event?: Event) => void): void {
      this.addEventListener('click', func);
    }

    /** Adds an event listener triggered on mouse release */
    onMouseUp(func: (event?: Event) => void): void {
      this.addEventListener('mouseup', func);
    }

    /** Adds an event listener triggered on mouse press */
    onMouseDown(func: (event?: Event) => void): void {
      this.addEventListener('mousedown', func);
    }
  };
}

export default UIEventsMixin;