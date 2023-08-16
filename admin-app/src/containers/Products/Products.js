/* eslint-disable react/jsx-no-comment-textnodes */
/**
 * * title: Product component
 * * description: Product component used to display product items in the frontend
 * * author: Tareq Monower
 * *
 *
 * @format
 */

import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Table, Col, Container, Row } from "react-bootstrap";
import Input from "../../components/Ui/input/Input";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../actions";
import NewModal from "../../components/Ui/model";
import './style.css'
import { generatePublicUrl } from "../../urlConfig";


/**
 * Renders the Products component.
 *
 * @param {Object} props - The props object containing the data passed to the component.
 * @returns {JSX.Element} The rendered Products component.
 */

export default function Products(props) {
  //taking category values from the redux state
  const category = useSelector((state) => state.category);
  const product = useSelector((state) => state.product);

  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productPictures, setProductPictures] = useState("");
  const [productDetailModal, setProductDetailModal] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const dispatch = useDispatch();


    /**
   * Handles the close event.
   *
   * @return {undefined} 
   */
  const handleClose = () => {
    // Create a new FormData object to store the form data.
    const form = new FormData();
  
    // Append the name, quantity, price, description, and category to the form data.
    form.append("name", name);
    form.append("quantity", quantity);
    form.append("price", price);
    form.append("description", description);
    form.append("category", categoryId);
  
    // Append each product picture to the form data.
    for (let pic of productPictures) {
      form.append("productPicture", pic);
    }
  
    // Dispatch the add product action with the new form data.
    dispatch(addProduct(form));
  
    // Hide the form.
    setShow(false);
  };
  
/**
 * Sets the show state to true.
 */
const handleShow = () => {
  setShow(true);
};

/**
 * Recursively creates a list of categories and their IDs and names.
 * 
 * @param {Array} categories - The array of category objects.
 * @param {Array} options - The array to store the category options.
 * @returns {Array} - The updated options array.
 */
const createCategoryList = (categories, options = []) => {
  for (let category of categories) {
    options.push({ value: category._id, name: category.name });

    if (category.children?.length > 0) {
      createCategoryList(category.children, options);
    }
  }

  return options;
};

/**
 * Add a product picture to the productPictures array.
 * @param {Event} e - The event triggered by the user.
 */
const handleProductPictures = (e) => {
  setProductPictures([...productPictures, e.target.files[0]]);
};

/**
 * Renders the products in the frontend.
 * 
 * @returns {JSX.Element} The table element containing the rendered products.
 */
/**
 * Renders the products in the frontend.
 * 
 * @returns {JSX.Element} The table element containing the rendered products.
 */
const renderProducts = () => {
  return (
    // Create a table with responsive style and font size 12
    <Table style={{ fontSize: 12 }} responsive="sm">
      <thead>
        <tr>
          <th>#</th> 
          <th>Name</th> 
          <th>Price</th> 
          <th>Quantity</th> 
          <th>Category</th> 
          <th>Actions</th> 
        </tr>
      </thead>
      <tbody>
        {/* Check if there are products */}
        {product.products.length > 0
          ? // Render each product as a table row
            product.products.map((product) => (
              <tr
                key={product._id}
                onClick={() => showProductDetailModal(product)}
              >
                <td>1</td> 
                <td>{product.name}</td> 
                <td>{product.price}</td> 
                <td>{product.quantity}</td> 
                <td>--</td> 
              </tr>
            ))
          : 
            null}
      </tbody>
    </Table>
  );
};

/**
 * Renders the modal for adding a new product.
 *
 * @return {JSX.Element} The modal component.
 */
const renderAddProductModal = () => {
  return (
    // Render the modal for adding a new product
    <NewModal
      show={show}
      handleClose={handleClose}
      ModalTitle={"Add New Product"}
    >
      {/* Input for the product name */}
      <Input
        label="Name"
        value={name}
        placeholder={`Name`}
        onChange={(e) => setName(e.target.value)}
      />

      {/* Input for the product quantity */}
      <Input
        value={quantity}
        label="Quantity"
        style={{ marginTop: "20px" }}
        type={Number}
        placeholder={`Quantity`}
        onChange={(e) => setQuantity(e.target.value)}
      />

      {/* Input for the product price */}
      <Input
        label="Price"
        value={price}
        style={{ marginTop: "20px" }}
        placeholder={`Price`}
        onChange={(e) => setPrice(e.target.value)}
      />

      {/* Input for the product description */}
      <Input
        label="Description"
        value={description}
        style={{ marginTop: "20px" }}
        placeholder={`Description`}
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* Dropdown for selecting the product category */}
      <select
        className="form-control"
        style={{ marginTop: "20px" }}
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
      >
        <option>select category</option>
        {createCategoryList(category.categories).map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>

      {/* Display the names of the product pictures */}
      {productPictures.length > 0 ? (
        productPictures.map((pic, index) => (
          <div key={index}>{pic.name}</div>
        ))
      ) : (
        // Show nothing if there are no product pictures
        null
      )}

      {/* Input for uploading product pictures */}
      <Input
        style={{ marginTop: "20px" }}
        type="file"
        name="productPicture"
        onChange={handleProductPictures}
      />
    </NewModal>
  );
};

/**
 * Show product detail modal and set the product details.
 * @param {Object} product - The product object.
 */
const showProductDetailModal = (product) => {
  // Set the product details
  setProductDetails(product);
  
  // Show the product detail modal
  setProductDetailModal(true);
};

/**
 * Close the product detail modal.
 */
const handleCloseProductDetailModal = () => {
  setProductDetailModal(false);
};

/**
 * Render the product details modal.
 * 
 * @returns {JSX.Element|null} The rendered product details modal or null if productDetails is falsy.
 */
const renderProductDetailsModal = () => {
  if (!productDetails) {
    return null;
  }


  return (
    <NewModal
      show={productDetailModal}
      handleClose={handleCloseProductDetailModal}
      ModalTitle={"Product details"}
      size="lg">
      {/* Render the product name, price, quantity, and category */}
      <Row>
        <Col md="6">
          <label className="key">Name</label>
          <p className="value">{productDetails.name}</p>
        </Col>
        <Col md="6">
          <label className="key">Price</label>
          <p className="value">{productDetails.price}</p>
        </Col>
        <Col md="6">
          <label className="key">Quantity</label>
          <p className="value">{productDetails.quantity}</p>
        </Col>
        <Col md="6">
          <label className="key">Category</label>
          <p className="value">--</p>
        </Col>
      </Row>

      {/* Render the product description */}
      <Row>
        <Col md="12">
          <label className="key">Description</label>
          <p className="value">{productDetails.description}</p>
        </Col>
      </Row>

      {/* Render the product pictures */}
      <Row>
        <Col>
          <label className="key">Product Pictures</label>
          <div style={{ display: "flex" }}>
            {/* Map over the product pictures and render each picture */}
            {productDetails.productPictures.map((picture) => (
              <div className="productImgContainer">
                <img src={generatePublicUrl(picture.img)} alt="" />
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </NewModal>
  );
};

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
        <Row>
          <Col>
            <div>{renderProducts()}</div>
          </Col>
        </Row>
      </Container>

      {renderAddProductModal()}
      {renderProductDetailsModal()}
    </Layout>
  );
}
 
