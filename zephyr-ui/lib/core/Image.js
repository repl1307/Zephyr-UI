import UI from "../UI.js";

export default class Image extends UI {
    constructor(url){
        super('img');
        this.html.src = url;
        
    }
}