/** @format */

import React, { useState} from "react";
import Layout from "../../components/Layout/Layout";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import Input from "../../components/Ui/input/Input";
import { useSelector } from "react-redux";

export default function Products(props) {
  const category = useSelector((state) => state.category);
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productPictures, setProductPictures] = useState("");

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }

    return options;
  };

  const handleProductPictures = (e) => {
    setProductPictures([
      ...productPictures,
      e.target.files[0]
    ]);
  }

  console.log(productPictures)

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Products</h3>
              <button onClick={handleShow}>Add</button>
            </div>
          </Col>
        </Row>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Input
            label="Name"
            value={name}
            placeholder={`Name`}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            value={quantity}
            label="Quantity"
            style={{ marginTop: "20px" }}
            type={Number}
            placeholder={`Quantity`}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <Input
            label="Price"
            value={price}
            style={{ marginTop: "20px" }}
            placeholder={`Price`}
            onChange={(e) => setPrice(e.target.value)}
          />
          <Input
            label="Description"
            value={description}
            style={{ marginTop: "20px" }}
            placeholder={`Description`}
            onChange={(e) => setDescription(e.target.value)}
          />

          <select
            className="form-control"
            style={{ marginTop: "20px" }}
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}>
            <option>select category</option>
            {createCategoryList(category.categories).map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>

          {
            productPictures.length > 0 ? productPictures.map((pic,index) => 
             <div key={index}>{pic.name}</div>
            ) : null
          }

          <Input
          style={{ marginTop: "20px" }}
          type="file"
          name="productPicture"  
          onChange={handleProductPictures}
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
