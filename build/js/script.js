'use strict';
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

'use strict';
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

'use strict';
(function() {
  // активирует дроп-меню
  window.activateDropMenu = function() {
    var items = document.querySelectorAll('.js-drop-item');
    var openClass = 'js-drop-item--open';

    if (!items) {
      return;
    }

    Array.prototype.forEach.call(items, function(item) {
      var menu = item.querySelector('.js-drop-menu');
      var xItemPosition = item.getBoundingClientRect().left + document.body.scrollLeft;
      var timeout = null;
      var tabletWidth = 1023;
      // открывает дроп-меню
      function openMenu() {
        menu.classList.remove('js-hide');
        item.classList.add('js-drop-item--open');
        document.addEventListener('click', onDocumentClick);
      }
      // закрывает дроп-меню
      function closeMenu() {
        menu.classList.add('js-hide');
        item.classList.remove('js-drop-item--open');
        document.removeEventListener('click', onDocumentClick);
      }

      // устранение дребезга
      function addTimeout(action) {
        timeout = setTimeout(action, 200);
      }

      // обнуляет таймер
      function removeTimeout() {
        clearTimeout(timeout);
      }

      function onItemMouseover() {
        if (window.innerWidth > tabletWidth) {
          addTimeout(openMenu);
        }
      }

      function onItemMouseleave() {
        if (window.innerWidth > tabletWidth) {
          removeTimeout();
          closeMenu();
        }
      }

      function onItemClick(evt) {
        if (window.innerWidth > tabletWidth) {
          return;
        }
        if (menu.classList.contains('js-hide')) {
          openMenu();
        } else if (!menu.classList.contains('js-hide') && !menu.contains(evt.target)) {
          closeMenu();
        }
      }

      function onDocumentClick(evt) {
        if (!menu.contains(evt.target) && !item.contains(evt.target)) {
          closeMenu();
        }
      }

      // позиционирование дроп-меню (слве/справа) в зависимости от положения пункта меню
      xItemPosition <= (window.innerWidth / 2) ? menu.classList.add('js-left') : menu.classList.add('js-right');

      item.addEventListener('mouseout', removeTimeout);
      item.addEventListener('mouseover', onItemMouseover);
      item.addEventListener('mouseleave', onItemMouseleave);
      item.addEventListener('click', onItemClick);

      window.addEventListener('resize', function() {
        if (window.innerWidth <= tabletWidth) {
          item.removeEventListener('mouseover', onItemMouseover);
          item.removeEventListener('mouseleave', onItemMouseleave);
          item.removeEventListener('mouseout', removeTimeout);
          item.addEventListener('click', onItemClick);
        } else {
          item.addEventListener('mouseover', onItemMouseover);
          item.addEventListener('mouseleave', onItemMouseleave);
          item.addEventListener('mouseout', removeTimeout);
          item.removeEventListener('click', onItemClick);
        }
      });
    });
  }

  activateDropMenu();
})();

'use strict';
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

'use strict';
(function() {
  var body = document.querySelector('body');
  var menuBtn = document.querySelector('.js-mobile-menu-btn');

  var menuItems = [
    '.page-header__menu',
    '.main-nav'
  ];

  var menuClass = 'mobile-menu';

  var activeClass = 'mobile-menu--active';
  var closeClass = 'mobile-menu--close';

  var scrollHiddenClass = 'scroll-hidden';

  function createMobileMenu(className, items) {
    var menu = document.createElement('div');
    var container = document.createElement('div');
    var containerClass = className + '__container';

    menu.classList.add(className);
    container.classList.add(containerClass);

    Array.prototype.forEach.call(items, function(item) {
      if (item) {
        container.appendChild(document.querySelector(item).cloneNode(true));
      }
    });

    menu.appendChild(container);
    body.appendChild(menu);
  }

  function removeMobileMenu(className) {
    var menu = document.querySelector('.' + className);
    if (menu) {
      menu.remove();
    }
  }

  function openMenu() {
    createMobileMenu(menuClass, menuItems);

    var menu = document.querySelector('.' + menuClass);
    var btn = menu.querySelector('.js-mobile-menu-btn');
    var container = menu.querySelector('.mobile-menu__container');

    window.activateDropMenu();

    if (menu) {

      menu.classList.add(activeClass);
    }
    body.classList.add(scrollHiddenClass);

    btn.addEventListener('click', function() {
      closeMenu();
    });
    menu.addEventListener('click', function(evt) {
      if (!container.contains(evt.target)) {
        closeMenu();
      }
    });
  }

  function closeMenu() {
    var menu = document.querySelector('.' + menuClass);
    var btn = menu.querySelector('.js-mobile-menu-btn');

    if (menu) {
      menu.classList.add(closeClass);
      menu.classList.remove(activeClass);
      btn.disabled = true;
      menuBtn.disabled = true;
    }

    body.classList.remove(scrollHiddenClass);

    setTimeout(function() {
      menuBtn.disabled = false;
      removeMobileMenu(menuClass);
    }, 600);

  }
  menuBtn.addEventListener('click', openMenu);
})();

'use strict';
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

'use strict';
(function() {
  var telInputs = document.querySelectorAll('input[type="tel"]');

  if (!telInputs) {
    return
  }

  Array.prototype.forEach.call(telInputs, function(it) {
    // маска для поля с телефоном
    var phoneMask = new IMask(it, {
      mask: '+7(000)000-00-00'
    });
  });
})();

'use strict';
(function() {
  function quantityProducts() {
    // для полей с количеством товара
    var items = document.querySelectorAll('.quantity-block');

    if (!items) {
      return;
    }

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

'use strict';
(function() {
  var els = document.querySelectorAll('.js-scroll-left');

  if (!els) {
    return;
  }

  Array.prototype.forEach.call(els, function(el) {
    // меняет направление скролла элемнта
    el.scrollLeft = el.scrollWidth - el.clientWidth;
  });
})();

'use strict';
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
        spaceBetween: 0,
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

'use strict';
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
