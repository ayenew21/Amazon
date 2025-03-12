import React, { useState, useContext } from "react";
import classes from "./SignUp.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../Utility/firebase";
import ClipLoader from "react-spinners/ClipLoader";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../components/DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false,
  });

  const [{ user }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();
  const navStateData = useLocation();
  console.log(navStateData);

  // console.log(user);

  const authHandler = async (e) => {
    e.preventDefault();
    console.log(e.target.name);
    if (e.target.name === "signin") {
      // firebase auth

      setLoading({ ...loading, signIn: true });

      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signIn: false });
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signIn: false });
        });
    } else {
      setLoading({ ...loading, signUp: true }); // Moved this line here
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signUp: false });
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signUp: false });
        });
    }
  };

  return (
    <section className={classes.login}>
      <Link>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt="logo"
        />
      </Link>

      <div className={classes.login__container}>
        <h1>Sign In</h1>
        {navStateData?.state?.msg && (
          <small
            style={{
              padding: "5px",
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {navStateData?.state?.msg}
          </small>
        )}
        <form action="">
          <div>
            <label htmlFor="email">Email:</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
            />
          </div>

          <div>
            <label htmlFor="password">Password:</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>

          <button
            type="submit"
            onClick={authHandler}
            name="signin"
            className={classes.login_signInButton}
          >
            {loading.signIn ? (
              <ClipLoader color="white" size={15} margin={2} />
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* agreement */}
        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>

        {/* create account btn */}

        <button
          type="submit"
          className={classes.create_button}
          name="signup"
          onClick={authHandler}
        >
          {loading.signUp ? (
            <ClipLoader color="white" size={15} />
          ) : (
            "Create your Amazon Account"
          )}
        </button>
        {error && (
          <small style={{ color: "red", paddingTop: "8px" }}>{error}</small>
        )}
      </div>
    </section>
  );
}

export default Auth;
