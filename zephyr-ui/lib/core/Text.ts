import UI from "../UI";

/** A text component */
export default class Text extends UI {
    /** @param text - The default string to be displayed */
    constructor(text:string=''){
        super('p');
        this.setText(text);
    }
}