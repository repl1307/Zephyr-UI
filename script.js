import {Accordian, AccordianContent, AccordianLabel} from './ui/components/Accordian.js';
import Box from './ui/components/Box.js';
import UI from './ui/Ui.js';
import Button from './ui/components/Button.js';
import Select from './ui/components/Select.js';
import Toast from './ui/components/Toast.js';

const root = new Box(document.body).setStyle('border', 'none');
const main = new Box().setStyle({
  display: 'flex',
  backgroundColor: 'rgba(0,0,0,0)',
  border: 'none',
  flexDirection: 'column'
});
root.appendChild(main);

//intro blurb
const introBox = new Box()
  .appendChild(UI.createElement('h1', 'Zephyr UI'))
  .appendChild(UI.createElement('p', `
  Zephyr is a minimalistic UI Library.It is meant to simplify 
  working with DOM, and provides multiple premade components. 
  Zephyr is unreliant on any frameworks, making it both efficient
  and easy to integrate into any application. Zephyr's goal is to
   keep things as close to vanilla Javascript as possible.`))
  .setStyle('flexDirection', 'column')
  .setStyle('flex', 1);

//accordian blurb
const accordian = new Accordian();
const labelTexts = [
  'Zephyr Accordian',
  'Zephyr Accordian',
  'Zephyr Accordian'
];
const contentTexts = [
  'This component is built in with Zephyr, and can easily be implemented into a project.',
  'This component is built in with Zephyr, and can easily be implemented into a project.',
  'This component is built in with Zephyr, and can easily be implemented into a project.'
];
for(let i = 0; i < 3; i++){
  const label = new AccordianLabel().setText(labelTexts[i]);
  const content = new AccordianContent();

  content.setInnerHtml('<p>'+contentTexts[i]+'</p>');
  accordian.addContent(label, content);
}
accordian.setStyle('flex', '0.5').setLimit(1);
const introContainer = new Box().setStyle('display', 'flex');
introContainer.appendChild(introBox).appendChild(accordian);

//basic elements blurb
const button = new Button('This is a button').setStyle('margin', '5px auto');
const select = new Select('Pick An Option', [
  'Option 1',
  'Option 2',
  'Option 3',
]).setStyle('margin', '5px auto')

const elementsBox = new Box()
  .appendChild(UI.createElement('h1', 'Basic Elements'))
  .appendChild(UI.createElement('p', `Zephyr offers built-in replacements for
  common HTML elements. Below are a few examples:`))
  .setStyle('flexDirection', 'column')
  .setStyle('flex', 1)
  .appendChild(button)
  .appendChild(select);
const toast = new Toast(button);
const elementsContainer = new Box().appendChild(elementsBox);

//styling blurb
const stylingBox = new Box()
  .appendChild(UI.createElement('h1', 'Styling Elements'))
  .appendChild(UI.createElement('p', `Zephyr utilizes themes 
  created through CSS classes for styling. `))
  .setStyle('flexDirection', 'column')
  .setStyle('flex', 1);

const stylingContainer = new Box().appendChild(stylingBox);

main.appendChild(introContainer);
main.appendChild(elementsContainer);
main.appendChild(stylingContainer)