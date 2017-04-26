'use strict';

(function (window) {

  'use strict';

  var setCheck = null;
  var errorMessages = [];
  var form = document.getElementById('form');
  var ticket_count = document.getElementById('ticket-count');
  var radios = document.getElementsByName('ticket-radio');
  var inputs = document.querySelectorAll('[data-placeholder]');

  // logic for unchecking previously checked radio input
  radios.forEach(function (radio) {
    radio.onclick = function () {
      if (setCheck != radio) {
        setCheck = radio;
        ticket_count.value = radio.value;
      } else {
        radio.checked = false;
        setCheck = null;
        ticket_count.value = null;
      }
    };
  });

  inputs.forEach(function (input) {
    if (!input.value.lenght) {
      input.value = input.dataset.placeholder;

      if (input.type === "password") {
        input.type = "text";
      }
    }
    return;
  });

  // sets caret at the beginning of an input
  var setCaret = function setCaret(event) {
    var element = event.target;

    if (element.value === element.getAttribute("data-placeholder")) {
      element.setSelectionRange(0, 0);

      if (event.keyCode !== 9) {
        // for the user that is navigating through the form with tab key
        event.preventDefault();
        event.stopPropagation();
      }
      return false;
    }
  };

  var clearPlaceholder = function clearPlaceholder(event) {
    var element = event.target;

    if (event.keyCode === 9) {
      return;
    }

    if (element.value === element.getAttribute("data-placeholder")) {
      setPasswordInputType(element);
      element.value = "";
      removeClassFromPlaceholder(element);
    }
  };

  var restorePlaceholder = function restorePlaceholder(event) {
    var element = event.target;

    if (element.value !== element.getAttribute("data-placeholder") && element.value === "") {
      setPasswordInputType(element);
      element.value = element.getAttribute("data-placeholder");
      addClassToPaceholder(element);
      setCaret(event);
    }

    setCaret(event);
  };

  var setPasswordInputType = function setPasswordInputType(element) {
    if (element.getAttribute("data-placeholder") === "Password" && element.value === "") {
      element.type = "text";
    };

    if (element.getAttribute("data-placeholder") === "Password" && element.value !== "") {
      element.type = "password";
    };
  };

  var addClassToPaceholder = function addClassToPaceholder(element) {
    if (element.name === "ticket_count") {
      return;
    } else {
      element.classList.add("input-placeholder");
    }
  };

  var removeClassFromPlaceholder = function removeClassFromPlaceholder(element) {
    element.classList.remove("input-placeholder");
  };

  var validateForm = function validateForm(event) {
    errorMessages = [];
    var elements = document.getElementById("form").elements;

    if (elements["first_name"].name === "first_name") {
      var element = elements["first_name"];
      validateInput(element);
    }

    if (elements["last_name"].name === "last_name") {
      var _element = elements["last_name"];
      validateInput(_element);
    }

    if (elements["textarea_1"].name === "textarea_1") {
      var _element2 = elements["textarea_1"];
      validateInput(_element2);
    }

    if (elements["textarea_2"].name === "textarea_2") {
      var _element3 = elements["textarea_2"];
      validateInput(_element3);
    }

    if (elements["email"].name === "email") {
      var _element4 = elements["email"];
      validateInput(_element4);
    }

    if (elements["password"].name === "password") {
      var _element5 = elements["password"];
      validateInput(_element5);
    }

    if (elements["vid_number"].name === "vid_number") {
      var _element6 = elements["vid_number"];
      validateInput(_element6);
    }

    if (elements["ticket_count"].name === "ticket_count") {
      var _element7 = elements["ticket_count"];
      validateInput(_element7);
    }

    showValidationMessage(errorMessages);
    if (!isFormValid(errorMessages)) {
      event.preventDefault();
    };
  };

  var validateInput = function validateInput(element) {
    var isEmpty = element.value === element.dataset.placeholder || element.value === "" ? true : false;
    var isValid = checkIfValid(element.value, regex[element.name], isEmpty);
    var message = getValidationMessage(isValid, isEmpty, element.name, element.dataset.placeholder);
    if (!message) {
      return;
    } else {
      errorMessages.push(message);
    }
  };

  var checkIfValid = function checkIfValid(elementValue, pattern, isEmpty) {
    if (isEmpty) {
      return isEmpty;
    }
    return pattern.test(elementValue);
  };

  var checkCharactersRange = function checkCharactersRange(event) {
    var element = event.target;
    if (element.name === "textarea_1" || element.name === "textarea_2" || element.name === "vid_number") {
      validateInput(element);
      showValidationMessage(errorMessages);
      errorMessages = [];
    }
    return;
  };

  var getValidationMessage = function getValidationMessage(isValid, isEmpty, elementName, elementPlaceholder) {
    if (isEmpty) {
      return elementPlaceholder !== "" ? elementPlaceholder + " " + errorTemplates.inputEmpty : "Ticket input " + errorTemplates.inputEmpty;
    } else if (!isValid) {
      return elementPlaceholder !== "" ? elementPlaceholder + " " + errorTemplates[elementName] : "Ticket input " + errorTemplates[elementName];
    } else {
      return;
    }
  };

  var showValidationMessage = function showValidationMessage(errorMessages) {
    if (!errorMessages.length) {
      return;
    } else {
      errorMessages.forEach(function (message) {
        console.log(message);
      });
    }
  };

  var isFormValid = function isFormValid(errorMessages) {
    if (!errorMessages.length) {
      return true;
    }
    return false;
  };

  var errorTemplates = {
    inputEmpty: "can not be empty!",
    first_name: "can not contain any numbers!",
    last_name: "can not contain any numbers!",
    textarea_1: "can not contain more than 10 characters!",
    textarea_2: "can not contain more than 20 characters!",
    email: "format has to be valid!",
    password: "has to be at least 8 characters long, contain upper letter, lower letter, number and a special character",
    vid_number: "can contain only numbers and maximum of 5 characters",
    ticket_count: "accepts values from 1 to 20!"
  };

  var regex = {
    first_name: /^\D+$/,
    last_name: /^\D+$/,
    email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/,
    textarea_1: /^.{1,10}$/,
    textarea_2: /^.{1,20}$/,
    password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/,
    vid_number: /^\d{1,5}$/,
    ticket_count: /^([1-9]|1\d|20)$/
  };

  // event delegation on form
  form.addEventListener("focus", setCaret, false);
  form.addEventListener("click", setCaret, false);
  form.addEventListener("keydown", clearPlaceholder, false);
  form.addEventListener("keyup", checkCharactersRange, false);
  form.addEventListener("keyup", restorePlaceholder, false);
  form.addEventListener("blur", restorePlaceholder, true);

  form.addEventListener("submit", validateForm, false);
})(window);