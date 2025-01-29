import * as Zephyr from '@repl1307/zephyr-ui';
import { Router } from '@repl1307/zephyr-ui/utilities';
import Counter from './components/Counter';
import { NavigationBar, DropdownContent } from './components/navigation-bar/component'; 
import Documentation from './components/documentation/component';
import SideBar from './components/side-bar/component';
import './styles/index.css';

const root = new Zephyr.Root();
const router = new Router(root);
router.basePath = '/Zephyr-UI';
router.defaultPath = '/home';

// base page
class Page {
    constructor(){
        const navbar = new NavigationBar();
        navbar.addTab('Community', '/community');
        navbar.addTab('Documentation', '#', [
            new DropdownContent('Getting Started', router.basePath+'/documentation/tutorials/Introduction'),
            new DropdownContent('Components', router.basePath+'/documentation/Box'),
            new DropdownContent('Migration', router.basePath+'/documentation/tutorials/Introduction'),
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

    return [ page.navbar, page.content ];
}

//base doc page
class DocSideBar extends SideBar {
    constructor(router){
        super();
        const testLinks = [
            { text: 'Introduction', href: '/documentation/tutorials/Introduction' },
            { text: 'Root', href: '/documentation/Root' },
            { text: 'Box', href: '/documentation/Box' },
            { text: 'Button', href: '/documentation/Button' },
            { text: 'Canvas', href: '/documentation/Canvas' },
            { text: 'List', href: '/documentation/List' },
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
/** @param {Router} router */
function Docs(router){
    const page = new Page();
    const doc = new Documentation(router.currentPath.replace('documentation', 'docs')+'.md');
    const sideBar = new DocSideBar(router);
    //appends
    page.content.row();
    page.content.append(sideBar);
    page.content.append(doc.container);

    return [ page.navbar, page.content ];
}

router.createRoute('/home', HomePage);
router.createRoute('/documentation/:doc', Docs);
router.createRoute('/documentation/tutorials/:doc', Docs);
router.autoRoute();