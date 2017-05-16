import React from 'react';

export default class Span extends React.Component {
  render() {
    const props = this.props;
    return (
      <span id={props.id}>{props.value}</span>
    )
  }
}
