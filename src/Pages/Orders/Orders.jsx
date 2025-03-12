import React, { useContext, useState, useEffect } from "react";
import classes from "./Orders.module.css";
import Layout from "../../components/Layout/Layout";
import { db } from "../../Utility/firebase";
import { DataContext } from "../../components/DataProvider/DataProvider";
import ProductCard from "../../components/Product/ProductCard";
import { data } from "react-router";

function Orders() {
  const [{ user }, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          console.log(snapshot);
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
      //   console.log("Fetched Orders: ", fetchedOrders); // Debugging log
      //   setOrders(fetchedOrders);
      // });
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <Layout>
      <section className={classes.container}>
        <div className={classes.orders_container}>
          <h2>Your orders</h2>
          {orders?.length === 0 && (
            <div style={{ padding: "20px" }}>You don't have orders yet</div>
          )}

          {/* ordered items */}

          <div>
            {orders?.map((eachOrder, i) => {
              console.log("Each Order: ", eachOrder); // Debugging log
              return (
                <div key={i}>
                  <hr />
                  <p>Order ID: {eachOrder?.id}</p>
                  {eachOrder?.data?.basket ? (
                    eachOrder.data.basket.map((order) => {
                      console.log("Order Item: ", order); // Debugging log
                      return (
                        <ProductCard
                          flex={true}
                          product={order}
                          key={order.id}
                        />
                      );
                    })
                  ) : (
                    <p>No items in this order</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Orders;
