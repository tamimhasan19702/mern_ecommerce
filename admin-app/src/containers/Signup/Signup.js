import React,{useState} from "react";
import Layout from "../../components/Layout/Layout";
import { Form,Button,Container,Row,Col } from "react-bootstrap";
import Input from "../../components/Ui/input/Input";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../actions";

const Signup = (props) => {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error,setError] = useState('')
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const userSignup = (e) => {

    e.preventDefault()
   const user = {
    firstName,lastName,email,password
   } 

   dispatch(Signup(user))
  }

  if (auth.authenticate) {
    return <Redirect to={"/"} />;
  }

  return (
    <Layout>
      <Container>
        <Row style={{marginTop: '50px'}}>
          <Col md={{span: 6, offset: 3 }}>
            <Form  onSubmit={userSignup}>
         
             <Row>
              <Col md={6}>
                  <Input 
                  label="First name"
                  placeholder="First name"
                  value={firstName}
                  type="text"
                  onChange={(e) => setFirstName(e.target.value)}/>
              </Col>
              <Col md={6}>
              <Input 
                  label="Last name"
                  placeholder="Last name"
                  value={lastName}
                  type="text"
                  onChange={(e) => setLastName(e.target.value)}/>
              </Col>
             </Row>

            
            <Input 
            label="Email"
            placeholder="Email"
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            />

            <Input 
            label="Password"
            placeholder="Password"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            />
            
            <Button variant="primary" type="submit" style={{marginTop: "20px"}}>
              Submit
            </Button>
          </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default Signup