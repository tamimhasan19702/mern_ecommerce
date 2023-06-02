/** @format */

import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../../actions";

export default function Header() {

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch()

  const logout = () => {
  dispatch(signout())
  }

  const renderLoggedInLinks = () => {
    return (
      <Nav>
        <li className="nav-item">
          <span className="nav-link" onClick={logout}>SignOut</span>
        </li>
      </Nav>
    );
  };

  const renderNonLoggedInLinks = () => {
    return (
      <Nav>
        <li className="nav-item">
          <NavLink to="signin" className="nav-link">
            Signin
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="signup" className="nav-link">
            Signup
          </NavLink>
        </li>
      </Nav>
    );
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      style={{ zIndex: 1 }}>
      <Container fluid>
        <Link className="navbar-brand" to="/">
          Admin Dashboard
        </Link>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end">
          <Nav className="mr-auto">

          </Nav>
          {auth.authenticate ? renderLoggedInLinks() : renderNonLoggedInLinks()}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
