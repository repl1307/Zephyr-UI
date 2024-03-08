import Box from '../ui/components/Box.js';
import UI from '../ui/Ui.js';
import Button from '../ui/components/Button.js';


//render test
const renderCount = 12000;
const renderTest = new Box().setStyle({
  flexDirection: 'column',
});
const renderOpts = new Box().setStyle('border', 'none');
const timeElem = new Box()
  .setStyle('border', 'none')
const renderTestLoader = new Box()
  .center()
  .setStyle({
    backgroundColor: 'rgba(0,0,0,0.75)',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    margin: 0,
    padding: 0,
    zIndex: 500,
    boxSizing: 'border-box',
    display: 'none'
  });
renderTestLoader.appendChild(UI.createElement('p', 'Loading...'));

const testButton = new Button('Start Render Test')
  .setStyle('flex', '1')
  .addEventListener('click', e => {
    if(!confirm('This will execute a render test, which might take a few seconds on older devices. Are you sure you want to continue?'))
      return;
    const startTime = performance.now();
    //renderTestLoader.setStyle('display', 'flex');
    requestAnimationFrame(
      () => setTimeout(() => {
      for(let i = 0; i < renderCount; i++){
        setTimeout(() => {
          const elem = UI.createElement('p', 'Test Elem #'+i);
          renderedElements.appendChild(elem);
        }, 0);
        if(i == renderCount-1){
          setTimeout(() => {
            renderTest.appendChild(renderedElements);
          }, i);
        }
      }

      const endTime = performance.now();
      timeElem.setText(
        (endTime-startTime).toFixed(2)+
        ' milliseconds taken to render '+renderCount+' elements'
      );

      renderTestLoader.setStyle('display', 'none');
      }, 0)
    );
  });
renderOpts.appendChild(testButton);
const renderedElements = new Box().setStyle({
  overflow: 'scroll',
  maxHeight: '50vh',
  flexDirection: 'column',
  contentVisibility: 'auto'
});

renderTest.appendChild(UI.createElement('h1', 'Render Test'));
renderTest.appendChild(renderOpts);
renderTest.appendChild(timeElem);
// renderTest.appendChild(renderedElements);

export { renderTest, renderTestLoader };