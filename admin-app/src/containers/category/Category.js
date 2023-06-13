import React from "react";
import Layout from "../../components/Layout/Layout";
import { Col, Container, Row } from "react-bootstrap";

export default function Category() {
  return (
    <Layout sidebar>
        <Container>
            <Row>
                <Col>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <h3>Category</h3>
                <button>Add</button>
                </div>
                </Col>
            </Row>
        </Container>
    </Layout>
  );
}
