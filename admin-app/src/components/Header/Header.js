import React from "react";
import {Container,Nav,Navbar,} from 'react-bootstrap'
import {NavLink,Link} from "react-router-dom"

export default function Header() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
       
        <Link className="navbar-brand" to="/">Admin Dashboard</Link>
         
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
          <Nav>
            <li className="nav-item">
               <NavLink to="signin" className="nav-link">Signin</NavLink>
            </li>
            <li className="nav-item">
               <NavLink to="signup" className="nav-link">Signup</NavLink>
            </li>
          </Nav>
          </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}
