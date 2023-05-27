import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Form,Button,Container,Row,Col } from "react-bootstrap";
import Input from "../../components/Ui/input/Input";

export default function Signup() {

  const [name,setName] = useState('halum')

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
                  onChange={() => {setName('montu')}}/>
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
