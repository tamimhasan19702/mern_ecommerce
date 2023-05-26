/** @format */

import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import Input from "../../components/Ui/input/Input";
import { login } from "../../actions";
import {useDispatch} from 'react-redux';


const Signin = (props) => {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [error,setError] = useState('');
  
  const dispatch = useDispatch()

  const userLogin = (e) => {
    
    e.preventDefault()

    const user = { email,password }
    
    dispatch(login(user))
   }


  return (
    <Layout>
            <Container>
                <Row style={{ marginTop: '50px' }}>
                    <Col md={{span: 6, offset: 3}}>
                        <Form onSubmit={userLogin}>
                            <Input 
                                label="Email"
                                placeholder="Email"
                                defaultValue={email || ''}
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <Input 
                                label="Password"
                                placeholder="Password"
                                defaultValue={password || ''}
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
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

export default Signin