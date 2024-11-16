import * as Zephyr from 'zephyr-ui';
import { Router } from 'zephyr-ui/utilities';
import Counter from './components/Counter';
import { NavigationBar, DropdownContent } from './components/navigation-bar/component'; 
import './components/navigation-bar/component.css';
import './styles/index.css';

const root = new Zephyr.Root();
const navbar = new NavigationBar();

navbar.addTab('Community', '/community');
navbar.addTab('Documentation', '#', [
    new DropdownContent('Getting Started', '/docs/getting-started'),
    new DropdownContent('Components', '/docs/components'),
    new DropdownContent('Migration', '/docs/migration'),
]);

navbar.logo.setText('Zephyr UI');
root.append(navbar);

const pageContent = new Zephyr.Box().addClass('page-content');
root.append(pageContent);

const introBox = new Zephyr.UI()
    .append(new Zephyr.UI('h1').setText('What is Zephyr UI?'))
    .append(new Zephyr.UI('p').setText('Zephyr UI is a library developed as an alternative to React for client side rendering.'));
pageContent.append(introBox);
pageContent.append(new Counter());
pageContent.append(new Counter());
pageContent.append(new Counter());
const link = new Zephyr.Link('https://www.amazon.com').setStyle({
    color: 'white',
    fontSize: '1.5rem',
    width: 'fit-content'
});
link.openInNewTab = true;
link.setText('This is a link to amazon.');
root.append(link);
