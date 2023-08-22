/** @format */

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProductBySlug } from "../../actions";
import Layout from "../../Components/Layout";

export default function ProductListPage(props) {

  const dispatch = useDispatch()

  useEffect(() => {
    console.log(props.match.params.slug)
    dispatch(getProductBySlug())
  }, [])

  return( 
  <Layout>
    product list page
  </Layout>
  )
}
