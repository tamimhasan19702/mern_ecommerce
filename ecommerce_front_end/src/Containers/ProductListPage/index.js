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

  return <Layout>product list page</Layout>;
}
