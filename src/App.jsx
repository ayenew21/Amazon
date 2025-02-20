import React from "react";
import Header from "./components/Header/Header";
import "./index.css";
import CarouselEffect from "./components/Carousel/Carousel";
import Category from "./components/Category/Category";

const App = () => {
  return (
    <>
      <Header />
      <CarouselEffect />
      <Category />
    </>
  );
};

export default App;
