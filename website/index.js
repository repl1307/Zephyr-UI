import * as Zephyr from '@repl1307/zephyr-ui';
import { Router } from '@repl1307/zephyr-ui/utilities';
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
        const navbar = new NavigationBar(router);
        navbar.addTab('Home', '/home');
        navbar.addTab('Learn', '#', [
            new DropdownContent('Getting Started', router.basePath+'/documentation/tutorials/Introduction'),
            new DropdownContent('Components', router.basePath+'/documentation/Box'),
            new DropdownContent('Examples', router.basePath+'/documentation/tutorials/Examples'),
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

    const introBox = new Zephyr.UI().addClass('home-page');

    // cool animation maybe?
    for(let i = 0; i < 20; i++){
        const sizes = ['orbit-small', 'orbit-medium', 'orbit-medium','orbit-large'];
        const randIndex = Math.floor(Math.random() * sizes.length);
        const orbit = new Zephyr.UI()
        .addClass('orbit')
        .addClass(sizes[randIndex])
        .setStyle('animation-delay', -(i*0.5)+'s')
        .setStyle('animation-duration', (Math.floor(Math.random()*10)+25)+'s')
        .setStyle('animation-direction', Math.random() > 0.7? 'reverse': 'normal')
        introBox.append(orbit);
    }

    introBox
        .append(new Zephyr.UI('h1').setText('Zephyr UI'))
        .append(new Zephyr.UI('p').setText('A minimal approach to client side rendering'));
    
    const getStartedButton = new Zephyr.Button('Get Started')
        .addClass("get-started-button")
        .onClick(e => router.setRoute('/documentation/tutorials/Introduction'));
    introBox.append(getStartedButton);
    

    page.content.append(introBox);


    return [ page.navbar, page.content ];
}

//base doc page
const testLinks = [
    { text: 'Introduction', href: '/documentation/tutorials/Introduction' },
    { text: 'Root', href: '/documentation/Root' },
    { text: 'Box', href: '/documentation/Box' },
    { text: 'Button', href: '/documentation/Button' },
    { text: 'Canvas', href: '/documentation/Canvas' },
    { text: 'List', href: '/documentation/List' },
    { text: 'Examples', href: '/documentation/tutorials/Examples' },
];

class DocSideBar extends SideBar {
    constructor(router){
        super();
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

    const content = [];
    for(const link of testLinks)
        content.push(new DropdownContent(link.text, router.basePath+link.href))
    page.navbar.addTab('Documentation', '#', content);

    function onResize(){
        if(innerWidth < innerHeight){
            page.navbar.tabs.at(-1).setStyle('display', 'flex');
            sideBar.setStyle('display', 'none')
            page.content.column();
        } else {
            page.navbar.tabs.at(-1).setStyle('display', 'none');
            sideBar.setStyle('display', 'flex')
            page.content.row();
        }
    }

    window.addEventListener('resize', onResize)
    onResize();

    //appends
    page.content.append(sideBar);
    page.content.append(doc.container);

    return [ page.navbar, page.content ];
}

router.createRoute('/home', HomePage);
router.createRoute('/documentation/:doc', Docs);
router.createRoute('/documentation/tutorials/:doc', Docs);
router.autoRoute();