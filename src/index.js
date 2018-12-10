// Libs
import initScrollLib from './lib/scripts/scrollTo';

// Utils
import detectBrowser from './utils/scripts/detectBrowser';
import focusOnlyWithKeys from './utils/scripts/focusOnlyWithKeys';

// Basic
import scroll from './basic/scripts/scrollToContent';

// Components
import initScreen from './components/initScreen/initScreen';

detectBrowser();
focusOnlyWithKeys();
initScrollLib();
initScreen.init();

var isMobile = (window.innerWidth <= 768);

if(document.body.dataset.browser != 'edge' && !isMobile) {
  scroll.init();
}