/** @format */

import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import Input from "../../components/Ui/input/Input";
import { login } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

function Signin(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const userLogin = async (e) => {
    e.preventDefault();

    const user = {
      email: email,
      password: password,
    };

    dispatch(login(user));
  };

  if (auth.authenticate) {
    return <Redirect to={"/"} />;
  }

  return (
    <Layout>
      <Container>
        <Row style={{ marginTop: "50px" }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={userLogin}>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                label="Email"
                placeholder="Email"
                value={email}
              />

              <Input
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                placeholder="Password"
                value={password}
                type="password"
              />
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
        {error && <p>{error}</p>}
      </Container>
    </Layout>
  );
}

export default Signin;
