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
