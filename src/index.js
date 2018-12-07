// Libs
import initScrollLib from './lib/scripts/scrollTo';

// Components
import initScreen from './components/initScreen/initScreen';

initScrollLib();
initScreen.init();

var scrollOnContent = false;

document.addEventListener('wheel', () => {
  if(scrollOnContent) return;

  scrollOnContent = true;

  smoothScroll.scrollTo(768, 600, document.body);

  setTimeout(() => {
    initScreen.hide();

    document.body.scroll({
      top: 0, 
      left: 0
    });

    document.body.classList.add('enableScroll');
  }, 700);
});