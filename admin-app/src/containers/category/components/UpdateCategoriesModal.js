/** @format */

import React from "react";
import Input from "../../../components/Ui/input/Input";
import NewModal from "../../../components/Ui/model";
import { Row, Col } from "react-bootstrap";

const UpdateCategoriesModal = (props) => {
  const {
    show,
    handleClose,
    modalTitle,
    size,
    expandedArray,
    checkedArray,
    handleCategoryInput,
    categoryList,
    onSubmit,
  } = props;

  console.log({ expandedArray, checkedArray });

  return (
    <NewModal
      show={show}
      handleClose={handleClose}
      ModalTitle={modalTitle}
      size={size}
      onSubmit={onSubmit}>
      <Row>
        <Col>
          <h3>Expanded </h3>
        </Col>
      </Row>

      {expandedArray.length > 0 &&
        expandedArray.map((item, index) => (
          <Row key={index} style={{ marginTop: "20px" }}>
            {/* category name */}
            <Col>
              <Input
                value={item.name}
                placeholder={`Category Name`}
                onChange={(e) =>
                  handleCategoryInput("name", e.target.value, index, "expanded")
                }
              />
            </Col>

            {/* selecting the categories */}
            <Col>
              <select
                className="form-control"
                value={item.parentId}
                onChange={(e) =>
                  handleCategoryInput(
                    "parentId",
                    e.target.value,
                    index,
                    "expanded"
                  )
                }>
                <option>select category</option>

                {/* {categoryList.map((option) => {
                  return (
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  );
                })} */}
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

      <h3>Checked Categories</h3>

      {checkedArray.length > 0 &&
        checkedArray.map((item, index) => (
          <Row key={index} style={{ marginTop: "20px" }}>
            {/* category name */}
            <Col>
              <Input
                value={item.name}
                placeholder={`Category Name`}
                onChange={(e) =>
                  handleCategoryInput("name", e.target.value, index, "checked")
                }
              />
            </Col>

            {/* selecting the categories */}
            <Col>
              <select
                className="form-control"
                value={item.parentId}
                onChange={(e) =>
                  handleCategoryInput(
                    "parentId",
                    e.target.value,
                    index,
                    "checked"
                  )
                }>
                <option>select category</option>

                {/* {categoryList.map((option) => {
                  return (
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  );
                })} */}
              </select>
            </Col>

            {/* category information */}
            <Col>
              <select
                className="form-control"
                value={item.type}
                onChange={(e) =>
                  handleCategoryInput("type", e.target.value, index, "checked")
                }>
                <option value="">Select Type</option>
                <option value="store">Store</option>
                <option value="product">Product</option>
                <option value="page">page</option>
              </select>
            </Col>
          </Row>
        ))}
    </NewModal>
  );
};

export default UpdateCategoriesModal;
