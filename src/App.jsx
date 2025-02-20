import React from "react";
import Header from "./components/Header/Header";
import "./index.css";
import CarouselEffect from "./components/Carousel/Carousel";
import Category from "./components/Category/Category";
import Product from "./components/Product/Product";


const App = () => {
  return (
    <>
      <Header />
      <CarouselEffect />
      <Category />
      <Product />
    </>
  );
};

export default App;
