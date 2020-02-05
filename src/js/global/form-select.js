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
