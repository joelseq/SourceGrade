import React from 'react';
import { NavLink } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

const NavigationBar = () => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <NavLink to="/">SourceGrade</NavLink>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav pullRight>
      <LinkContainer to="login">
        <NavItem eventKey={1}>Login</NavItem>
      </LinkContainer>
      <LinkContainer to="signup">
        <NavItem eventKey={2}>Sign Up</NavItem>
      </LinkContainer>
    </Nav>
  </Navbar>
);

export default NavigationBar;
