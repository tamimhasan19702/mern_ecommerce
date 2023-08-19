/**
 * * title: Category component
 * * description: this component is to show all the product categories in the front end
 * * author: Tareq Monower
 * *
 *
 * @format
 */

import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "../../actions";
import Layout from "../../components/Layout/Layout";
import Input from "../../components/Ui/input/Input";
import NewModal from "../../components/Ui/model";

export default function Category() {
  //taking category value fron the state
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [categoryImage, setCategoryImage] = useState("");

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

  //using this to show the category frontend when the modal form is done submitting
  const handleShow = () => setShow(true);

  //using is to open the modal form
  const handleClose = () => {
    //creating a new form object with formData function
    const form = new FormData();

    //appending the category name,parentId and categoryImage in the newly created form data
    form.append("name", categoryName);
    form.append("parentId", parentCategoryId);
    form.append("categoryImage", categoryImage);
    setCategoryName("");
    setParentCategoryId("");
    //dispatching the addCategory action here
    dispatch(addCategory(form));

    setShow(false);
  };

  //creating new category list with it
  const createCategoryList = (categories, options = []) => {
    //creating a empty option array as argument
    for (let category of categories) {
      //pushing category id and name in the option array
      options.push({ value: category._id, name: category.name });
      //if category children exist then doing the same thing for them
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }

    //returning the options array
    return options;
  };

  //handeling the category images here
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
              <button variant="primary" onClick={handleShow}>Add</button>
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

      <NewModal
        show={show}
        handleClose={handleClose}
        ModalTitle={"Add New Category"}>
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

          {/* providing categories in the creteCategory function which retruns a option array */}
          {createCategoryList(category.categories).map((option) => (
            //mapping through the option array and inserting each all the array's name value
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>

        {/* taking category handling image with this input */}
        <input
          className="form-control"
          style={{ marginTop: "20px" }}
          type="file"
          name="categoryImage"
          onChange={handleCategoryImage}
        />
      </NewModal>
    </Layout>
  );
}
