import React from 'react';
import { PageHeader } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
  render() {
    return (
      <Link to="/">
      	<PageHeader>GitDB <small> @ITU</small></PageHeader>
      </Link>
    );
  }
}