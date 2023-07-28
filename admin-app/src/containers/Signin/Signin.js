/**
 * * title: Signin component
 * * description: Signin component in the react frontend
 * * author: Tareq Monower
 * *
 *
 * @format
 */

//* dispatcher is like courier service which delivers actions or information throughout the app

import React, {  useState } from "react";
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

  //taking the auth state from the redux store
  const auth = useSelector((state) => state.auth);

  // using dispath to dispatch action
  const dispatch = useDispatch();

  //user Login function
  const userLogin = (e) => {
    //preventing default event behaviour
    e.preventDefault();

    // creating user object
    const user = {
     email,
     password
    };

    //executing the login function from action and dispatching it
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
              <Button
                variant="primary"
                type="submit"
                style={{ marginTop: "20px" }}>
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
