import React from "react";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import { auth, database } from "../firebase_config";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import "../components/css/UserProfile.css";

const Userprofile = () => {
  const GetCurrentUser = () => {
    const [user, setUser] = useState("");
    // using this line we get an access to database collection, users folder.
    const usersCollectionRef = collection(database, "users");

    //  to check which user is logged in, useEffect gives us real time changes.
    useEffect(() => {
      auth.onAuthStateChanged((userLogged) => {
        if (userLogged) {
          // doing this async because it takes time.
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
  if (loggeduser) {
    console.log(loggeduser[0].email);
  }
  return (
    <div>
      <Navbar />
      <div className="userprofile-outercontainer">
        {loggeduser ? (
          <div>
            <div className="user-profile">
              <h3 className="heading">Your Account details</h3>

              <div className="data-row">
                <span>Your name: </span>
                <span>{loggeduser[0].userName}</span>
              </div>
              <div className="data-row">
                <span>Your email: </span>
                <span>{loggeduser[0].email}</span>
              </div>
              <div className="data-row">
                <span>Your Phone Number: </span>
                <span>{loggeduser[0].phoneNumber}</span>
              </div>
              <div className="data-row">
                <span>Your Address: </span>
                <span>{loggeduser[0].address}</span>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h4>Your are Not Logged In</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default Userprofile;
