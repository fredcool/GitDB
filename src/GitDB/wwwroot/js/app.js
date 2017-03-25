import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';

import { Button } from 'react-bootstrap';
import Header from './Header';
import apitest from './client/apitest';
//import fakeapi from './client/fakeapi';

import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends React.Component {

  render() {
    return (
      <div className="contianer-fluid">
        <Header />
        <br/>
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired
};

