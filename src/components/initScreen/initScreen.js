var initScreenNode = document.querySelector('.initScreen');
var videoNode = document.querySelector('.initScreen .video');
var contentNode = document.querySelector('.initScreen .content');

var initScreen = {
  init() {
    initScreen.setupVideo();
    initScreen.setListeners();
  },

  setListeners() {
    videoNode.addEventListener('animationend', () => {
      initScreen.playVideo();
      initScreen.showAnimation();
    });

    contentNode.addEventListener('animationend', () => {
      var event = new Event('initScreenAnimationEnd');
      initScreenNode.dispatchEvent(event);
    });
  },

  setupVideo() {
    var mobilePreffix = '';

    if(window.innerWidth <= 768) {
      mobilePreffix = '-mobile'
    }

    var videoSrc = videoNode.dataset.src;

    videoNode.innerHTML = `<source src="${videoSrc}${mobilePreffix}.mp4" 
                                   type="video/mp4; codecs="&quot";avc1.42E01E, mp4a.40.2&quot;">`;
  },

  playVideo() {
    videoNode.play();
  },

  hide() {
    initScreenNode.classList.add('hide');
  },

  showAnimation() {
    initScreenNode.classList.add('showAnimation');
  }
}

export default initScreen;