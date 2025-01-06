import UI from '../UI';

/**
 * A canvas component.
 * @class Canvas
 * @memberof core
 */
class Canvas extends UI {
    /**
     * Creates a Canvas instance
     */
    constructor(){
        super('canvas');
    }
    /**
     * Get the context of the canvas
     * @param {string} type - See https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext
     * @returns {CanvasRenderingContext2D|WebGL2RenderingContext|WebGL2RenderingContext|ImageBitmapRenderingContext}
     */
    getContext(type){
        return this.html.getContext(type);
    }
}

export default Canvas;