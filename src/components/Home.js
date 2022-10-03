import React from "react";
import Navbar from "./Navbar";
import Products from "./Products";
import Banner from "./Banner";
import { useState, useEffect } from "react";
import { auth, database } from "../firebase_config";
import { collection, getDocs, query, where } from "firebase/firestore";
import Userprofile from "./Userprofile";
import Productslider from "./Product-component/Productslider";
import "./css/Home.css";

const Home = () => {
  // in home we are getting the data of logged in user and display his data in home and many more places.
  const GetCurrentUser = () => {
    const [user, setUser] = useState("");
    // using this line we get an access to database collection, users folder.
    const usersCollectionRef = collection(database, "users");

    //  to check which user is logged in, useEffect gives us real time changes.
    useEffect(() => {
      auth.onAuthStateChanged((userLogged) => {
        if (userLogged) {
          // doing tis async because it takes time.
          const getUsers = async () => {
            const q = query(
              collection(database, "users"),
              // checking wheter uid and userloggedin match.
              where("uid", "==", userLogged.uid)
            );
            // console.log(q);
            // 1st we will see user exist or not by above line then it will get his uid in q, and then i am getting his whole data from database by below line.
            const data = await getDocs(q);
            setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          };
          getUsers();
        } else {
          setUser(null);
        }
      });
    }, []);
    return user;
  };
  const loggeduser = GetCurrentUser();
  // because if user is not logged in this will give error if we directly log loggeduser.
  if (loggeduser) {
    console.log(loggeduser[0].email);
  }
  return (
    <div>
      <Navbar />
      <Banner />
      <div className="slider-head">
        <p>Limited Time Deals</p>
      </div>
      <Productslider type={"Mobile"} />
      <Productslider type={"Laptop"} />
      <Productslider type={"Television"} />
      <Productslider type={"Camera"} />
    </div>
  );
};

export default Home;
