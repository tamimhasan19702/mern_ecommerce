/* eslint-disable eqeqeq */
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
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import {
  IoIosCheckbox,
  IoIosCheckboxOutline,
  IoIosArrowForward,
  IoIosArrowDown,
  IoIosAddCircleOutline,
} from "react-icons/io";

export default function Category() {
  //taking category value fron the state
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);

  //rendering the categories in the frontend with this function
  const renderCategories = (categories) => {
    //blank my category
    let myCategories = [];
    for (let category of categories) {
      //pushing new category element in the blank myCategories array
      myCategories.push({
        label: category.name,
        value: category._id,
        children:
          category.children.length > 0 && renderCategories(category.children),
      });
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
      options.push({
        value: category._id,
        name: category.name,
        parentId: category.parentId,
      });
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

  const updateCategory = () => {
    setUpdateCategoryModal(true);
    const categories = createCategoryList(category.categories);
    const checkedArray = [];
    const expandedArray = [];

    checked.length > 0 &&
      checked.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId === category.value
        );
        category && checkedArray.push(category);
      });

    expanded.length > 0 &&
      expanded.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId === category.value
        );
        category && expandedArray.push(category);
      });
    setCheckedArray(checkedArray);
    setExpandedArray(expandedArray);

    console.log({ checked, expanded, categories, checkedArray, expandedArray });
  };


  const handleCategoryInput = (key, value, index, type) => {
    if(type == "checked"){
      const updatedCheckedArray = checkedArray.map((item, _index) => index == _index ? {...item, [key]: value} : item );
      setCheckedArray(updatedCheckedArray);
    }else if(type == "expanded"){
      const updatedExpandedArray = expandedArray.map((item, _index) => index == _index ? {...item, [key]: value} : item );
      setExpandedArray(updatedExpandedArray);
    }
  }

  return (
    //importing the default layout with the sidebar prop
    <Layout sidebar>
      {/* category container */}
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Category</h3>
              <button variant="primary" onClick={handleShow}>
                Add
              </button>
            </div>
          </Col>
        </Row>
        {/* redering the categories to the frontend */}
        <Row>
          <Col md={12}>
            {/* calling this renderCategory function with the category as argument we got from the redux store
            <ul>{renderCategories(category.categories)}</ul> */}

            <CheckboxTree
              nodes={renderCategories(category.categories)}
              checked={checked}
              expanded={expanded}
              onCheck={(checked) => setChecked(checked)}
              onExpand={(expanded) => setExpanded(expanded)}
              icons={{
                check: <IoIosCheckbox />,
                uncheck: <IoIosCheckboxOutline />,
                halfCheck: <IoIosAddCircleOutline />,
                expandClose: <IoIosArrowForward />,
                expandOpen: <IoIosArrowDown />,
              }}
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <button>Delete</button>
            <button onClick={() => updateCategory()}>Edit</button>
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

      {/* Edit Category */}

      <NewModal
        show={updateCategoryModal}
        handleClose={() => setUpdateCategoryModal(true)}
        ModalTitle={"Update Category"}
        size="lg">
        <Row>
          <Col>
            <h6>Expanded</h6>
          </Col>
        </Row>

        {expandedArray.length > 0 &&
          expandedArray.map((item, index) => (
            <Row key={index} style={{marginTop: "20px"}}>
              {/* category name */}
              <Col>
                <Input
                  value={item.name}
                  placeholder={`Category Name`}
                  onChange={(e) => handleCategoryInput('name', e.target.value, index, 'checked')}
                />
              </Col>

              {/* selecting the categories */}
              <Col>
                <select
                  className="form-control"
                  value={item.parentId}
                  onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'checked')}>
                  <option>select category</option>

                  {/* providing categories in the createCategoryList function which returns an option array */}
                  {createCategoryList(category.categories).map((option) => (
                    // mapping through the option array and inserting each of the array's name value
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </Col>

              {/* category information */}
              <Col>
                <select className="form-control">
                  <option value="">Select Type</option>
                  <option value="store">Store</option>
                  <option value="product">Product</option>
                  <option value="page">page</option>
                </select>
              </Col>
            </Row>
          ))}

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
