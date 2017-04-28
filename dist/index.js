'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (window) {

  'use strict';

  var setCheck = null;
  var messages = [];
  var form = document.getElementById('form');
  var ticket_count = document.getElementById('ticket-count');
  var radios = document.getElementsByName('ticket-radio');
  var inputs = document.querySelectorAll('[data-placeholder]');
  var messageWrapper = document.getElementsByName('message_wrapper')[0];

  // shows succsess message after submit
  var init = function init() {
    var retrieved_person = localStorage.getItem("registered_person");
    var registered_person = JSON.parse(retrieved_person);
    var isSubmitted = registered_person.submitted;
    if (!isSubmitted) {
      return;
    } else {
      var message = "Form submitted successfully";
      messages.push(message);
      addElement(message);
      startSlider();
      registered_person.submitted = false;
      localStorage.setItem("registered_person", JSON.stringify(registered_person));
    }
  };

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
    messages = [];
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

    showValidationMessage(messages);

    if (!isFormValid(messages)) {
      event.preventDefault();
    } else {
      writeToLocalStorage(elements);
    };
  };

  var writeToLocalStorage = function writeToLocalStorage(elements) {
    var first_name = elements.first_name.value;
    var last_name = elements.last_name.value;
    var textarea_1 = elements.textarea_1.value;
    var textarea_2 = elements.textarea_2.value;
    var email = elements.email.value;
    var vid_number = elements.vid_number.value;
    var ticket_count = elements.ticket_count.value;
    var submitted = true;
    var registered_person = new RegisteredPerson(first_name, last_name, textarea_1, textarea_2, email, vid_number, ticket_count, submitted);

    localStorage.setItem("registered_person", JSON.stringify(registered_person));
    console.log(localStorage);
  };

  var RegisteredPerson = function RegisteredPerson(first_name, last_name, textarea_1, textarea_2, email, vid_number, ticket_count, submitted) {
    _classCallCheck(this, RegisteredPerson);

    this.first_name = first_name;
    this.last_name = last_name;
    this.textarea_1 = textarea_1;
    this.textarea_2 = textarea_2;
    this.email = email;
    this.vid_number = vid_number;
    this.ticket_count = ticket_count;
    this.submitted = submitted;
  };

  var validateInput = function validateInput(element) {
    var isEmpty = element.value === element.dataset.placeholder || element.value === "" ? true : false;
    var isValid = checkIfValid(element.value, regex[element.name], isEmpty);
    var message = getValidationMessage(isValid, isEmpty, element.name, element.dataset.placeholder);
    if (!message) {
      return;
    } else if (messages.indexOf(message) === -1) {
      messages.push(message);
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
    var length = element.value.length;
    if (element.name === "textarea_1" && length > 10 || element.name === "textarea_2" && length > 20 || element.name === "vid_number" && length > 5) {
      validateInput(element);
      showValidationMessage(messages);
      if (messages.length === 1) {
        // checks if error messages is diplayed and starts the slider if true
        startSlider(event);
        form.removeEventListener("keyup", checkCharactersRange, false);
      }
    }
  };

  var getValidationMessage = function getValidationMessage(isValid, isEmpty, elementName, elementPlaceholder) {
    if (isEmpty) {
      return elementPlaceholder !== "" ? elementPlaceholder + ' ' + errorTemplates.inputEmpty : 'Ticket input ' + errorTemplates.inputEmpty;
    } else if (!isValid) {
      return elementPlaceholder !== "" ? elementPlaceholder + ' ' + errorTemplates[elementName] : 'Ticket input ' + errorTemplates[elementName];
    } else {
      return;
    }
  };

  var showValidationMessage = function showValidationMessage(messages) {
    if (!messages.length) {
      return;
    } else {
      messages.forEach(function (message, index) {
        setTimeout(function () {
          checkIfMessageDisplayed(message);
        }, 100 * index);
      });
    }
  };

  var isFormValid = function isFormValid(messages) {
    if (!messages.length) {
      return true;
    }
    return false;
  };

  // Prevents from displaying the same message again
  var checkIfMessageDisplayed = function checkIfMessageDisplayed(message) {
    var errorNotificationValues = Object.keys(messageWrapper.children).map(function (key) {
      return messageWrapper.children[key].textContent;
    });
    var isDisplayed = errorNotificationValues.indexOf(message) > -1;
    if (!isDisplayed) {
      addElement(message);
    }
    return isDisplayed;
  };

  var addElement = function addElement(message) {
    var messageContainer = document.createElement('div');
    var firstChild = messageWrapper.hasChildNodes() ? messageWrapper.firstChild : null;
    messageContainer.textContent = message;
    if (message === "Form submitted successfully") {
      messageContainer.classList.add('success-message', 'fade-in');
    } else {
      messageContainer.classList.add('error-message', 'fade-in');
    }
    messageWrapper.insertBefore(messageContainer, firstChild);
  };

  // After 3s checks if there are any messages displayed and starts the slider
  var startSlider = function startSlider() {
    setTimeout(function () {
      var interval = setInterval(function () {
        if (messages.length > 0) {
          var lastChild = messageWrapper.lastChild;
          messageWrapper.classList.add('slide-down');
          lastChild.classList.add('fade-out');
          setTimeout(function () {
            messageWrapper.removeChild(lastChild);
            messageWrapper.classList.remove('slide-down');
            messages.shift();
            console.log(messages);
          }, 500);
        } else {
          clearInterval(interval);
          form.addEventListener("keyup", checkCharactersRange, false);
          return;
        }
      }, 600);
    }, 4000);
  };

  var errorTemplates = {
    inputEmpty: "can not be empty!",
    first_name: "can not contain any numbers!",
    last_name: "can not contain any numbers!",
    textarea_1: "can not contain more than 10 characters!",
    textarea_2: "can not contain more than 20 characters!",
    email: "format has to be valid!",
    password: "has to be min 8 characters, upper letter, lower letter, number and a special character",
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
  form.addEventListener("submit", startSlider, false);

  init();
})(window);