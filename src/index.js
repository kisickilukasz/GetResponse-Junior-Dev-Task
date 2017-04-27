(function (window) {

  'use strict';
  let setCheck = null;
  let errorMessages = [];
  const form = document.getElementById('form');
  const ticket_count = document.getElementById('ticket-count');
  const radios = document.getElementsByName('ticket-radio');
  const inputs = document.querySelectorAll('[data-placeholder]');
  const toastContainer = document.getElementsByName('toast_container')[0];

  // logic for unchecking previously checked radio input
  radios.forEach( radio => {
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

  inputs.forEach( input => {
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
    errorMessages = [];
    const elements = document.getElementById("form").elements;

    if (elements["first_name"].name === "first_name") {
      let element = elements["first_name"];
      validateInput(element);
    }

    if (elements["last_name"].name === "last_name") {
      let element = elements["last_name"];
      validateInput(element);
    }

    if (elements["textarea_1"].name === "textarea_1") {
      let element = elements["textarea_1"];
      validateInput(element);
    }

    if (elements["textarea_2"].name === "textarea_2") {
      let element = elements["textarea_2"];
      validateInput(element);
    }

    if (elements["email"].name === "email") {
      let element = elements["email"];
      validateInput(element);
    }

    if (elements["password"].name === "password") {
      let element = elements["password"];
      validateInput(element);
    }

    if (elements["vid_number"].name === "vid_number") {
      let element = elements["vid_number"];
      validateInput(element);
    }

    if (elements["ticket_count"].name === "ticket_count") {
      let element = elements["ticket_count"];
      validateInput(element);
    }

    showValidationMessage(errorMessages);
    if (!isFormValid(errorMessages)) {
      event.preventDefault();
    };


  }

  const validateInput = element => {
    let isEmpty = element.value === element.dataset.placeholder || element.value === "" ? true : false;
    let isValid = checkIfValid(element.value, regex[element.name], isEmpty);
    let message = getValidationMessage(isValid, isEmpty, element.name, element.dataset.placeholder);
    if (!message) {
      return;
    } else {
      errorMessages.push(message);
    }
  }

  const checkIfValid = (elementValue, pattern, isEmpty) => {
    if (isEmpty) {
      return isEmpty;
    }
    return pattern.test(elementValue);
  }

  const checkCharactersRange = event => {
    let element = event.target;
    let length = element.value.length;
    if ((element.name === "textarea_1" && length > 10) || (element.name === "textarea_2" && length > 20) || (element.name === "vid_number" && length > 5)) {
      validateInput(element);
      showValidationMessage(errorMessages);
      errorMessages = [];
    }
    return;
  }

  const getValidationMessage = (isValid, isEmpty, elementName, elementPlaceholder) => {
    if (isEmpty) {
      return elementPlaceholder !== "" ? `${elementPlaceholder} ${errorTemplates.inputEmpty}` : `Ticket input ${errorTemplates.inputEmpty}`;
    } else if (!isValid) {
      return elementPlaceholder !== "" ? `${elementPlaceholder} ${errorTemplates[elementName]}` : `Ticket input ${errorTemplates[elementName]}`;
    } else {
      return;
    }
  }

  const showValidationMessage = errorMessages => {
    if (!errorMessages.length) {
      return;
    } else {
      errorMessages.forEach( (message, index) => {
        setTimeout(function() {
          checkIfMessageDisplayed(message);
        }, 100 * index)
      })
    }
  }

  const isFormValid = errorMessages => {
    if (!errorMessages.length) {
      return true;
    }
    return false;
  }

  // Prevents from displaying the same message again
  const checkIfMessageDisplayed = message => {
    const toastContainerValues = Object.keys(toastContainer.children).map(key => toastContainer.children[key].textContent);
    const isDisplayed = toastContainerValues.indexOf(message) > -1;
    if (!isDisplayed) {
      addElement(message)
    }
  }

  const addElement = message => {
    const toast = document.createElement('div');
    const firstChild = toastContainer.hasChildNodes() ? toastContainer.firstChild : null;
    toast.textContent = message;
    toast.classList.add('toast', 'fade-in');
    toastContainer.insertBefore(toast, firstChild);
  }

  // After 3s checks if there are any messages displayed and starts the slider
  const startSlider = event => {
    setTimeout(function() {
      let lastChild = toastContainer.lastChild;
      let counter = toastContainer.childElementCount;
      if (counter > 0) {
        let id = setInterval(function() {
          if (counter === 0 ) {
            clearInterval(id);
              return;
          }
          let lastChild = toastContainer.lastChild;
          toastContainer.classList.add('slide-down');
          lastChild.classList.add('fade-out');
          setTimeout(function() {
            toastContainer.removeChild(lastChild);
            toastContainer.classList.remove('slide-down');
            errorMessages.shift();
            console.log(errorMessages)
          }, 500)
          counter--;
        }, 600)
      }
    }, 2000)
  }


  const errorTemplates = {
    inputEmpty  : "can not be empty!",
    first_name  : "can not contain any numbers!",
    last_name   : "can not contain any numbers!",
    textarea_1  : "can not contain more than 10 characters!",
    textarea_2  : "can not contain more than 20 characters!",
    email       : "format has to be valid!",
    password    : "has to be min 8 characters, upper letter, lower letter, number and a special character",
    vid_number  : "can contain only numbers and maximum of 5 characters",
    ticket_count: "accepts values from 1 to 20!"
  }

  const regex = {
    first_name  : /^\D+$/,
    last_name   : /^\D+$/,
    email       : /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/,
    textarea_1  : /^.{1,10}$/,
    textarea_2  : /^.{1,20}$/,
    password    : /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/,
    vid_number  : /^\d{1,5}$/,
    ticket_count: /^([1-9]|1\d|20)$/
  }

  // event delegation on form
  form.addEventListener("focus", setCaret, false);
  form.addEventListener("click", setCaret, false);
  form.addEventListener("keydown", clearPlaceholder, false);
  form.addEventListener("keyup", checkCharactersRange, false);
  form.addEventListener("keyup", restorePlaceholder, false);
  form.addEventListener("blur", restorePlaceholder, true);

  form.addEventListener("submit", validateForm, false);
  form.addEventListener("submit", startSlider, false);

})(window)
