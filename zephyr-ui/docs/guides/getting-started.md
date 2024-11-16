# Getting Started

## What is Zephyr UI?
Zephyr UI is a lightweight UI framework designed to keep things as close to vanilla JS as possible, while simplifying the development process. Zephyr UI follows the OOP paradigm, contrary to React.js and other popular frameworks.


## Components
Zephyr UI provides JS components for every HTML element. All components extend the base ```UI``` class. 

## Custom Components
In order to create custom components, simply extend existing ones, and add any desired functionality. 

## Examples
The classic counter example:
```
import * as Zephyr from "zephyr-ui";

export default class Counter extends Zephyr.Box {
    constructor(){
        super();
        this.addClass('counter');
        this.count = 0;

        this.header = new Zephyr.UI('h1')
            .setText('Counter Component');

        this.label = new Zephyr .UI('p')
            .setText('Press the button to start counting!');

        this.button = new Zephyr.Button('Count');
        this.button.addEventListener('click', e => this increment());
        this.appendChild([this.header, this.label, this.button ]);
    }
    increment(){
        this.count++;
        this.label.setText('Count: '+this.count);
    }
}
```