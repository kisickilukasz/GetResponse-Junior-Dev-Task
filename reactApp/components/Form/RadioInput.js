import React from 'react';

export default class RadioInput extends React.Component {
  render() {
    const props = this.props;
    return (
      <input className={props.className} id={props.id} type={props.type} name={props.name} value={props.value} />
    )
  }
}
