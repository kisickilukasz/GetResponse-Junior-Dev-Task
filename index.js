(function (window) {

  'use strict';
  let setCheck = null;
  const form = document.getElementById('form');
  const ticket_count = document.getElementById('ticket-count');
  const radios = document.getElementsByName('ticket-radio');
  const inputs = document.querySelectorAll('[data-placeholder]');

  // logic for unchecking previously checked radio input
  radios.forEach((radio) => {
    radio.onclick = () => {
      if (setCheck != radio) {
        setCheck = radio;
        ticket_count.value = radio.value;
      } else {
        radio.checked = false;
        setCheck = null;
        ticket_count.value = null;
      }
    }
  });

  inputs.forEach((input) => {
    if (!input.value.lenght) {
      input.value = input.dataset.placeholder;

      if (input.type === "password") {
        input.type = "text";
      }
    }
    return;
  });

  // sets caret at the beginning of an input
  const setCaret = event => {
    let element = event.target;

    if (element.value === element.getAttribute("data-placeholder")) {
      element.setSelectionRange(0, 0);

      if (event.keyCode !== 9) {        // for the user that is navigating through the form with tab key
        event.preventDefault();
        event.stopPropagation();
      }
      return false;
    }
  }

  const clearPlaceholder = event => {
    let element = event.target;

    if (event.keyCode === 9) {
      return;
    }

    if (element.value === element.getAttribute("data-placeholder")) {
      setPasswordInputType(element);
      element.value = "";
      removeClassFromPlaceholder(element);
    }
  }

  const restorePlaceholder = event => {
    let element = event.target;

    if (element.value !== element.getAttribute("data-placeholder") && element.value === "") {
      setPasswordInputType(element);
      element.value = element.getAttribute("data-placeholder");
      addClassToPaceholder(element);
      setCaret(event);
    }

    setCaret(event);
  }

  const setPasswordInputType = element => {
    if (element.getAttribute("data-placeholder") === "Password" && element.value === "") {
      element.type = "text";
    };

    if (element.getAttribute("data-placeholder") === "Password" && element.value !== "") {
      element.type = "password";
    };
  }

  const addClassToPaceholder = element => {
    if (element.name === "ticket_count") {
      return
    } else {
      element.classList.add("input-placeholder");
    }
  }

  const removeClassFromPlaceholder = element => {
    element.classList.remove("input-placeholder");
  }

  const validateForm = (event) => {
    let element = event.target;
    let errors = [];

    if (!regex.name.test(element.children.first_name.value)) {
      console.log("Validation error!")
    } else {
      console.log("Validation success!")
    }
    event.preventDefault();
  }

  const regex = {
    name:     /^[a-zA-Z]+\s*?[a-zA-Z-]+\s*?$/,
    email:    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/,
    password: /\S/g,
    number:   /^\d+$/
  }

  // event delegation on form
  form.addEventListener("focus", setCaret, false);
  form.addEventListener("click", setCaret, false);
  form.addEventListener("keydown", clearPlaceholder, false);
  form.addEventListener("keyup", restorePlaceholder, false);
  form.addEventListener("blur", restorePlaceholder, true);

  form.addEventListener("submit", validateForm, false);

})(window)
