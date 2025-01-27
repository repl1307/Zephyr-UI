import { UI, Box, Link } from '@repl1307/zephyr-ui'
import './component.css';

// side bar
export default class SideBar extends Box {
    constructor(){
        super();
        this.addClass('side-bar');
        this.links = [];
    }
    addLink(text, href){
        const link = new Link(href).setText(text);
        this.links.push(link);
        this.append(link);
    }
}