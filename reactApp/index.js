import React from 'react';
import ReactDom from 'react-dom';
import './index.css';

import MessageWrapper from './components/MessageWrapper'; 
import Form from './components/Form';

class App extends React.Component {
  render() {
    return (
      <div>
        <Form />
        <MessageWrapper />
      </div>

    )
  }
}

ReactDom.render(
  <App />,
  document.getElementById('app')
)
