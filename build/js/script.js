(function() {
  var cartForm = document.querySelector('.js-cart-form form');
  var codeEnter = 13;

  if (!cartForm) {
    return;
  }

  function blocksButtons() {
    // блокирует кнопки submit
    var btns = document.querySelectorAll('button[type="submit"]');

    if (!btns) {
      return
    }
    Array.prototype.forEach.call(btns, function(btn) {
      console.log(btn);
      btn.disabled = true;
    });
  }

  function checkItems() {
    // проверяет наличие товаров в корзине
    var cartItems = document.querySelectorAll('.js-cart-item');
    return cartItems.length === null || cartItems.length < 1 ? false : true
  }

  function addItemsRemove() {
    // добавляет удаление товаров из корзины
    var removebtns = document.querySelectorAll('.js-remove-btn');
    if (!removebtns) {
      return;
    }

    Array.prototype.forEach.call(removebtns, function(btn) {
      btn.addEventListener('click', function() {
        btn.parentNode.remove();
        var flag = checkItems();
        if (flag === false) {
          blocksButtons();
        }
      });
      btn.addEventListener('keydown', function() {
        if (evt.keyCode === codeEnter) {
          btn.parentNode.remove();
        }
      });
    });
  }

  if (!Element.prototype.remove) {
    Element.prototype.remove = function remove() {
      if (this.parentNode) {
        this.parentNode.removeChild(this);
      }
    };
  }

  addItemsRemove();
})();

(function() {
  var body = document.querySelector('body');
  var scrollbarClass = 'scrollbar';

  function getScrollBarWidth() {
    var inner = document.createElement('p');
    inner.style.width = "100%";
    inner.style.height = "200px";

    var outer = document.createElement('div');
    outer.style.position = "absolute";
    outer.style.top = "0px";
    outer.style.left = "0px";
    outer.style.visibility = "hidden";
    outer.style.width = "200px";
    outer.style.height = "150px";
    outer.style.overflow = "hidden";
    outer.appendChild(inner);

    document.body.appendChild(outer);
    var w1 = inner.offsetWidth;
    outer.style.overflow = 'scroll';
    var w2 = inner.offsetWidth;
    if (w1 == w2) w2 = outer.clientWidth;

    document.body.removeChild(outer);

    return (w1 - w2);
  };

  function checkScrollbar() {
    var scrollWidth = getScrollBarWidth();
    scrollWidth > 0 ? body.classList.add(scrollbarClass) :body.classList.remove(scrollbarClass);
  }
  checkScrollbar();
})();

(function() {
  // активирует дроп-меню
  function activateDropMenu() {
    var items = document.querySelectorAll('.js-drop-item');

    if (!items) {
      return;
    }

    Array.prototype.forEach.call(items, function(item) {
      var menu = item.querySelector('.js-drop-menu');
      var xItemPosition = item.getBoundingClientRect().left + document.body.scrollLeft;
      // открывает дроп-меню
      function openMenu() {
        menu.classList.remove('js-hide');
      }
      // закрывает дроп-меню
      function closeMenu() {
        menu.classList.add('js-hide');
      }
      // устранение дребезга при случайном наведении на пункт меню
      function delayOpen(item, action) {
        var timeout = null;
        item.addEventListener('mouseover', function() {
          timeout = setTimeout(action, 300);
        });

        item.addEventListener('mouseout', function() {
          clearTimeout(timeout);
        });
      }

      // позиционирование дроп-меню (слве/справа) в зависимости от положения пункта меню
      xItemPosition <= (window.innerWidth / 2) ? menu.classList.add('js-left') : menu.classList.add('js-right');

      item.addEventListener('mouseover', function () {
        delayOpen(item, openMenu);
      });

      item.addEventListener('mouseleave', closeMenu);
    });
  }

  activateDropMenu();
})();

