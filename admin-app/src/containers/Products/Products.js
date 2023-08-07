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
import { addProduct } from "../../actions/product.action";
import NewModal from "../../components/Ui/model";

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
  const [pro]
  const dispatch = useDispatch();

  const handleClose = () => {
    //creatiing a new form object data with the following fields
    const form = new FormData();
    form.append("name", name);
    form.append("quantity", quantity);
    form.append("price", price);
    form.append("description", description);
    form.append("category", category);

    //setting up each product and appending them in the array
    for (let pic of productPictures) {
      form.append("productPicture", pic);
    }
    //dispatching the add product action with the new  form object
    dispatch(addProduct(form));

    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });

      if (category.children?.length > 0) {
        createCategoryList(category.children, options);
      }
    }

    return options;
  };

  //handeling product puctures in a array
  const handleProductPictures = (e) => {
    setProductPictures([...productPictures, e.target.files[0]]);
  };

  //redering the products in the frontend
  const renderProducts = () => {
    return (
      <Table responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Description</th>
            <th>Category</th>
            <th>Table heading</th>
          </tr>
        </thead>
        <tbody>
          {product.products.length > 0
            ? product.products.map((product) => (
                <tr key={product._id}>
                  <td>1</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>{product.description}</td>
                  <td>--</td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
    );
  };

  const renderAddProductModal = () => {
    return (
      // adding new model to the product
      <NewModal
        show={show}
        handleClose={handleClose}
        ModalTitle={"Add New Product"}>
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

        {/* option selection */}
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

        {/* mapping through the productPictures array and display the names in the frontend*/}
        {productPictures.length > 0
          ? productPictures.map((pic, index) => (
              <div key={index}>{pic.name}</div>
            ))
          : null}

        <Input
          style={{ marginTop: "20px" }}
          type="file"
          name="productPicture"
          onChange={handleProductPictures}
        />
      </NewModal>
    );
  };

  const renderProductDetailsModal = () => {
    return( 
    <NewModal
    show={show}
    handleClose={}
    ModalTitle={"Product details"}>

    </NewModal>)
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
    </Layout>
  );
}
