import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'react-bootstrap';
import Header from './header';

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  render() {
    return (
      <div className="">
        <Header />
        <br/>
        <Button bsStyle="primary">Primary</Button>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

