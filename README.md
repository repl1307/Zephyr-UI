# Introduction
Zephyr UI is a framework-agnostic UI library, designed to simplify working with vanilla JS while retaining its performance and flexibility. Zephyr was created with intent of providing 
a lightweight alternative to the most popular client-side rendering frameworks, such as React or Vue. 

Being able to work with vanilla JS makes it much easier understand how the frameworks built on it are designed, and why they are structured the way they are. However, many developers skip learning vanilla JS web development, and jump straight into React. Zephyr aims to shorten the gap between the two, allowing one to learn the fundamentals of vanilla web development without needing to learn the boilerplate.

## Comparision
In order to better understand the merits of Zephyr, let's compare creating a FruitList component in vanilla JS, React, and Zephyr. This component will display a list of fruits, and have a button that adds a random fruit when pressed.

**Vanilla JS:**
```javascript
class FruitsList {
  constructor(fruitNames) {
    this.fruits = [];
    this.container = document.createElement('div');
    this.ul = document.createElement('ul');

    // button 
    this.button = document.createElement('button');
    this.button.textContent = "Add Random Fruit!";
    this.button.addEventListener('click', e => {
      const fruits = ["Watermelon", "Orange", "Strawberry", "Apple", "Cherry", "Mango", "Grape"];
      const index = Math.floor(Math.random() * fruits.length);
      this.addFruit(fruits[index]);
    });

    //appends
    document.body.appendChild(this.container);
    this.container.appendChild(this.button);
    this.container.appendChild(this.ul);
    
    for(const name of fruitNames)
        this.addFruit(name);
  }

  // Function to add new fruit
  addFruit(fruitName) {
      const li = document.createElement('li');
      li.textContent = fruitName;
      this.ul.appendChild(li);
      this.fruits.push(fruitName);
  }
}

const fruits = new FruitsList(["Apple", "Banana", "Cherry"]);
```
**Output**
<div data-zephyr-parse=false>
<p class="codepen" data-height="300" data-default-tab="js,result" data-slug-hash="mybaVGN" data-pen-title="Vanilla JS Fruits List" data-user="Zacharia-Haggy" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/Zacharia-Haggy/pen/mybaVGN">
  Vanilla JS Fruits List</a> by Zacharia Haggy (<a href="https://codepen.io/Zacharia-Haggy">@Zacharia-Haggy</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
</div>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

- **Manual DOM Manipulation:** All DOM manipulation has to be handled by the developer, quickly getting messy and complex in larger projects.
- **No Encapsulation:** All logic, styling, and event management needs to be handled manually. With vanilla JS, reuseable components must be built entirely from scratch.

**React:**
```jsx
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const FruitsList = ({ initialFruitNames }) => {
  const [fruits, setFruits] = useState(initialFruitNames);

  // Function to add a new fruit
  const addRandomFruit = () => {
    const randomFruits = ["Watermelon", "Orange", "Strawberry", "Apple", "Cherry", "Mango", "Grape"];
    const index = Math.floor(Math.random() * randomFruits.length);
    setFruits([...fruits, randomFruits[index]]);
  };

  return (
    <div>
      <button onClick={addRandomFruit}>Add Random Fruit!</button>
      <ul>
        {fruits.map((fruit, index) => (
          <li key={index}>{fruit}</li>
        ))}
      </ul>
    </div>
  );
};

// Rendering the component using ReactDOM
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<FruitsList initialFruitNames={["Apple", "Banana", "Cherry"]} />);
```
**Output**
<div data-zephyr-parse=false>
<p class="codepen" data-height="300" data-default-tab="js,result" data-slug-hash="yyBGPwy" data-pen-title="React at CodePen" data-user="Zacharia-Haggy" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/Zacharia-Haggy/pen/yyBGPwy">
  React at CodePen</a> by Zacharia Haggy (<a href="https://codepen.io/Zacharia-Haggy">@Zacharia-Haggy</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
</div>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

**Zephyr UI:**
```javascript
import { UI } from 'zephyr-ui';

export default class FruitsList extends UI {
	constructor(fruitNames){
		super('ul');
		this.fruits = [];
		for(const fruitName of fruitNames)
			this.addFruit(fruitName);
	}
	addFruit(fruitName){
		this.append(new UI('li').setText(fruitName));
		this.fruits.push(fruitName);
	}
}

// or this way works too!
import { List, ListItem } from 'zephyr-ui';

export default class FruitsList extends List {
	constructor(fruitNames){
		super(false); // List takes a Boolean parameter, isOrdered
		this.fruits = [];
		for(const fruitName of fruitNames)
			this.addFruit(fruitName);
	}
	addFruit(fruitName){
		this.append(new ListItem.setText(fruitName));
		this.fruits.push(fruitName);
	}
}

// using FruitsList
const fruits = new FruitsList(['Apple', 'Banana', 'Cherry']);
```