import UI from '../ui/Ui.js';
import * as Zephyr from '../ui/components.js';

//basic elements blurb
const button = new Zephyr.Button('Click for Toast!').setStyle('margin', '5px auto');
const select = new Zephyr.Select('Pick An Option', [
  'Option 1',
  'Option 2',
  'Option 3',
]).setStyle('margin', '5px auto')

const elementsBox = new Zephyr.Box()
  .appendChild(UI.createElement('h1', 'Basic Elements'))
  .appendChild(UI.createElement('p', `Zephyr offers built-in replacements for
  common HTML elements. Below are a few examples:`))
  .setStyle({
    flexDirection: 'column',
    flex: 1,
    border: 'none'
  })
  .appendChild(button)
  .appendChild(select);
let clickCount = 0;
const toast = new Zephyr.Toast(button, 'Toast', 'This is a toast!');
toast.onClick = () => {
  clickCount++;
  console.log('The click count is: '+clickCount);
  toast.contentText = `This has been clicked ${clickCount} times!`;
};
const elementsContainer = new Zephyr.Box().appendChild(elementsBox);

const elementsBlurb = elementsContainer;

export { elementsBlurb };