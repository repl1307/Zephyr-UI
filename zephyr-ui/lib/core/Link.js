import UI from '../UI';

/**
 * A Link component that extends the UI class to represent a clickable anchor (`<a>`) element.
 * It allows setting the `href` attribute (URL) and optionally opens the link in a new tab.
 * 
 * @class Link
 * @extends UI
 */
export default class Link extends UI {
    #_href = '';
    #_openInNewTab = false;
    
    /**
     * Creates an instance of the Link component.
     * Initializes the link with the provided URL and sets the text content to the URL.
     *
     * @param {string} href - The URL to be used for the `href` attribute of the link.
     */
    constructor(href){
        super('a');
        this.#_href = '';
        this.#_openInNewTab = false;
        this.url = href;
        this.setText(href);
    }

    /**
     * Gets the current URL of the link.
     * 
     * @returns {string} The URL set for the link.
     */
    get url(){
        return this.#_href;
    }

    /**
     * Sets the URL for the link and updates the `href` attribute of the element.
     * 
     * @param {string} value - The URL to set for the `href` attribute.
     */
    set url(value){
        this.html.href = value;
        this.#_href = value;
    }

    /**
     * Gets whether the link opens in a new tab.
     * 
     * @returns {boolean} `true` if the link is set to open in a new tab, otherwise `false`.
     */
    get openInNewTab(){
        return this.#_openInNewTab;
    }

    /**
     * Sets whether the link should open in a new tab. This sets the `target` attribute to `_blank` if `true`.
     * Throws an error if the provided value is not a boolean.
     * 
     * @param {boolean} value - `true` to open the link in a new tab, `false` to open in the same tab.
     * @throws {Error} If the value is not a boolean.
     */
    set openInNewTab(value){
        if(typeof value != 'boolean'){
            throw new Error(`[${value}] is not of type boolean. Property openInNewTab cannot be set.`);
        }
        this.#_openInNewTab = value;
        this.html.target = value? '_blank' : '';
    }
}