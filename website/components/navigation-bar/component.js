import * as Zephyr from '@repl1307/zephyr-ui';
import './component.css';

export class NavigationBar extends Zephyr.Box {
    constructor(router){
        super();
        this.addClass('navigation-bar');
        this.logo = new Zephyr.UI('h1');
        this.tabContainer = new Zephyr.Box().addClass('tab-container');
        this.tabs = [];
        this.router = router;
        this.append([this.logo, this.tabContainer]);
          
    }
    addTab(tabName, tabLink, dropdownContent=null){
        const tab = new Zephyr.UI('a').addClass('tab').setText(tabName);
        if(tabLink != "#"){
            tab.onClick(e => {
                console.log('going to route: '+this.router.basePath + tabLink);
                this.router.setRoute(tabLink);
            });
         }
        
        if(dropdownContent && dropdownContent.length > 0){
            const dropdownContainer = new Zephyr.UI().addClass('dropdown-container');
            const dropdown = new Zephyr.UI().addClass('dropdown');
            dropdown.append(dropdownContent);
            dropdownContainer.append(dropdown);
            tab.append(dropdownContainer);
        }
        this.tabs.push(tab);
        this.tabContainer.append(tab);
        return this;
    }
}

export class DropdownContent extends Zephyr.Link {
    constructor(name, href){
        super();
        this.setText(name);
        this.url = href;
    }
}