import UI from "../UI";

export default class Root extends UI {
    static _instance: null|Root = null;
    constructor(){
        super(document.body);

        if(Root._instance){
            console.log("A Root instance already exists!!!");
            return;
        }
        Root._instance = this;

        this.setStyle({
            width: '100%',
            height: '100%',
            padding: 0,
            margin: 0
        });
        const html = document.querySelector('html');
        if(html){
            html.style.width = '100%';
            html.style.height = '100%';
        }
    }
}