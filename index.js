(function (window) {

  'use strict';
  let setCheck = null;
  let errorMessages = [];
  const form = document.getElementById('form');
  const ticket_count = document.getElementById('ticket-count');
  const radios = document.getElementsByName('ticket-radio');
  const inputs = document.querySelectorAll('[data-placeholder]');

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
    let isEmpty = element.value === element.dataset.placeholder ? true : false;
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

  const getValidationMessage = (isValid, isEmpty, elementName, elementPlaceholder) => {
    if (isEmpty) {
      return elementPlaceholder !== "" ? elementPlaceholder + " " + errorTemplates.inputEmpty : "Ticket input " + errorTemplates.inputEmpty;
    } else if (!isValid) {
      return elementPlaceholder !== "" ? elementPlaceholder + " " + errorTemplates[elementName] : "Ticket input " + errorTemplates[elementName];
    } else {
      return;
    }
  }

  const showValidationMessage = errorMessages => {
    if (!errorMessages.length) {
      return;
    } else {
      errorMessages.forEach( message => {
        console.log(message)
      })
    }
  }

  const isFormValid = errorMessages => {
    if (!errorMessages.length) {
      return true;
    }
    return false;
  }

  const errorTemplates = {
    inputEmpty  : "field can not be empty!",
    first_name  : "field can not contain any numbers!",
    last_name   : "field can not contain any numbers!",
    textarea_1  : "field can not contain more than 10 characters!",
    textarea_2  : "field can not contain more than 20 characters!",
    email       : "format has to be valid!",
    password    : "field has to be at least 8 characters long, contain upper letter, lower letter, number and a special character",
    vid_number  : "field can contain only numbers and maximum of 5 characters",
    ticket_count: "field accepts values from 1 to 20!"
  }

  const regex = {
    first_name  : /^\D+$/,
    last_name   : /^\D+$/,
    email       : /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/,
    textarea_1  : /^.{1,10}$/,
    textarea_2  : /^.{1,20}$/,
    password    : /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/,
    vid_number  : /^\d{1,5}$/,
    ticket_count: /^\d{1,2}$/
  }

  // event delegation on form
  form.addEventListener("focus", setCaret, false);
  form.addEventListener("click", setCaret, false);
  form.addEventListener("keydown", clearPlaceholder, false);
  form.addEventListener("keyup", restorePlaceholder, false);
  form.addEventListener("blur", restorePlaceholder, true);

  form.addEventListener("submit", validateForm, false);

})(window)
