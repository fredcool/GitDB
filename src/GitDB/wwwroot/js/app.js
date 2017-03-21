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
import ProjDetail from './ProjDetail';


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
            <p><Link to="/projdetail">Project Detail Test</Link></p>
            <div>
              <Route exact path="/" component={ProjTable}/>
              <Route path="/projdetail" component={ProjDetail}/>
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

