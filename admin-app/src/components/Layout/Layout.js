/**
 * * title: Layout component
 * * description: this is the primary Layout to hold the header and sidebar of the frontend
 * * author: Tareq Monower
 * *
 *
 * @format
 */

import React from "react";
import Header from "../Header/Header";
import { Container, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./Layout.css";

//layout function with a prop
export default function Layout(props) {
  return (
    <>
      {/* inserting the header */}
      <Header />
      {/* if prop sidebar true then show all the element in the sidebar or else show prop children */}
      {props.sidebar ? (
        <Container fluid>
          <Row>
            <Col md={2} className="sidebar">
              <ul>
                <li>
                  <NavLink to={"/"}>Home</NavLink>
                </li>
                <li>
                  <NavLink to={"/category"}>Category</NavLink>
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
              {/* if there's any sub category show those */}
              {props.children}
            </Col>
          </Row>
        </Container>
      ) : (
        props.children
      )}
    </>
  );
}
