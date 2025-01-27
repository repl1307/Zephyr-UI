import * as Zephyr from '@repl1307/zephyr-ui';

export default class Counter extends Zephyr.Box {
    constructor(){
        super();
        this.addClass('counter');
        this.count = 0;

        this.header = new Zephyr.UI('h1')
            .setText('Counter Component');

        this.label = new Zephyr .UI('p')
            .setText('Press the button to start counting!');

        this.visuals = new Zephyr.UI('p')
            .addClass('visuals');

        this.button = new Zephyr.Button('Count');
        console.log(JSON.stringify(this.button.addEventListener));
        this.button.addEventListener('click', e => this.increment());
        this.appendChild([this.header, this.label, this.button, this.visuals]);
    }
    increment(){
        this.count++;
        this.label.setText('Count: '+this.count);
        this.visuals.addText('◼');
        this.visuals.html.scrollTo(0, this.visuals.html.scrollHeight);
    }
}