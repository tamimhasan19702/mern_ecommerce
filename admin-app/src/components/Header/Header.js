/** @format */

import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../../actions";

<<<<<<< HEAD
export default function Header(props) {
  
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(signout());
  };
=======
export default function Header() {

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch()

  const logout = () => {
  dispatch(signout())
  }
>>>>>>> 6b88e76aa9671c4029d5c0011f1eb027164f1610

  const renderLoggedInLinks = () => {
    return (
      <Nav>
        <li className="nav-item">
<<<<<<< HEAD
          <span className="nav-link" onClick={logout}>
            SignOut
          </span>
=======
          <span className="nav-link" onClick={logout}>SignOut</span>
>>>>>>> 6b88e76aa9671c4029d5c0011f1eb027164f1610
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
<<<<<<< HEAD
    <>
=======
>>>>>>> 6b88e76aa9671c4029d5c0011f1eb027164f1610
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

<<<<<<< HEAD

=======
>>>>>>> 6b88e76aa9671c4029d5c0011f1eb027164f1610
          </Nav>
          {auth.authenticate ? renderLoggedInLinks() : renderNonLoggedInLinks()}
        </Navbar.Collapse>
      </Container>
    </Navbar>
<<<<<<< HEAD
    {props.children}
    </>
=======
>>>>>>> 6b88e76aa9671c4029d5c0011f1eb027164f1610
  );
}
