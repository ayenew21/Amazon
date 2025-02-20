import React from "react";
import classes from "./category.module.css";

function CategoryCard({ data }) {
  const { title, imageLink } = data;
  return (
    <div className={classes.category}>
      <a href="">
        <span>
          <h2>{title}</h2>
        </span>
        <img src={imageLink} alt="" />
        <p>shop now</p>
      </a>
    </div>
  );
}

export default CategoryCard;
