/** @format */

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductBySlug } from "../../actions";
import Layout from "../../Components/Layout";
import "./style.css";

export default function ProductListPage(props) {
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    const { match } = props;
    dispatch(getProductBySlug(match.params.slug));
  }, [dispatch, props]);

  return (
    <Layout>
      {Object.keys(product.productsByPrice).map((key, index) => {
        return (
          <div className="card">
            <div className="cardHeader">
              <div>Samsung mobile under 10K</div>
              <button>View all</button>
            </div>

            <div className="productContainer">
              <div className="productImgContainer">
                <img
                  src="http://localhost:3000/public/-72gp5T8A-0515605_samsung-galaxy-tab-a-2019-2-gb-32-gb-black_400.jpeg"
                  alt=""
                />
              </div>

              <div className="productInfo">
                <div style={{ margin: "5px 0" }}>Samsung 4gb Phone</div>
                <div>
                  <span>4.3</span> &nbsp;
                  <span>3533</span>
                </div>
                <div className="productPrice">500</div>
              </div>
            </div>
          </div>
        );
      })}
    </Layout>
  );
}
