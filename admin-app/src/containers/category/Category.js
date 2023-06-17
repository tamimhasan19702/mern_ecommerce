/** @format */

import React, { useEffect, useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../actions";
import Layout from "../../components/Layout/Layout";
import Input from "../../components/Ui/input/Input";

export default function Category() {
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [categoryImage, setCategoryImage] = useState("");

  useEffect(() => {
    dispatch(getAllCategory());
  }, []);

  const handleClose = () => {

    const form = new FormData();
    const cat = {
      categoryName,
      parentCategoryId,
      categoryImage
    }

    console.log(cat)

    setShow(false)
  };
  const handleShow = () => setShow(true);

  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push(
        <li key={category.name}>
          {category.name}
          {category.children.length > 0 ? (
            <ul>{renderCategories(category.children)}</ul>
          ) : null}
        </li>
      );
    }

    return myCategories;
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


   const handleCategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);
   }


  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Category</h3>
              <button onClick={handleShow}>Add</button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <ul>{renderCategories(category.categories)}</ul>
          </Col>
        </Row>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Category</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Input
            value={categoryName}
            placeholder={`Category Name`}
            onChange={(e) => setCategoryName(e.target.value)}
          />

          <select 
          className="form-control" 
          style={{ marginTop: "20px" }}
          value={parentCategoryId}
          onChange={(e) => setParentCategoryId(e.target.value)}
          >

            <option>select category</option>
            {createCategoryList(category.categories).map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>

            ))}
          </select>

          <input
            className="form-control"
            style={{marginTop: "20px"}}
            type="file"
            name="categoryImage"
            onChange={handleCategoryImage}
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
