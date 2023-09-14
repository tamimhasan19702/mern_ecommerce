/** @format */
import React from "react";
import Input from "../../../components/Ui/input/Input";
import NewModal from "../../../components/Ui/model";
import { Row, Col } from "react-bootstrap";

const AddCategoryModal = (props) => {
  const {
    show,
    handleClose,
    modalTitle,
    categoryName,
    setCategoryName,
    parentCategoryId,
    setParentCategoryId,
    categoryList,
    handleCategoryImage,
    onSubmit,
  } = props;

  return (
    <NewModal
      show={show}
      handleClose={handleClose}
      ModalTitle={modalTitle}
      onSubmit={onSubmit}>
      <Row>
        <Col>
          <Input
            value={categoryName}
            placeholder={`Category Name`}
            onChange={(e) => setCategoryName(e.target.value)}
            className="form-control-sm"
          />
        </Col>

        <Col>
          <select
            className="form-control form-control-sm"
            style={{ marginTop: "20px" }}
            value={parentCategoryId}
            onChange={(e) => setParentCategoryId(e.target.value)}>
            <option>select category</option>

            {/* providing categories in the creteCategory function which retruns a option array */}
            {categoryList.map((option) => {
              return (
                <option key={option.value} value={option.value}>
                  {option.name}
                </option>
              );
            })}
          </select>
        </Col>

        <Row>
          <Col>
            {/* taking category handling image with this input */}
            <input
              className="form-control"
              style={{ marginTop: "20px" }}
              type="file"
              name="categoryImage"
              onChange={handleCategoryImage}
            />
          </Col>
        </Row>
      </Row>
    </NewModal>
  );
};

export default AddCategoryModal;
