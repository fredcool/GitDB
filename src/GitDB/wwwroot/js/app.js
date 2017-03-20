import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'react-bootstrap';
import Header from './Header';
import ProjTable from './ProjTable';
import NewProjModal from './NewProjModal';

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {

  render() {
    return (
      <div className="">
        <Header />
        <br/>
        <NewProjModal />
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

