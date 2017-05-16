import React from 'react';

import FooterContainer from './Form/FooterContainer';
import Input from './Form/Input';
import Label from './Form/Label'
import RadioInput from './Form/RadioInput';
import Textarea from './Form/Textarea';

export default class From extends React.Component {
  render() {
    return (
      <form className="flex-container" id="form">
          <RadioInput className="flex-radio-input" id="flex-radio-left" type="radio" name="ticket-radio" value="1" />
          <Label className="radio-label" htmlFor="flex-radio-left" data_placeholderfor="flex-radio-left" value="1 TICKET € 109" />
          <RadioInput className="flex-radio-input" id="flex-radio-right" type="radio" name="ticket-radio" value="5"/>
          <Label className="radio-label" htmlFor="flex-radio-right" value="5 TICKET € 109" />
          <Input className="flex-item left-column input-placeholder" data_placeholder="First Name" type="text" value="" name="first_name" />
          <Input className="flex-item input-placeholder" data_placeholder="Last Name" type="text" value="" name="last_name" />
          <Textarea className="flex-item text-area left-column input-placeholder" data_placeholder="Textarea1" name="textarea_1" value="" type="text" />
          <Textarea className="flex-item text-area input-placeholder" data_placeholder="Textarea2" name="textarea_2" value="" type="text" />
          <Input className="flex-item left-column input-placeholder" data_placeholder="Email" type="text" name="email" value="" />
          <Input className="flex-item input-placeholder" data_placeholder="Password" type="password" name="password" value="" />
          <FooterContainer className="flex-item footer-container" name="footer-container" />
      </form>
    )
  }
}
