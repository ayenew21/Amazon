import React, { useContext, useState } from "react";
import classes from "./Payment.module.css";
import Layout from "../../components/Layout/Layout";
import { DataContext } from "../../components/DataProvider/DataProvider";
import ProductCard from "../../components/Product/ProductCard";
import { Type } from "../../Utility/action.type";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../Api/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/firebase";
import { useNavigate } from "react-router-dom";
import { collection, doc, setDoc } from "firebase/firestore"; // Add necessary imports

function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);

  const totalItem = basket?.reduce((amount, item) => item.amount + amount, 0);
  const total = basket?.reduce(
    (amount, item) => item.price * item.amount + amount,
    0
  );

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleChange = (e) => {
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!user) {
      setCardError("User is not logged in");
      return;
    }

    if (basket.length === 0) {
      setCardError("Basket is empty");
      return;
    }

    try {
      setProcessing(true);

      // 1. backend || functions----> contact to the client secret
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });

      const clientSecret = response.data?.clientSecret;

      // 2. client side (react side confirmation)
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      // 3. after the confirmation----> order firestore database save, clear basket
      const orderRef = doc(
        collection(db, "users", user.uid, "orders"),
        paymentIntent.id
      );
      await setDoc(orderRef, {
        basket: basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      });

      console.log("Order saved to Firestore:", {
        basket: basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      });

      // Empty the basket
      dispatch({ type: Type.EMPTY_BASKET });

      setProcessing(false);
      navigate("/orders", { state: { msg: "You have placed a new order" } });
    } catch (error) {
      console.log(error);
      setCardError("Payment failed. Please try again.");
      setProcessing(false);
    }
  };

  return (
    <Layout>
      {/* Header */}
      <div className={classes.payment_header}>Checkout ({totalItem}) items</div>

      {/* Payment method */}
      <section className={classes.payment_method}>
        {/* address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Addis Ababa</div>
          </div>
        </div>
        <hr />

        {/* product */}
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item, i) => (
              <ProductCard key={i} product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />

        {/* card form */}
        <div className={classes.flex}>
          <h3>Payment methods</h3>
          <div className={classes.payment_card}>
            <div className={classes.payment_details}>
              <form onSubmit={handlePayment}>
                {/* Error message */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {/* Card element */}
                <CardElement onChange={handleChange} />

                {/* Price */}
                <div className={classes.payment_price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total Order | </p>
                      <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit" disabled={processing}>
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader color="gray" size={12} />
                        <p>Please wait...</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Payment;
