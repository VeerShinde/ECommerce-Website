import React, { useState } from "react";
import Navbar from "./Navbar";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "../firebase_config";
import { collection, addDoc } from "firebase/firestore";
import "./css/Signup.css";

const Signup = () => {
  const [userName, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();
  const [errMessage, setErrMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  // handlesubmit will pass all the data to database(firebase).
  const handleSubmit = (event) => {
    // this will stop page reloading after submiting.
    event.preventDefault();
    // to make new user in firebase we need to call "createUserWithEmailAndPassword"
    createUserWithEmailAndPassword(auth, email, password) // use with this we are passing aur email and password to authentication.
      // if the above code is successful do this:
      .then((userCredentials) => {
        const user = userCredentials.user;
        // when the new user come his initial cart should be 0.
        const initialcartvalue = 0;
        console.log(user);

        // to add data in database addDoc is use.
        // pass data in database which we have made in firebase_config file and also make users folder and add data in that. Then in curly bracket list what we have to pass.
        // note: very imp, authentication provide unique id so we are using that, so this will make link that its same user.
        addDoc(collection(database, "users"), {
          userName: userName,
          email: email,
          phoneNumber: phoneNumber,
          password: password,
          cart: initialcartvalue,
          address: address,
          uid: user.uid,
          // if this successful do this.
        })
          .then(() => {
            setSuccessMessage(
              "New user added successfully, You will now automatically redirected to login page."
            );
            setUsername("");
            setPhoneNumber("");
            setEmail("");
            setPassword("");
            setAddress("");
            // to redirect to login page
            setTimeout(() => {
              setSuccessMessage("");
              navigate("/login");
            }, 2000);
          })
          // if error comes do this
          .catch((err) => {
            setErrMessage(err.message);
          });
      })
      .catch((err) => {
        if (err.message == "Firebase: Error (auth/invalid-email).") {
          setErrMessage("Please field all required fields");
        }
        if (err.message == "Firebase : Error (auth/email-already-in-use).") {
          setErrMessage("User already exists");
        }
      });
  };

  return (
    <div>
      <Navbar />
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h1>Create Account</h1>

          {successMessage && (
            <>
              <div className="success-msg">{successMessage}</div>
            </>
          )}
          {errMessage && (
            <>
              <div className="error-msg">{errMessage}</div>
            </>
          )}
          <label htmlFor="">Your Name</label>
          <input
            type="text"
            placeholder="Enter your first and lastname"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />

          <label htmlFor="">Mobile Number</label>
          <input
            type="tel"
            placeholder="Enter mobile number"
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
          />

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

          <label htmlFor="">Address</label>
          <textarea
            type="text"
            placeholder="Enter address"
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />

          <button type="submit">Sign Up</button>
          {/* If user already have an account then the link to go to login page.*/}
          <div>
            <span>Already have an account</span>
            <Link to="/login">Log In</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
