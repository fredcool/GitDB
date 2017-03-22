import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import { Button } from 'react-bootstrap';
import Header from './Header';
import ProjTable from './ProjTable';
import NewProjModal from './NewProjModal';


import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {

  render() {
    return (
        <Router>
          <div className="">
            <Header />
            <br/>
            <NewProjModal />
            <br/>
            <div>
              <Route exact path="/" component={ProjTable}/>
            </div>
          </div>
        </Router>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

