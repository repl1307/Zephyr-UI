import UI from "../UI";


/**
 * An Image component
 * @class Image
 * @memberof core
 */
class Image extends UI {
    /**
     * Create an Image instance
     * @param {string} url - The image URL, can also be a filepath
     */
    constructor(url){
        super('img');
        this.html.src = url;
    }
}

export default Image;