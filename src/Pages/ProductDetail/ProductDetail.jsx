import React, { useEffect } from "react";
import classes from "./ProductDetail.module.css";
import Layout from "../../components/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/endPoint";
import ProductCard from "../../components/Product/ProductCard";
import { useState } from "react";
import Loader from "../../components/Loader/Loader";

function ProductDetail() {
  const [product, setProduct] = useState({});
  const [isLoading, setisLoading] = useState(false);
  const { productId } = useParams();
  useEffect(() => {
    setisLoading(true);
    axios
      .get(`${productUrl}/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
      });
  }, []);
  return (
    <Layout>
      {isLoading ? <Loader /> : <ProductCard product={product} />}
    </Layout>
  );
}

export default ProductDetail;