(function() {
  // для кастомных селектов селектов
  var selects = document.querySelectorAll('.form-select');

  if (!selects) {
    return;
  }

  Array.prototype.forEach.call(selects, function(select) {
    var btn = select.querySelector('.form-select__btn');
    var btnTitle = select.querySelector('.form-select__title');
    var optionsList = select.querySelector('.form-select__options');
    var options = select.querySelectorAll('.form-select__option input');
    var optionChecked = select.querySelector('.form-select__option input:checked');
    var optionCheckedTitle = select.querySelector('.form-select__option input:checked+label');
    var openClass = 'form-select__btn--open';

    function changeTitle() {
      // меняет текст в кнопке на текст выбранного пункта
      if (!optionCheckedTitle) {
        return;
      }
      btn.textContent = optionCheckedTitle.textContent;
    }

    function changeHeight() {
      // меняет высоту списка, по умолчанию высота = 0;
      if (optionsList.getAttribute('style') === null) {
        optionsList.style.height = optionsList.scrollHeight + 'px';
      } else {
        optionsList.style.height = optionsList.scrollHeight + 'px';
        window.getComputedStyle(optionsList, null).getPropertyValue("height");
        optionsList.removeAttribute('style');
      }

      optionsList.addEventListener("transitionend", function() {
        if (optionsList.getAttribute('style') !== null) {
          optionsList.style.height = "auto"
        }
      });
    }

    function toggleSelect() {
      // открывает/закрывает список
      btn.classList.toggle(openClass);
      changeHeight();
    }

    Array.prototype.forEach.call(options, function(option) {
      option.addEventListener('click', function() {
        optionChecked = select.querySelector('.form-select__option input:checked');
        optionCheckedTitle = select.querySelector('.form-select__option input:checked+label');
        changeTitle();
        toggleSelect();
      });
    });

    changeTitle();
    btn.addEventListener('click', toggleSelect);
    document.addEventListener('click', function close(evt) {
      if (btn.classList.contains(openClass) &&
          !btn.contains(evt.target) &&
          !btnTitle.contains(evt.target) &&
          !optionsList.contains(evt.target)) {
        toggleSelect();
      }
    });
  });
})();

(function() {
  var modals = document.querySelectorAll('.js-modal');
  var hideClass = 'js-hide';

  var body = document.querySelector('body');
  var scrollHiddenClass = 'scroll-hidden';

  var codeEsc = 27;
  var codeEnter = 13;

  var modalSelector = [
  // для открытия модалок
    { // для примера
      BTN: 'селектор кнопки',
      MODAL: 'селектор модалки',
      CALLBACK: 'название функции (если есть)' // например CALLBACK: 'имя'
    },
    { // для модалки товар добавлен в корзину
      BTN: '.js-add-cart-btn',
      MODAL: '.js-modal-add'
    },
    { // для модалки купить в клик
      BTN: '.js-buy-click-btn',
      MODAL: '.js-modal-buy-click'
    }
  ];

  if (!modals) {
    return;
  }

  function addInputFocus(modal) {
    // добавляет фокус на первое поле
    var input = modal.querySelector('form input[type]:not([type="checkbox"]):not([type="radio"]):not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="range"]):not([type="file"]):not([type="image"])');
    if (!input) {
      return;
    }
    input.focus();
  }

  function activateModalOpen() {
    function modalOpen(modalSelector) {
      // открывает модалку
      var modal = document.querySelector(modalSelector);
      if (!modal) {
        return;
      }
      modal.classList.remove(hideClass);
      body.classList.add(scrollHiddenClass);
      addInputFocus(modal);
    }
    Array.prototype.forEach.call(modalSelector, function(it) {
      document.addEventListener('click', function(evt) {
        if (evt.target.closest(it.BTN)) {
          evt.preventDefault();
          modalOpen(it.MODAL);
          it.CALLBACK && typeof window[it.CALLBACK] === 'function' ? window[it.CALLBACK]() : false;
        }
      });
      document.addEventListener('keydown', function(evt) {
        if (evt.target.closest(it.BTN) && evt.keyCode === codeEnter) {
          evt.preventDefault();
          modalOpen(it.MODAL);
          it.CALLBACK && typeof window[it.CALLBACK] === 'function' ? window[it.CALLBACK]() : false;
        }
      });
    });
  }

  function activateModalClose() {
    Array.prototype.forEach.call(modals, function(modal) {
      var closeBtns = modal.querySelectorAll('.js-close-btn');
      var container = modal.querySelector('.modal__container');

      function modalClose() {
        // закрывает модалку
        modal.classList.add(hideClass);
        body.classList.remove(scrollHiddenClass);
      }

      Array.prototype.forEach.call(closeBtns, function(btn) {
        btn.addEventListener('click', modalClose);
        btn.addEventListener('keydown', function(evt) {
          if (evt.keyCode === codeEnter) {
            modalClose();
          }
        });
      });

      modal.addEventListener('click', function(evt) {
        if (!container.contains(evt.target)) {
          modalClose();
        }
      });

      document.addEventListener('keydown', function(evt) {
        if (evt.keyCode === codeEsc) {
          evt.preventDefault();
          modalClose();
        }
      });
    });
  }

  (function(ELEMENT) {
    ELEMENT.matches = ELEMENT.matches || ELEMENT.mozMatchesSelector || ELEMENT.msMatchesSelector || ELEMENT.oMatchesSelector || ELEMENT.webkitMatchesSelector;
    ELEMENT.closest = ELEMENT.closest || function closest(selector) {
      if (!this) return null;
      if (this.matches(selector)) return this;
      if (!this.parentElement) { return null } else return this.parentElement.closest(selector)
    };
  }(Element.prototype));

  activateModalClose();
  activateModalOpen();
})();

