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
