import UI from '../UI.js';

export default class Canvas extends UI {
    constructor(){
        super('canvas');
    }
    getContext(type){
        return this.html.getContext(type);
    }
}