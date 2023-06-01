/** @format */

import React from "react";
import Layout from "../../components/Layout/Layout";
import { Container, Row, Col } from "react-bootstrap";
import './Home.css'

export default function Home(props) {
  return (
    <Layout>
      <Container fluid>
        <Row>
          <Col md={2} className="sidebar">
            Sidebar
          </Col>
          <Col md={10} style={{marginLeft: 'auto'}}>Container</Col>
        </Row>
      </Container>
    </Layout>
  );
}
