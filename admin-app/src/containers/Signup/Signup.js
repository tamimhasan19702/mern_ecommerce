import React from "react";
import Layout from "../../components/Layout/Layout";
import { Form,Button,Container,Row,Col } from "react-bootstrap";
import Input from "../../components/Ui/input/Input";

export default function Signup() {
  return (
    <Layout>
      <Container>
        <Row style={{marginTop: '50px'}}>
          <Col md={{span: 6, offset: 3 }}>
            <Form >
         
             <Row>
              <Col md={6}>
                  <Input 
                  label="First name"
                  placeholder="First name"
                  value=""
                  type="text"
                  onChange={() => {}}/>
              </Col>
              <Col md={6}>
              <Input 
                  label="Last name"
                  placeholder="Last name"
                  value=""
                  type="text"
                  onChange={() => {}}/>
              </Col>
             </Row>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
