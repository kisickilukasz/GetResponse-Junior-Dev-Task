import React from 'react';

export default class Input extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: props.data_placeholder}
  }

  render() {
    const props = this.props;
    return (
      <input className={props.className} id={props.id} type={props.type} name={props.name} defaultValue={this.state.value} data-placeholder={props.data_placeholder} />
    )
  }
}
