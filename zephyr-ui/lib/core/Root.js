import UI from "../UI.js";

export default class Root extends UI {
    constructor(){
        super(document.body);
        this.setStyle({
            width: '100%',
            height: '100%'
        });
    }
}