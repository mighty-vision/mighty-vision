import initScreen from './../../components/initScreen/initScreen';

var initScreenNode = document.querySelector('.initScreen');
var secondScreenNode = document.querySelector('.secondScreen');
var scrollPos = 0;

var scroll = {
  onContent : false,

  init() {
    scroll.setListeners();
  },

  setListeners() {
    initScreenNode.addEventListener('initScreenAnimationEnd', () => { 
      document.addEventListener('wheel', (e) => {
        if(e.deltaY > 0 && !scroll.onContent) {
          scroll.toContent();
        }

        if(window.scrollY == 0 && e.deltaY < 0 && scroll.onContent) {
          scroll.toInitScreen();
        }
      }, { passive: true} );

      document.addEventListener('keydown', (e) => {
        scrollPos = secondScreenNode.getBoundingClientRect().top;

        if(!scroll.onContent && e.keyCode == 40 || e.keyCode == 34 || e.keyCode == 32) {
          scroll.toContent();
        }

        if(scrollPos == 0 && e.keyCode == 38 || e.keyCode == 33) {
          scroll.toInitScreen();
        }
      });
    });

    document.addEventListener('keydown', (e) => {
      if(!scroll.onContent && e.keyCode == 9) {
        e.preventDefault();
      }
    });
  },

  toContent() {
    scroll.onContent = true;

    var scrollTime = 600;

    document.body.classList.add('showContent');
  
    setTimeout(() => {
      document.querySelector('html').classList.add('enableScroll');
      document.querySelector('.inertScrollFixOverlay').classList.add('hide');

    }, scrollTime + 30);
  },

  toInitScreen() {
    scroll.onContent = false;

    document.querySelector('html').classList.remove('enableScroll');
    document.querySelector('.inertScrollFixOverlay').scrollTo(0, 0);
    document.querySelector('.inertScrollFixOverlay').classList.remove('hide');
    document.querySelector('.inertScrollFixOverlay').focus();

    document.body.classList.remove('showContent');
  }
}

export default scroll;