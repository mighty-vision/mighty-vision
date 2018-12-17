

// Utils
import detectBrowser from './utils/scripts/detectBrowser';
import detectWebp from './utils/scripts/detectWebp';
import focusOnlyWithKeys from './utils/scripts/focusOnlyWithKeys';

// Basic
import scroll from './basic/scripts/scrollToContent';
import scrollAnimation from './basic/scripts/scrollAnimation';

// Components
import initScreen from './components/initScreen/initScreen';
import contacts from './components/contacts/contacts';


detectWebp();
detectBrowser();
focusOnlyWithKeys();
initScreen.init();
contacts.init();


var isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;

if(isMac) {
	document.getElementsByTagName('html')[0].classList.add('mac')
}

var isMobile = (window.innerWidth <= 768);

if(document.body.dataset.browser != 'edge' && !isMobile) {
  scroll.init();
}

if (isMobile) scrollAnimation();