import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getAllCategory } from "../../actions";
import Layout from "../../components/Layout/Layout";

export default function Category() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategory())
  
  
  },[])

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
