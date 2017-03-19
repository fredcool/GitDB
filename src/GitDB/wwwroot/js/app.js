import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'react-bootstrap';
import Header from './header';
import ProjTable from './projtable';

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  render() {
    return (
      <div className="">
        <Header />
        <br/>
        <Button bsStyle="primary">New Project</Button>
        <br/>
        <div>
            <ProjTable />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

