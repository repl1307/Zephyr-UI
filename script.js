import Box from './ui/components/Box.js';
import NavBar from './ui/components/NavBar.js';
import UI from './ui/Ui.js';

import { renderTest, renderTestLoader } from './examples/renderTest.js';
import { stylingBlurb } from './examples/stylingBlurb.js';
import { introBlurb } from './examples/introBlurb.js';
import { elementsBlurb } from './examples/elementsBlurb.js';

const root = new Box(document.body).setStyle({
  border: 'none',
  flexDirection: 'column',
  padding: 0,
  margin: 0
});
const main = new Box().setStyle({
  backgroundColor: 'rgba(0,0,0,0)',
  border: 'none',
  flexDirection: 'column',
  gap: '10px'
});
root.appendChild(main);

const navBar = new NavBar();
root.insertBefore(navBar, main);

navBar.appendChild(UI.createElement('h1', 'Zephyr'));

main.appendChild(introBlurb);
main.appendChild(elementsBlurb);
main.appendChild(stylingBlurb);
main.appendChild(renderTest);
main.appendChild(renderTestLoader);