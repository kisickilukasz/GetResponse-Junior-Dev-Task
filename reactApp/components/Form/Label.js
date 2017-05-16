import React from 'react';

export default class Label extends React.Component {
  render() {
    const props = this.props;
    return (
      <label className={props.className} htmlFor={props.htmlFor}>{props.value}</label>
    )
  }
}
