/** @format */

import React from "react";
import Header from "../Header/Header";
import { Container, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function Layout(props) {
  return (
    <>
      <Header> 
<<<<<<< HEAD
       
=======

>>>>>>> 6b88e76aa9671c4029d5c0011f1eb027164f1610
        {
        props.sidebar ? (
          <Container fluid>
            <Row>
              <Col md={2} className="sidebar">
                <ul>
                  <li>
                    <NavLink to={"/"}>Home</NavLink>
                  </li>
                  <li>
                    <NavLink to={"/products"}>Products</NavLink>
                  </li>
                  <li>
                    <NavLink to={"/orders"}>Orders</NavLink>
                  </li>
                </ul>
              </Col>
              <Col md={10} style={{ marginLeft: "auto" }}>
                {props.children}
              </Col>
            </Row>
          </Container>
        ) : (
          props.children
        )
        }

      </Header>
    </>
  );
}
