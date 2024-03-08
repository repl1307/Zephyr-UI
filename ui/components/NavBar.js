import UI from '../Ui.js';
import * as Zephyr from '../components.js'

export default class NavBar extends Zephyr.Box {
  constructor(){
    super();
    this.setStyle({
      width: '100%',
      justifyContent: 'space-between',
      boxSizing: 'border-box',
      margin: 0,
      borderRight: 'none',
      borderLeft: 'none',
      borderTop: 'none',
      borderRadius: '0 0 10px 10px'
    });
    
  }
}