import React from "react";
import {Container,Nav,Navbar,} from 'react-bootstrap'

export default function Header() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
       
        <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand>

          
          <Nav>
            <Nav.Link href="#deets">Sign in</Nav.Link>
          </Nav>

      </Container>
    </Navbar>
  );
}
