// Utils
import detectBrowser from './utils/scripts/detectBrowser';
import detectWebp from './utils/scripts/detectWebp';
import focusOnlyWithKeys from './utils/scripts/focusOnlyWithKeys';

// Basic
import scroll from './basic/scripts/scrollToContent';
import scrollAnimation from './basic/scripts/scrollAnimation';
import scrollAnimationDesktop from './basic/scripts/scrollAnimationDesktop';
import analytics from './basic/scripts/analytics';

// Components
import initScreen from './components/initScreen/initScreen';
import contacts from './components/contacts/contacts';


// Fix init transition at Chromium
setTimeout(() => {
  document.body.classList.remove('disableTransitions');
}, 30);

detectWebp();
detectBrowser();
analytics();
focusOnlyWithKeys();
initScreen.init();
contacts.init();


var isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;

if(isMac) {
	document.getElementsByTagName('html')[0].classList.add('mac');
}

var isMobile = (window.innerWidth <= 768);

if(document.body.dataset.browser != 'edge' && !isMobile) {
  scroll.init();
}

if (isMobile) {
  scrollAnimation();
} else {
  scrollAnimationDesktop();
}

document.querySelector('.inertScrollFixOverlay').focus();