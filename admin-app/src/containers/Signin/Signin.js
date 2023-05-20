/** @format */

import React from "react";
import Layout from "../../components/Layout/Layout";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import Input from "../../components/Ui/input/Input";
import { login } from "../../actions";

export default function Signin() {

   const userLogin = (e) => {
    e.preventDefault()
    const user = {
      email: 'User@gmail.com',
      password: '1234567890'
    }
    login(user)
   }


  return (
    <Layout>
      <Container>
        <Row style={{ marginTop: "50px" }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={userLogin}> 
              <Input
                label="Email"
                placeholder="Email"
                value=""
                type="email"
                onChange={() => {}}
              />

              <Input
                label="Password"
                placeholder="Password"
                value=""
                type="password"
                onChange={() => {}}
              />

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
