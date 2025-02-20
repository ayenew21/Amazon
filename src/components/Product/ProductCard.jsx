import React from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import classes from "./product.module.css";

function ProductCard({ product }) {
  // Make sure to pass the 'product' prop
  const { image, title, id, rating, price } = product;
  return (
    <div className={classes.card_container}>
      <a href="">
        <img src={image} alt={product.title} />
      </a>
      <div>
        <h3>{title}</h3>
        <div className={classes.rating}>
          {/* Display rating */}
          <Rating value={rating.rate} precision={0.1} />
          {/* Display rating counter */}
          <small>{rating.count}</small>
        </div>
        <div>
          {/* product.price */}
          <CurrencyFormat amount={price} />
        </div>
        <button className={classes.button}>Add to cart</button>
      </div>
    </div>
  );
}

export default ProductCard;
