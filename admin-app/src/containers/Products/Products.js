/** @format */

import React,{useState} from "react";
import Layout from "../../components/Layout/Layout";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import Input from "../../components/Ui/input/Input";

export default function Products(props) {

  const [show, setShow] = useState(false);
  const [name,setName] = useState('');
  const [quantity,setQuantity] = useState('');
  const [price,setPrice] = useState('');
  const [description,setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [productPictures, setProductPictures] = useState('');

  const handleClose = () => {
    setShow(false)
  }


  const handleShow = () => {
    setShow(true)
  };

  

  return (
  <Layout sidebar>
    

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Category</Modal.Title>
        </Modal.Header>

        <Modal.Body>

          <Input
            value={name}
            placeholder={`Product Name`}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            value={quantity}
            placeholder={`Product Quantity`}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <Input
            value={price}
            placeholder={`Product Price`}
            onChange={(e) => setPrice(e.target.value)}
          />
          <Input
            value={description}
            placeholder={`Product Description`}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            value={category}
            placeholder={`Product Category`}
            onChange={(e) => setCategory(e.target.value)}
          />
          <Input
            value={productPictures}
            placeholder={`Product Pictures`}
            onChange={(e) => setProductPictures(e.target.value)}
          />

        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
  </Layout>
  );
}
