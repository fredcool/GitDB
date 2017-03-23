import React from 'react';
import { PageHeader } from 'react-bootstrap';
//import { Link } from 'react-router-dom';
import { Link, IndexLink } from 'react-router';

export default class Header extends React.Component {
  render() {
    return (
      <div className="container">
        <IndexLink to="/" 
          activeClassName="active">
          <PageHeader>GitDB <small> @ITU</small></PageHeader>
        </IndexLink>
      </div>
    );
  }
}