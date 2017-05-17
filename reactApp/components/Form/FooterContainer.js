import React from 'react';

import Input from './Input';
import Span from './Span';

export default class FooterContainer extends React.Component {
  render() {
    const props = this.props;
    return (
      <div className={props.className} name={props.name} title={props.title}>
        <Input className="flex-item input-placeholder" id="vid-number" data_placeholder="Vid Number" type="text" name="vid_number" value="" />
        <Input id="ticket-count" type="text" name="ticket_count" value="" data_placeholder="" />
        <Span id="ticket-count-label" value="*Number of tickets" />
        <Input className="flex-item submit-button" data_placeholder="REGISTER" type="submit" />
      </div>
    )
  }
}
