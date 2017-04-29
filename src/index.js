(function (window) {

    'use strict';

    let setCheck = null;
    let messages = [];
    const form = document.getElementById('form');
    const ticket_count = document.getElementById('ticket-count');
    const radios = document.getElementsByName('ticket-radio');
    const inputs = document.querySelectorAll('[data-placeholder]');
    const messageWrapper = document.getElementsByName('message_wrapper')[0];

    // shows succsess message after submit
    const init = () => {
        const retrieved_person = localStorage.getItem("registered_person");
        const registered_person = JSON.parse(retrieved_person);
        const isSubmitted = registered_person.submitted;
        if (!isSubmitted) {
            return;
        } else {
            let message = "Form submitted successfully"
            messages.push(message);
            addElement(message);
            startSlider();
            registered_person.submitted = false;
            localStorage.setItem("registered_person", JSON.stringify(registered_person));
        }
    }

    // unchecking previously checked radio input
    for (let i = 0; i < radios.length; i++) {
        radios[i].onclick = function () {
            if (setCheck != this) {
                setCheck = this;
                ticket_count.value = this.value;
            } else {
                this.checked = false;
                setCheck = null;
                ticket_count.value = null;
            }
        }
    }

    for (let j = 0; j < inputs.length; j++) {
        var input = inputs[j];
        if (!input.value.length) {
            input.value = input.dataset.placeholder;

            if (input.type === "password") {
                input.type = "text";
            }
        }
    }

    // sets caret at the beginning of an input
    const setCaret = event => {
        let element = event.target;

        if (element.value === element.getAttribute("data-placeholder")) {
            element.setSelectionRange(0, 0);
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
        messages = [];
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

        showValidationMessage(messages);

        if (!isFormValid(messages)) {
            event.preventDefault();
        } else {
            writeToLocalStorage(elements)
        };
    }

    const writeToLocalStorage = elements => {
        const first_name = elements.first_name.value;
        const last_name = elements.last_name.value;
        const textarea_1 = elements.textarea_1.value;
        const textarea_2 = elements.textarea_2.value;
        const email = elements.email.value;
        const vid_number = elements.vid_number.value;
        const ticket_count = elements.ticket_count.value;
        const submitted = true;
        const registered_person = new RegisteredPerson(first_name, last_name, textarea_1, textarea_2, email, vid_number, ticket_count, submitted);

        localStorage.setItem("registered_person", JSON.stringify(registered_person));
        console.log(localStorage);
    }

    class RegisteredPerson {
        constructor(first_name, last_name, textarea_1, textarea_2, email, vid_number, ticket_count, submitted) {
            this.first_name = first_name;
            this.last_name = last_name;
            this.textarea_1 = textarea_1;
            this.textarea_2 = textarea_2;
            this.email = email;
            this.vid_number = vid_number;
            this.ticket_count = ticket_count;
            this.submitted = submitted;
        }
    }

    const validateInput = element => {
        let isEmpty = element.value === element.dataset.placeholder || element.value === ""
            ? true
            : false;

        let isValid = checkIfValid(element.value, regex[element.name], isEmpty);
        let message = getValidationMessage(isValid, isEmpty, element.name, element.dataset.placeholder);

        if (!message) {
            return;
        } else if (messages.indexOf(message) === -1) {
            messages.push(message);
        }
    }

    const checkIfValid = (elementValue, pattern, isEmpty) => {
        if (isEmpty) {
            return isEmpty;
        }
        return pattern.test(elementValue);
    }

    const checkCharactersRange = event => {
        if (event.keyCode === 9 || event.keyCode === 8) { // prevents event from validating when user navigates with a tab key
            return;
        }
        let element = event.target;
        let length = element.value.length;

        if ((element.name === "textarea_1" && length > 10) || (element.name === "textarea_2" && length > 20) || (element.name === "vid_number" && length > 5)) {
            validateInput(element);
            showValidationMessage(messages);

            if (messages.length === 1) { // checks if error messages is diplayed and starts the slider if true
                startSlider(event);
                form.removeEventListener("keyup", checkCharactersRange, false);
            }
        }
    }

    const getValidationMessage = (isValid, isEmpty, elementName, elementPlaceholder) => {
        if (isEmpty) {
            return elementPlaceholder !== ""
                ? `${elementPlaceholder} ${errorTemplates.inputEmpty}`
                : `Ticket input ${errorTemplates.inputEmpty}`;
        } else if (!isValid) {
            return elementPlaceholder !== ""
                ? `${elementPlaceholder} ${errorTemplates[elementName]}`
                : `Ticket input ${errorTemplates[elementName]}`;
        } else {
            return;
        }
    }

    const showValidationMessage = messages => {
        if (!messages.length) {
            return;
        } else {
            messages.forEach((message, index) => {
                setTimeout(function () {
                    checkIfMessageDisplayed(message);
                }, 100 * index)
            })
        }
    }

    const isFormValid = messages => {
        if (!messages.length) {
            return true;
        }
        return false;
    }

    // Prevents from displaying the same message again
    const checkIfMessageDisplayed = message => {
        const errorNotificationValues = Object.keys(messageWrapper.children).map(key => messageWrapper.children[key].textContent);
        const isDisplayed = errorNotificationValues.indexOf(message) > -1;
        if (!isDisplayed) {
            addElement(message)
        }
        return isDisplayed;
    }

    const addElement = message => {
        const messageContainer = document.createElement('div');
        const firstChild = messageWrapper.hasChildNodes() ? messageWrapper.firstChild : null;
        messageContainer.textContent = message;
        if (message === "Form submitted successfully") {
            messageContainer.classList.add('success-message');
            messageContainer.classList.add('fade-in');
        } else {
            messageContainer.classList.add('error-message');
            messageContainer.classList.add('fade-in');
        }
        messageWrapper.insertBefore(messageContainer, firstChild);
    }

    // After 3s checks if there are any messages displayed and starts the slider
    const startSlider = () => {
        setTimeout(function () {
            let interval = setInterval(function () {
                if (messages.length > 0) {
                    let lastChild = messageWrapper.lastChild;
                    messageWrapper.classList.add('slide-down');
                    lastChild.classList.add('fade-out');
                    setTimeout(function () {
                        messageWrapper.removeChild(lastChild);
                        messageWrapper.classList.remove('slide-down');
                        messages.shift();
                    }, 500)
                } else {
                    clearInterval(interval);
                    form.addEventListener("keyup", checkCharactersRange, false);
                    return;
                }
            }, 600)
        }, 4000)
    }

    const errorTemplates = {
        inputEmpty: "can not be empty!",
        first_name: "can not contain any numbers!",
        last_name: "can not contain any numbers!",
        textarea_1: "can not contain more than 10 characters!",
        textarea_2: "can not contain more than 20 characters!",
        email: "format has to be valid!",
        password: "has to be min 8 characters, upper letter, lower letter, number and a special character",
        vid_number: "can contain only numbers and maximum of 5 characters",
        ticket_count: "accepts values from 1 to 20!"
    }

    const regex = {
        first_name: /^\D+$/,
        last_name: /^\D+$/,
        email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/,
        textarea_1: /^.{1,10}$/,
        textarea_2: /^.{1,20}$/,
        password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/,
        vid_number: /^\d{1,5}$/,
        ticket_count: /^([1-9]|1\d|20)$/
    }

    // event delegation on form
    form.addEventListener("click", setCaret, false);
    form.addEventListener("keydown", clearPlaceholder, false);
    form.addEventListener("keyup", restorePlaceholder, false);
    form.addEventListener("keyup", checkCharactersRange, false);
    form.addEventListener("submit", validateForm, false);
    form.addEventListener("submit", startSlider, false);

    init();

})(window)
