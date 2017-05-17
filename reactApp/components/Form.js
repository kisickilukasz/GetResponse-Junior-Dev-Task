import React from 'react';

import FooterContainer from './Form/FooterContainer';
import Input from './Form/Input';
import Label from './Form/Label'
import RadioInput from './Form/RadioInput';
import Textarea from './Form/Textarea';

export default class From extends React.Component {
  constructor(props) {
    super(props);
    this.messages = [];

    this.regex = {
        first_name: /^\D+$/,
        last_name: /^\D+$/,
        email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/,
        textarea_1: /^.{1,10}$/,
        textarea_2: /^.{1,20}$/,
        password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/,
        vid_number: /^\d{1,5}$/,
        ticket_count: /^([1-9]|1\d|20)$/
    }

    this.errorTemplates = {
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

    this.handleClickEvent = this.handleClickEvent.bind(this);
    this.clearPlaceholder = this.clearPlaceholder.bind(this);
    this.restorePlaceholder = this.restorePlaceholder.bind(this);
    this.getNodesForValidation = this.getNodesForValidation.bind(this);
  }

  handleClickEvent(event) {
    const element = event.target;
    if (element.name === "ticket-radio") {
      this.handleRadioChecks(element, event);
    } else {
        this.setCaret(event);
    }
  }

  handleRadioChecks(element, event) {
    if (this.setCheck != element) {
        this.setCheck = element;
        this.setTicketCountValue(event, this.setCheck);
    } else {
        element.checked = false;
        this.setCheck = null;
        this.setTicketCountValue(event, this.setCheck);
    }
  }

  setTicketCountValue(event, setCheck) {
    const element = event.currentTarget.children["footer-container"].children["ticket_count"];
    if (!setCheck) {
      element.value = null;
    } else {
      element.value = event.target.value;
    }
  }

  setCaret(event) {
    const element = event.target;
    if (element.value === element.getAttribute("data-placeholder") && element.type !== "submit") {
        element.setSelectionRange(0, 0);
    }
  }

  clearPlaceholder(event){
    const element = event.target;
    if (event.key.length > 1) {
        return;
    }

    if (element.value === element.getAttribute("data-placeholder")) {
        this.setPasswordInputType(element);
        element.value = "";
        this.removeClassFromPlaceholder(element);
    }
  }

  restorePlaceholder(event) {
    const element = event.target;

    if (element.value !== element.getAttribute("data-placeholder") && element.value === "") {
        this.setPasswordInputType(element);
        element.value = element.getAttribute("data-placeholder");
        this.addClassToPaceholder(element);
        this.setCaret(event);
    }
    this.setCaret(event);
  }

  setPasswordInputType(element) {
    if (element.getAttribute("data-placeholder") === "Password" && element.value === "") {
        element.type = "text";
    };

    if (element.getAttribute("data-placeholder") === "Password" && element.value !== "") {
        element.type = "password";
    };
  }

  addClassToPaceholder(element) {
    if (element.name === "ticket_count") {
        return
    } else {
        element.classList.add("input-placeholder");
    }
  }

  removeClassFromPlaceholder(element) {
    element.classList.remove("input-placeholder");
  }

  getNodesForValidation(event) {
    this.messages = [];
    const formChildNodes = event.currentTarget.childNodes;
    const elements = this.getNodes(formChildNodes);

    elements.forEach( element => {
      this.validateInput(element);
    })

    this.showValidationMessage(this.messages);

    event.preventDefault();
  }

  getNodes(childNodes) {
    const nodes = []
    childNodes.forEach( node => {
      if (node.title === "footer-container") {
        node.childNodes.forEach( node => {
          nodes.push(node);
        })
      } else {
        nodes.push(node);
      }
    })
    return nodes;
  }

  validateInput(element) {
    if (element.type === "text" || element.type === "textarea") {
      let isEmpty = element.value === element.dataset.placeholder || element.value === ""
          ? true
          : false;

      let isValid = this.checkIfValid(element.value, this.regex[element.name], isEmpty);
      let message = this.getValidationMessage(isValid, isEmpty, element.dataset.placeholder);

      if (!message) {
          return;
      } else if (this.messages.indexOf(message) === -1) {
          this.messages.push(message);
      }
    }
  }

  checkIfValid(elementValue, pattern, isEmpty) {
    if (isEmpty) {
        return isEmpty;
    }
    return pattern.test(elementValue);
  }

  getValidationMessage(isValid, isEmpty, elementPlaceholder) {
    if (isEmpty) {
        return elementPlaceholder !== ""
            ? `${elementPlaceholder} ${this.errorTemplates.inputEmpty}`
            : `Ticket input ${this.errorTemplates.inputEmpty}`;
    } else if (!isValid) {
        return elementPlaceholder !== ""
            ? `${elementPlaceholder} ${this.errorTemplates[elementName]}`
            : `Ticket input ${this.errorTemplates[elementName]}`;
    } else {
        return;
    }
  }

  showValidationMessage(messages) {
    if (!messages.length) {
        return;
    } else {
        messages.forEach((message, index) => {
            setTimeout( () => {
                this.checkIfMessageDisplayed(message);
            }, 100 * index)
        })
    }
  }

  checkIfMessageDisplayed(message) {
    console.log(this);
  }

  render() {
    return (
      <form
        className="flex-container"
        id="form" onFocus={this.setCaret}
        onClick={this.handleClickEvent}
        onKeyDown={this.clearPlaceholder}
        onKeyUp={this.restorePlaceholder}
        onSubmit={this.getNodesForValidation}>
          <RadioInput className="flex-radio-input" id="flex-radio-left" type="radio" name="ticket-radio" value="1" />
          <Label className="radio-label" htmlFor="flex-radio-left" data_placeholderfor="flex-radio-left" value="1 TICKET € 109" />
          <RadioInput className="flex-radio-input" id="flex-radio-right" type="radio" name="ticket-radio" value="5"/>
          <Label className="radio-label" htmlFor="flex-radio-right" value="5 TICKET € 109" />
          <Input className="flex-item left-column input-placeholder" data_placeholder="First Name" type="text" value="" name="first_name" />
          <Input className="flex-item input-placeholder" data_placeholder="Last Name" type="text" value="" name="last_name" />
          <Textarea className="flex-item text-area left-column input-placeholder" data_placeholder="Textarea1" name="textarea_1" value="" type="text" />
          <Textarea className="flex-item text-area input-placeholder" data_placeholder="Textarea2" name="textarea_2" value="" type="text" />
          <Input className="flex-item left-column input-placeholder" data_placeholder="Email" type="text" name="email" value="" />
          <Input className="flex-item input-placeholder" data_placeholder="Password" type="text" name="password" value="" />
          <FooterContainer className="flex-item footer-container" name="footer-container" title="footer-container" />
      </form>
    )
  }
}
