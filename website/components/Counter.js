import { UI, Button, Text } from '@repl1307/zephyr-ui';

export default class Counter extends UI {
    count = 0;

    header = new UI('h1').setText('Counter Component');
    label = new Text('Press the button to start counting!');
    button = new Button('Count').onClick(this.increment);
    visuals = new Text().addClass('visuals');

    constructor(){
        super();
        this.addClass('counter');

        const { header, label, button, visuals } = this;
        this.append([header, label, button, visuals]);
    }
    increment(){
        this.count++;

        const { label, visuals } = this;
        label.setText(`Count: ${this.count}`);
        visuals.addText('◼');
        visuals.html.scrollTo(0, this.visuals.html.scrollHeight);
    }
}