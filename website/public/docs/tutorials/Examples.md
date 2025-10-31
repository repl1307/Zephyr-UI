# Examples

### Counter.js
The classic counter component, with a slight twist.
```javascript
import { UI, Box, Button} as Zephyr from '@repl1307/zephyr-ui';

export default class Counter extends Box {
    constructor(){
        super();
        this.addClass('counter');
        this.count = 0;

        this.header = new UI('h1').setText('Counter Component');
        this.label = new UI('p').setText('Press the button to start counting!');
        this.visuals = new UI('p').addClass('visuals');
        this.button = new Button('Count').onClick(this.increment);
        this.append([this.header, this.label, this.button, this.visuals]);
    }
    increment(){
        this.count++;
        this.label.setText(`Count: ${this.count}`);
        this.visuals.addText('◼');
        this.visuals.html.scrollTo(0, this.visuals.html.scrollHeight);
    }
}
```
**Output**
<div data-zephyr-parse="false">
<p class="codepen" data-height="300" data-default-tab="js,result" data-slug-hash="OPLdBZX" data-pen-title="Untitled" data-user="Zacharia-Haggy" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/Zacharia-Haggy/pen/OPLdBZX">
  Untitled</a> by Zacharia Haggy (<a href="https://codepen.io/Zacharia-Haggy">@Zacharia-Haggy</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
</div>
<script async src="https://public.codepenassets.com/embed/index.js"></script>