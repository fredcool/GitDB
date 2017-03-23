import React from 'react';
import { PageHeader } from 'react-bootstrap';
//import { Link } from 'react-router-dom';
import { Link, IndexLink } from 'react-router';

export default class Header extends React.Component {

  render() {
    const baseUrl = "/src/GitDB/wwwroot/";
    
    return (
      <div className="container">
        <IndexLink to={baseUrl} 
          activeClassName="active">
          <PageHeader>GitDB <small> @ITU</small></PageHeader>
        </IndexLink>
      </div>
    );
  }
}