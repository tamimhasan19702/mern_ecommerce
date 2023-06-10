/** @format */

import React from "react";
import Layout from "../../components/Layout/Layout";
import { Container, Row, Col } from "react-bootstrap";
import './Home.css';
import {NavLink} from "react-router-dom";

export default function Home(props) {
  return (
    <Layout>
    
      <Container fluid>
        <Row>
          <Col md={2} className="sidebar">
            <ul>

              <li><NavLink to={'/'}>Home</NavLink></li>

              <li><NavLink to={'/products'}>Products</NavLink></li>
              
              <li><NavLink to={'/orders'}>Orders</NavLink></li>

            </ul>
          </Col>
          <Col md={10} style={{marginLeft: 'auto'}}>Container</Col>
        </Row>
      </Container>
      
    </Layout>
  );
}
