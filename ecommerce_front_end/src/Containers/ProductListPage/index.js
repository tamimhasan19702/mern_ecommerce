/** @format */

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProductBySlug } from "../../actions";
import Layout from "../../Components/Layout";

export default function ProductListPage(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    const { match } = props;
    dispatch(getProductBySlug(match.params.slug));
  }, []);

 return (
  <Layout>
    <div className="card">
      <div className="cardHeader">
        <div>Samsung mobile under 10K</div>
        <button>View all</button>
      </div>

      <div className="productContainer">
        <div className="productImgContainer">
          <img src="http://localhost:3000/public/images/-72gp5T8A-0515605_samsung-galaxy-tab-a-2019-2-gb-32-gb-black_400.jpeg" alt="" />
        </div>

        <div>
          <div>Samsung 4gb Phone</div>
          <div>
            <span>4.3</span>
            <span>3533</span>
          </div>
          <div>500</div>
        </div>
      </div>
    </div>
  </Layout>
);

}
