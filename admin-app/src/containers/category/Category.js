import React, { useEffect,useState } from "react";
import { Col, Container, Row,Modal,Button} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../actions";
import Layout from "../../components/Layout/Layout";

export default function Category() {

  const category = useSelector(state => state.category);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  useEffect(() => {
    dispatch(getAllCategory())
  
  
  },[]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const renderCategories = (categories) => {

    let myCategories = [];
    for (let category of categories){
      myCategories.push(
        <li key={category.name}>
          {category.name}
          {category.children.length > 0 ? (<ul>{renderCategories(category.children)}</ul>) : null}
        </li>
      )
    }

    return myCategories;

  }

  return (
    <Layout sidebar>
        <Container>
            <Row>
                <Col md={12}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <h3>Category</h3>
                <button onClick={handleShow}>Add</button>
                </div>
                </Col>
            </Row>
            <Row>
              <Col md={12}>
              <ul>
                {renderCategories(category.categories)}
              </ul>
              </Col>
            </Row>
        </Container>

     <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    </Layout>
  );
}