(function() {

  var telInputs = document.querySelectorAll('input[type="tel"]');

  if (telInputs) {
    return
  }

  Array.prototype.forEach.call(telInputs, function(it) {
    // маска для поля с телефонос
    var phoneMask = new IMask(it, {
      mask: '+7(000)000-00-00'
    });
  });
})();

(function() {
  function quantityProducts() {
    // для полей с количеством товара
    var items = document.querySelectorAll('.quantity-block')

    Array.prototype.forEach.call(items, function(item) {
      var minus = item.querySelector('.quantity-block__btn--minus');
      var plus = item.querySelector('.quantity-block__btn--plus');
      var input = item.querySelector('input');

      var defaultMin = 2;
      var defaultMax = 100;
      var dataMin = input.getAttribute('data-min');
      var dataMax = input.getAttribute('data-max');

      var min = dataMin && parseInt(dataMin) ? dataMin : defaultMin;
      var max = dataMin && parseInt(dataMin) ? dataMax : defaultMax;

      var quantityFieldMask = new IMask(input, {
        mask: Number,
        min: min,
        max: max
      });

      function quantityMinus() {
        if (input.value > min) {
          input.value = +input.value - 1;
        }
      }

      function quantityPlus() {
        if (input.value < max) {
          input.value = +input.value + 1;
        }
      }

      minus.addEventListener('click', quantityMinus);
      plus.addEventListener('click', quantityPlus);
    });
  }

  quantityProducts();
})();

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

(function() {
  function activateTabSwitch() {
    // переключает вкладки на странице продукта
    var containers = document.querySelectorAll('.js-tab-switch');
    var hideClass = 'js-hide'; // класс для скрытых вкладок

    if (!containers) {
      return;
    }

    Array.prototype.forEach.call(containers, function(container) {
      var controls = container.querySelector('.js-controls form'); // форма с input radio

      var activeBtn = container.querySelector('input[type="radio"]:checked'); // активная кнопка
      var activeItem = container.querySelector('.' + activeBtn.id); // класс вкладки = id кнопки

      function togglesTabs() {
        activeItem.classList.add(hideClass);
        activeBtn = container.querySelector('input[type="radio"]:checked');
        activeItem = container.querySelector('.' + activeBtn.id);
        activeItem.classList.remove(hideClass);
      }

      activeItem.classList.remove(hideClass);
      controls.addEventListener('change', togglesTabs);
    });

  }
  activateTabSwitch();
})();

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
