(function() {

  var telInputs = document.querySelectorAll('input[type="tel"]');

  Array.prototype.forEach.call(telInputs, function(it) {
    var phoneMask = new IMask(it, {
      mask: '+7(000)000-00-00'
    });
  });

  window.addInfutAutofocus = function() {
    var input = document.querySelector('form input[type]:not([type="checkbox"]):not([type="radio"]):not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="range"]):not([type="file"]):not([type="image"])');
    if (!input) {
      return;
    }

    console.log(input);
    input.focus();
  }

})();
