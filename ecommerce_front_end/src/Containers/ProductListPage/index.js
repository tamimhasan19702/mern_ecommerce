/**
 * eslint-disable array-callback-return
 *
 * @format
 */

/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductBySlug } from "../../actions";
import Layout from "../../Components/Layout";
import "./style.css";
import { generatePublicUrl } from "../../urlConfig";

export default function ProductListPage(props) {
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [priceRange, setPriceRange] = useState({
    under5k: 5000,
    under10k: 10000,
    under20k: 20000,
    under30k: 30000,
    under50k: 50000,
  });

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
              <div>{props.match.params.slug} mobile under {priceRange[key]}</div>
              <button>View all</button>
            </div>

            <div style={{ display: "flex" }}>
              {product.productsByPrice[key].map((product, index) => {
                return (
                  <div className="productContainer">
                    <div className="productImgContainer">
                      <img
                        src={generatePublicUrl(product.productPictures[0].img)}
                        alt={product.name}
                      />
                    </div>
                    <div className="productInfo">
                      <div style={{ margin: "5px 0" }}>{product.name}</div>
                      <div>
                        <span>4.3</span>
                        <span>3533</span>
                      </div>
                      <div className="productPrice">{product.price}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </Layout>
  );
}
