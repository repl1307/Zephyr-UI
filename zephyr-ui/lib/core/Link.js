import UI from '../UI.js';

export default class Link extends UI {
    #_href = '';
    #_openInNewTab = false;
    
    constructor(href){
        super('a');
        this.#_href = '';
        this.#_openInNewTab = false;
        this.url = href;
        this.setText(href);
    }
    get url(){
        return this.#_href;
    }
    set url(value){
        this.html.href = value;
        this.#_href = value;
    }
    get openInNewTab(){
        return this.#_openInNewTab;
    }
    set openInNewTab(value){
        if(typeof value != 'boolean'){
            throw new Error(`[${value}] is not of type boolean. Property openInNewTab cannot be set.`);
        }
        this.#_openInNewTab = value;
        this.html.target = value? '_blank' : '';
    }
}