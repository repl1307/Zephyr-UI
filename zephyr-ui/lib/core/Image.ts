import UI from "../UI";


/**
 * An Image component
 * @class Image
 * @memberof core
 */
class Image extends UI<HTMLImageElement> {
    /**
     * Create an Image instance
     * @param url - The image URL, can also be a filepath
     */
    constructor(url: string){
        super('img');
        this.html.src = url;
    }
}

export default Image;