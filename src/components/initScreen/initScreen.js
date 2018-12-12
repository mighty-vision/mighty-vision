var initScreenNode = document.querySelector('.initScreen');
var videoNode = document.querySelector('.initScreen .video');
var contentNode = document.querySelector('.initScreen .content');

var mobile = (window.innerWidth <= 768);

var initScreen = {
  videoPlayed : false,

  init() {
    initScreen.setupVideo();
    initScreen.setListeners();
  },

  setListeners() {
    window.addEventListener('load', () => {
      document.body.classList.add('startAnimation');
    });


    videoNode.addEventListener('animationend', () => {
      initScreen.playVideo();
    });

    contentNode.addEventListener('animationend', () => {
      var event = new Event('initScreenAnimationEnd');
      initScreenNode.dispatchEvent(event);
    });
  },

  setupVideo() {
    var mobilePreffix = '';

    if(mobile) {
      mobilePreffix = '-mobile'
    }

    var videoSrc = videoNode.dataset.src;

    videoNode.innerHTML = `<source src="${videoSrc}${mobilePreffix}.mp4#t=0.1" 
                                   type="video/mp4; codecs="&quot";avc1.42E01E, mp4a.40.2&quot;">`;
  },

  playVideo() {
    if(initScreen.videoPlayed) return;

    initScreen.videoPlayed = true;

    videoNode.play();
  },

  hide() {
    initScreenNode.classList.add('hide');
  }
}

export default initScreen;