import UI from '../ui/Ui.js';
import * as Zephyr from '../ui/components.js';

//styling blurb
const stylingText = new UI(document.createElement('p'))
  .appendChild(UI.createElement('span', 'Element\'s are typically styled using the '))
  .appendChild(new Zephyr.Code('.setStyle()', 'javascript'))
  .appendChild(UI.createElement('span', ' method.'))
  .setStyle({
    border: 'none'
  });
const stylingBox = new Zephyr.Box()
  .appendChild(UI.createElement('h1', 'Styling Elements'))
  .appendChild(stylingText)
  .setStyle({
    flexDirection: 'column',
    flex: 1,
    border: 'none'
  });

const stylingBlurb = new Zephyr.Box().appendChild(stylingBox);

export { stylingBlurb };