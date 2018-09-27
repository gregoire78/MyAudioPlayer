/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Navbar, Nav } from 'react-bootstrap';
import s from './Header.css';
import Link from '../Link';
//  import Navigation from '../Navigation';
//  import logoUrl from './logo-small.png';
//  import logoUrl2x from './logo-small@2x.png';

class Header extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect bg="dark" expand="lg" variant="dark">
        <Navbar.Brand href="/" as={Link} to="/">Greguardo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/about" as={Link} to="/about">About</Nav.Link>
            <Nav.Link href="/contact" as={Link} to="/contact">Contact</Nav.Link>
            <Nav.Link href="/login" as={Link} to="/login">Login</Nav.Link>
            <Nav.Link href="/register" as={Link} to="/register">Signin</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default withStyles(s)(Header);
