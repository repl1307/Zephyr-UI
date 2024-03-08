import UI from '../ui/Ui.js';
import * as Zephyr from '../ui/components.js';

//intro blurb
const introBox = new Zephyr.Box()
  .appendChild(UI.createElement('h1', 'Zephyr UI'))
  .appendChild(UI.createElement('p', `
  Zephyr is minimalistic UI library boasting a plethora of built in components.
  <br><br>It is unreliant on any frameworks, making it both efficient
  and easy to integrate into any application.
  <br><br>Zephyr's ultimate goal is to
   keep things as close to vanilla Javascript as possible, while still simplifying
   the development process as much as possible.`))
  .setStyle({
    flexDirection: 'column',
    border: 'none',
    flex: 1
  });

//accordian blurb
const accordian = new Zephyr.Accordian();
const labelTexts = [
  'Zephyr Accordian',
  'Zephyr Accordian',
  'Zephyr Accordian',
  'Zephyr Accordian',
  'Zephyr Accordian',
  'Zephyr Accordian',
  'Scrollable Zephyr Accordian'
];
const contentTexts = [
  'This component is built in with Zephyr, and can easily be implemented into a project.',
  'This component is built in with Zephyr, and can easily be implemented into a project.',
  'This component is built in with Zephyr, and can easily be implemented into a project.',
  'This component is built in with Zephyr, and can easily be implemented into a project.',
  'This component is built in with Zephyr, and can easily be implemented into a project.',
  'This component is built in with Zephyr, and can easily be implemented into a project.This component is built in with Zephyr, and can easily be implemented into a project.This component is built in with Zephyr, and can easily be implemented into a project.This component is built in with Zephyr, and can easily be implemented into a project.This component is built in with Zephyr, and can easily be implemented into a project.This component is built in with Zephyr, and can easily be implemented into a project.This component is built in with Zephyr, and can easily be implemented into a project.'
];
for (let i = 0; i < 6; i++) {
  const label = new Zephyr.AccordianLabel().setText(labelTexts[i]);
  const content = new Zephyr.AccordianContent();

  content.setInnerHtml('<p>' + contentTexts[i] + '</p>');
  accordian.addContent(label, content);
}

accordian.setStyle({
  width: 'min-content',
  border: 'none',
  height: 'fit-content'
}).setLimit(1);

const introContainer = new Zephyr.Box()
  .setStyle({
    overflow: 'hidden'
  });
const introBlurb = introContainer;
introContainer.appendChild(introBox).appendChild(accordian);

export { introBlurb };