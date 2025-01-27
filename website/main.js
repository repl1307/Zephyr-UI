import * as Zephyr from '@repl1307/zephyr-ui';
import { Router } from '@repl1307/zephyr-ui/utilities';
import Counter from './components/Counter';
import { NavigationBar, DropdownContent } from './components/navigation-bar/component'; 
import Documentation from './components/documentation/component';
import SideBar from './components/side-bar/component';
import './styles/index.css';

const root = new Zephyr.Root();
const router = new Router(root);

// base page
class Page {
    constructor(){
        const navbar = new NavigationBar();
        navbar.addTab('Community', '/community');
        navbar.addTab('Documentation', '#', [
            new DropdownContent('Getting Started', '/docs/getting-started'),
            new DropdownContent('Components', '/docs/components'),
            new DropdownContent('Migration', '/docs/migration'),
        ]);
        
        navbar.logo.setText('Zephyr UI');
        const pageContent = new Zephyr.Box().addClass('page-content');

        this.navbar = navbar;
        this.content = pageContent;
    }
}

// home page
function HomePage(){
    const page = new Page();

    const introBox = new Zephyr.UI()
        .append(new Zephyr.UI('h1').setText('What is Zephyr UI?'))
        .append(new Zephyr.UI('p').setText('Zephyr UI is a library developed as an alternative to React for client side rendering.'));
    page.content.append(introBox);
    page.content.append(new Counter());
    page.content.append(new Counter());
    page.content.append(new Counter());

    const link = new Zephyr.Link('https://www.amazon.com').setStyle({
        color: 'white',
        fontSize: '1.5rem',
        width: 'fit-content'
    });

    link.openInNewTab = true;
    link.setText('This is a link to amazon.');
    return [page.navbar, page.content, link];
}

//base doc page
class DocSideBar extends SideBar {
    constructor(router){
        super();
        const testLinks = [
            { text: 'Introduction', href: '/docs/tutorials/Introduction' },
            { text: 'Root', href: '/docs/Root' },
            { text: 'Box', href: '/docs/Box' },
            { text: 'Button', href: '/docs/Button' },
            { text: 'Canvas', href: '/docs/Canvas' },
            { text: 'List', href: '/docs/List' },
        ];
        for(const link of testLinks){
            this.addLink(link.text, link.href);
            this.links.at(-1).onClick(e => {
                e.preventDefault();
                router.setRoute(link.href);
            });
        }
    }
}

function Docs(router){
    console.log(router.currentPath)
    const page = new Page();
    const doc = new Documentation(router.currentPath+ '.md');
    const sideBar = new DocSideBar(router);
    //appends
    page.content.row();
    page.content.append(sideBar);
    page.content.append(doc.container);

    return [ page.navbar, page.content ];
}

router.createRoute('/home', HomePage);
router.createRoute('/docs/:doc', Docs);
router.createRoute('/docs/tutorials/:doc', Docs);
router.autoRoute();