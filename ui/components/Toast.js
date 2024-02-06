import UI from '../Ui.js';
import Box from './Box.js';
import Button from './Button.js';

export default class Toast extends UI {
  // { UI } trigger -- the ui element that triggers a toast
  constructor(trigger){
    super();
    this.setStyle({
      position: 'fixed',
      bottom: 0,
      right: 0,
      flexDirection: 'column',
      display: 'flex',
      backgroundColor: '#384347',
      color: 'white',
      transition: 'all 0.25s',
      padding: '5px',
      margin: '5px',
      boxSizing: 'border-box',
    });
    document.body.appendChild(this.html);
    this.trigger = trigger;
    this.trigger.addEventListener('click', e => {
      this.addToast('Test', 'This is a test toast', [
        new Button("Close Toast").addEventListener('click', e => {
          const toast = this.toasts.at(-1);
          const content = toast.children[0];

          toast.setStyle('max-height', 0);
          content.setStyle('right', '-'+(content.html.clientWidth+50)+'px');
          requestAnimationFrame(() => setTimeout(() => {
            toast.html.remove();
          }, 250));
          this.toasts.pop();
        })
      ]);
    });
    this.toasts = [];
  }
  addToast(headerText, messageText, buttons){
    const toast = new Box()
      .setStyle({
        flexDirection: 'column',
        position: 'relative',
        height: '1rem',
        margin: 0,
        padding: 0,
        border: 'none',
        transition: 'right 0.25s'
      });
    const content = new Box()
      .setStyle({
        flexDirection: 'column',
        position: 'absolute',
        bottom: 0,
        right: 0,
        zIndex: 1,
        minWidth: 'min(50vh, 25rem)',
        transition: 'right 0.25s, bottom 0.25s',
        margin: 0
      });
    const header = UI.createElement('h1', headerText);
    const text = UI.createElement('p', messageText);
    content.appendChild(header).appendChild(text);
    toast.appendChild(content);
    const buttonElems = [];
    for(const button of buttons){
      buttonElems.push(button);
      content.appendChild(buttonElems.at(-1));
    }

    this.toasts.push(toast);
    this.appendChild(toast);
    return this;
  }
}