import initScreen from './../../components/initScreen/initScreen';

var initScreenNode = document.querySelector('.initScreen');

var scroll = {
  onContent : false,

  init() {
    scroll.setListeners();
  },

  setListeners() {
    initScreenNode.addEventListener('initScreenAnimationEnd', () => { 
      document.addEventListener('wheel', () => {
        scroll.toContent();
      }, { passive: true} );

      document.addEventListener('keydown', (e) => {
        if(e.keyCode == 40 || e.keyCode == 34 || e.keyCode == 32) {
          scroll.toContent();
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
    if(scroll.onContent) return;
    
    scroll.onContent = true;

    var scrollTime = 600;
    
    smoothScroll.scrollTo(768, scrollTime, document.body);
  
    setTimeout(() => {
      initScreen.hide();

      document.body.scrollTop = document.documentElement.scrollTop = 0;
  
      document.body.classList.add('enableScroll');

      document.body.focus();
    }, scrollTime + 30);
  }
}

export default scroll;