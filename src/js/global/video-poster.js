'use strict';
(function() {
  // скрывает постеры к видео
  function hideVideoPoster() {
    var videoPosters = document.querySelectorAll('.js-video-poster');

    if (!videoPosters) {
      return;
    }

    Array.prototype.forEach.call(videoPosters, function(it) {
      it.addEventListener('click', function() {
        it.classList.add('js-video-poster-hide');
      });
      it.addEventListener('keydown', function(evt) {
        if (evt.keyCode === 32 || evt.keyCode === 13) {
          evt.preventDefault();
          it.classList.add('js-video-poster-hide');
        }
      });
    });
  }
  hideVideoPoster();
})();
