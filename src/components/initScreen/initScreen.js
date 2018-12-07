var initScreenNode = document.querySelector('.initScreen');
var videoNode = document.querySelector('.initScreen .video');

var initScreen = {
  init() {
    initScreen.setListeners();
  },

  playVideo() {
    videoNode.play();
  },

  hide() {
    initScreenNode.classList.add('hide');
  },

  showAnimation() {
    initScreenNode.classList.add('showAnimation');
  },

  setListeners() {
    videoNode.addEventListener('animationend', () => {
      initScreen.playVideo();
      initScreen.showAnimation();
    }); 
  }
}

export default initScreen;