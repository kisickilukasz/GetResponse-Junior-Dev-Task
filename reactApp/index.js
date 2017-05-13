import React from 'react';
import ReactDom from 'react-dom';
import './index.css';

import Form from './components/Form';

class App extends React.Component {
  render() {
    return (
      <Form />
    )
  }
}

ReactDom.render(
  <App />,
  document.getElementById('app')
)
