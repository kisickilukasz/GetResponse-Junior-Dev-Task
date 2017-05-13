import React from 'react';

import RadioInput from './Form/RadioInput';
import TextInput from './Form/TextInput';

export default class From extends React.Component {
  render() {
    return (
      <form>
          <RadioInput />
          <TextInput />
      </form>
    )
  }
}
