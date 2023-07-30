/**
 * * title: Category component
 * * description: this component is to show all the product categories in the front end
 * * author: Tareq Monower
 * *
 *
 * @format
 */

import React, { useEffect, useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, getAllCategory } from "../../actions";
import Layout from "../../components/Layout/Layout";
import Input from "../../components/Ui/input/Input";

export default function Category() {
  //taking category value fron the state
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [categoryImage, setCategoryImage] = useState("");

  //using this to getting all the categories from the backend
  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  //rendering the categories in the frontend with this function
  const renderCategories = (categories) => {
    //blank my category
    let myCategories = [];
    for (let category of categories) {
      //pushing new category element in the blank myCategories array
      myCategories.push(
        //creating a list item and rendering category items and adding category name as the key
        <li key={category.name}>
          {category.name}
          {/* if category children exist then recall this function for it's children */}
          {category.children.length > 0 ? (
            <ul>{renderCategories(category.children)}</ul>
          ) : null}
        </li>
      );
    }

    return myCategories;
  };

  //using this to show the modal when clicked
  const handleShow = () => setShow(true);

  const handleClose = () => {
    const form = new FormData();

    form.append("name", categoryName);
    form.append("parentId", parentCategoryId);
    form.append("categoryImage", categoryImage);
    dispatch(addCategory(form));

    // const cat = {
    //   categoryName,
    //   parentCategoryId,
    //   categoryImage
    // }

    // console.log(cat)

    setShow(false);
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
  };

  return (
    //importing the default layout with the sidebar prop
    <Layout sidebar>
      {/* category container */}
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Category</h3>
              <button onClick={handleShow}>Add</button>
            </div>
          </Col>
        </Row>
        {/* redering the categories to the frontend */}
        <Row>
          <Col md={12}>
            {/* calling this renderCategory function with the category as argument we got from the redux store*/}
            <ul>{renderCategories(category.categories)}</ul>
          </Col>
        </Row>
      </Container>

      {/* category input modal item */}
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
            onChange={(e) => setParentCategoryId(e.target.value)}>
            <option>select category</option>
            {createCategoryList(category.categories).map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>

          <input
            className="form-control"
            style={{ marginTop: "20px" }}
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
