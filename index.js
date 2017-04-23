(function (window) {

  'use strict';
  let setCheck = null;
  const form = document.getElementById('form');
  const radios = document.getElementsByName('ticket-radio');
  const inputs = document.querySelectorAll('[data-placeholder]');
  console.log(inputs);

  // logic for unchecking previously checked radio input
  radios.forEach((radio) => {
    radio.onclick = () => {
      if (setCheck != radio) {
        setCheck = radio;
      } else {
        radio.checked = false;
        setCheck = null;
      }
    }
  });

  inputs.forEach((input) => {
    if (!input.value.lenght) {
      input.value = input.dataset.placeholder;
      if (input.type === "password") {
        input.type = "text";
      }
    } else {
      input.value = input.value;
    };
  });

  // sets caret at the beginning of an input
  const setCaret = event => {
    let element = event.target;
    if (element.value === element.getAttribute("data-placeholder")) {
      element.setSelectionRange(0, 0);
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
  }

  const clearPlaceholder = event => {
    console.log(event);
  }

  const restorePlaceholder = event => {
    console.log(event);
  }

  form.addEventListener("focus", setCaret, false);
  form.addEventListener("drop", setCaret, false);
  form.addEventListener("click", setCaret, false);
  form.addEventListener("keydown", clearPlaceholder, false);
  form.addEventListener("keyup", restorePlaceholder, false);
  form.addEventListener("blur", restorePlaceholder, false);

})(window)
