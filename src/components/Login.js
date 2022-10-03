import React, { useState } from "react";
import Navbar from "./Navbar";
import "./css/Login.css";
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  // make authentication enable
  const auth = getAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // auth will help to connect with firebase authentication and check whether user exist or not.
    signInWithEmailAndPassword(auth, email, password)
      // if this goes successful then do this
      .then((userCredentials) => {
        setSuccessMsg(
          "Logged in successfully, you will redirected to homePage."
        );
        // then i have blanked all things because any user visit website he will not be able to login without email-password.
        setEmail("");
        setPassword("");
        setErrorMsg("");
        setTimeout(() => {
          setSuccessMsg("");
          navigate("/");
        }, 3000);
      })
      .catch((error) => {
        const errorcode = error.code;
        // this log is applied to know the axact error.
        console.log(error.message);
        if (error.message == "Firebase: Error (auth/invalid-email).") {
          setErrorMsg("Please fill all required fields");
        }
        if (error.message == "Firebase : Error (auth/user-not-found).") {
          setErrorMsg("Email not found");
        }
        if (error.message == "Firebase : Error (auth/wrong-password)") {
          setErrorMsg("Wrong password");
        }
      });
  };
  return (
    <div>
      <Navbar />
      <div className="login-container">
        <form className="login-form">
          <h1>Log In</h1>

          {successMsg && (
            <>
              <div className="success-msg">{successMsg}</div>
            </>
          )}
          {errorMsg && (
            <>
              <div className="error-msg">{errorMsg}</div>
            </>
          )}
          <label htmlFor="">Email</label>
          <input
            type="email"
            placeholder="Enter email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <label htmlFor="">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <button onClick={handleLogin}>Log In</button>
          {/* If user already have an account then the link to go to login page.*/}
          <div>
            <span>Don't have an account?</span>
            <Link to="/signup">Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
