import React from "react";
import classes from "./Header.module.css";
import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import LowerHeader from "./LowerHeader";

const Header = () => {
  return (
    <>
      <div className={classes.header_container}>
        {/* logo section */}
        <div className={classes.logo_container}>
          <a href="/">
            <img
              src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
              alt="Amazon logo"
            />
          </a>

          {/* delivery */}
          <div className={classes.delivery}>
            <span>
              <SlLocationPin />
            </span>
            <div>
              <p>Delivere to</p>
              <span>Ethiopia</span>
            </div>
          </div>
        </div>

        {/* search section*/}

        <div className={classes.search}>
          <select name="" id="">
            <option value="">All</option>
          </select>
          <input type="text" />
          <BsSearch size={25} />
        </div>
        {/* right side link / other section*/}
        <div className={classes.order_container}>
          <a className={classes.language}>
            <img
              src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1024px-Flag_of_the_United_States.svg.png"
              alt=""
            />
            <section>
              <option value="">EN</option>
            </section>
          </a>
          {/* three comp;onents */}
          <a href="">
            <div>
              <p>Sign In</p>
              <span>Account &Lists</span>
            </div>
          </a>
          {/* Orders */}
          <a href="/orders">
            <p>returns</p>
            <span>& Orders</span>
          </a>
          {/* Cart */}
          <a href="/cart" className={classes.cart}>
            <BiCart size={35} />
            {/* icon */}
            <span>0</span>
          </a>
        </div>
      </div>
      <LowerHeader />
    </>
  );
};

export default Header;
