/**
 * eslint-disable eqeqeq
 *
 * @format
 */

/**
 * eslint-disable eqeqeq
 *
 * @format
 */

/**
 * eslint-disable eqeqeq
 *
 * @format
 */

/**
 * eslint-disable eqeqeq
 *
 * @format
 */

/**
 * eslint-disable eqeqeq
 *
 * @format
 */

/**
 * * title: Category component
 * * description: this component is to show all the product categories in the front end
 * * author: Tareq Monower
 * *
 *
 * @format
 */

import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, getAllCategory, updateCategories } from "../../actions";
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
import AddCategoryModal from "./components/AddCategoryModal";
import UpdateCategoriesModal from "./components/UpdateCategoriesModal";

export default function Category() {
  //taking category value fron the state
  const category = useSelector((state) => state.category);

  const [categoryName, setCategoryName] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [show, setShow] = useState(false);
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!category.loading) {
      setShow(false);
    }
  }, [category.loading]);

  //using is to open the modal form
  const handleClose = () => {
    //creating a new form object with formData function
    const form = new FormData();

    if (categoryName === "") {
      alert("Category name is required");
      setShow(false);
      return;
    }

    //appending the category name,parentId and categoryImage in the newly created form data
    form.append("name", categoryName);
    form.append("parentId", parentCategoryId);
    form.append("categoryImage", categoryImage);
    dispatch(addCategory(form));
    setCategoryName("");
    setParentCategoryId("");
    //dispatching the addCategory action here

    setShow(false);
  };

  //using this to show the category frontend when the modal form is done submitting
  const handleShow = () => setShow(true);

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

  //creating new category list with it
  const createCategoryList = (categories, options = []) => {
    //creating a empty option array as argument
    for (let category of categories) {
      //pushing category id and name in the option array
      options.push({
        value: category._id,
        name: category.name,
        parentId: category.parentId,
        type: category.type,
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
    updateCheckedAndExpandedCategories();
    setUpdateCategoryModal(true);
  };

  const updateCheckedAndExpandedCategories = () => {
    const categories = createCategoryList(category.categories);
    const checkedArray = [];
    const expandedArray = [];

    checked.length > 0 &&
      checked.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId == category.value
        );
        category && checkedArray.push(category);
      });

    expanded.length > 0 &&
      expanded.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId == category.value
        );
        category && expandedArray.push(category);
      });

    setCheckedArray(checkedArray);
    setExpandedArray(expandedArray);
  };

  const handleCategoryInput = (key, value, index, type) => {
    console.log(value);
    if (type == "checked") {
      const updatedCheckedArray = checkedArray.map((item, _index) =>
        index == _index ? { ...item, [key]: value } : item
      );
      setCheckedArray(updatedCheckedArray);
    } else if (type == "expanded") {
      const updatedExpandedArray = expandedArray.map((item, _index) =>
        index == _index ? { ...item, [key]: value } : item
      );
      setExpandedArray(updatedExpandedArray);
    }
  };

  const updateCategoriesForm = () => {
    const form = new FormData();

    expandedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });
    checkedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });
    dispatch(updateCategories(form)).then((result) => {
      if (result) {
        dispatch(getAllCategory());
      }
    });
    setUpdateCategoryModal(false);
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
      <AddCategoryModal
        show={show}
        handleClose={() => setShow(false)}
        onSubmit={handleClose}
        modalTitle={"Add New Category"}
        categoryName={categoryName}
        setCategoryName={setCategoryName}
        parentCategoryId={parentCategoryId}
        setParentCategoryId={setParentCategoryId}
        // categoryList={categoryList}
        handleCategoryImage={handleCategoryImage}
      />

      {/* category update modal */}
      <UpdateCategoriesModal
        show={updateCategoryModal}
        handleClose={() => setUpdateCategoryModal(false)}
        onSubmit={updateCategoriesForm}
        modalTitle={"Update Categories"}
        size="lg"
        expandedArray={expandedArray}
        checkedArray={checkedArray}
        handleCategoryInput={handleCategoryInput}
        // categorylist={categoryList}
      />
    </Layout>
  );
}
