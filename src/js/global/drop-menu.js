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
