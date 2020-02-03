'user strict';
(function() {
  // для промо слайдера
  var swiper = new Swiper('.promo-slider', {
    slidesPerView: 1,
    spaceBetween: 0,
    speed: 1000,
    loop: true,
    grabCursor: true,
    keyboard: {
      enabled: true,
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.promo-slider__pagination.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.promo-slider__nav--next',
      prevEl: '.promo-slider__nav--prev',
    },
  });
})();
(function() {
  // для слайдеров в карточке товара

  function activateSliders() {
    var sliders = document.querySelectorAll('.photo-gallery');

    if (!sliders) {
      return;
    }

    Array.prototype.forEach.call(sliders, function(slider) {
      var sliderThumbs = slider.querySelector('.photo-gallery__thumbs');
      var sliderTop = slider.querySelector('.photo-gallery__top');
      var next = slider.querySelector('.photo-gallery__nav--next');
      var prev = slider.querySelector('.photo-gallery__nav--prev');

      var galleryThumbs = new Swiper(sliderThumbs, {
        spaceBetween: 5.05,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        observer: true,
        observeParents: true
      });
      var galleryTop = new Swiper(sliderTop, {
        spaceBetween: 10,
        observer: true,
        observeParents: true,
        // effect: 'fade',
        navigation: {
          nextEl: next,
          prevEl: prev,
        },
        thumbs: {
          swiper: galleryThumbs
        }
      });
    });
  }

  activateSliders();
})();
