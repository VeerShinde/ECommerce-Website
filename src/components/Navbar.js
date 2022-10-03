import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./css/Navbar.css";
import Cartlogo from "../components/images/Cart.jpg"; // image will be stored in Cartlogo variable.
import Profilelogo from "../components/images/Profilelogo.png"; // image will be stored in Profilelogo variable.
import { useState, useEffect } from "react";
import { auth, database } from "../firebase_config";
import { collection, getDocs, query, where } from "firebase/firestore";
import applogo from "../components/images/applogo.png";

const Navbar = () => {
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

  // first i will navigate a user, once a user logout he/she should navigate to login page.
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate("/login");
    });
  };
  return (
    <div>
      <div className="navbar">
        <div className="leftcontainer">
          <img src={applogo} alt="applogo" />
        </div>
        {/* In right container i want to do if user is logged in, then login button should not be visible to him.*/}
        <div className="rightcontainer">
          {!loggeduser && (
            <nav>
              <Link to={"/"}>
                <button>Home</button>
              </Link>
              <Link to={"/signup"}>
                <button>Sign up</button>
              </Link>
              <Link to={"/login"}>
                <button>Login</button>
              </Link>
              {/* cart should be 0 */}
              <div className="cart-btn">
                <img src={Cartlogo} alt="cartlogo" />
                <span className="cart-icon-css">0</span>
              </div>
              <Link to={"/userprofile"}>
                <img
                  src={Profilelogo}
                  className="profile-icon"
                  alt="profilelogo"
                />
              </Link>
            </nav>
          )}

          {loggeduser && (
            <nav>
              <Link to={"/"}>
                <button>Home</button>
              </Link>
              <Link to={"/exclusiveproducts"}>
                <button>Sell</button>
              </Link>
              <div className="cart-btn">
                <img src={Cartlogo} alt="cartlogo" />
                <span className="cart-icon-css">{loggeduser[0].cart}</span>
              </div>
              <Link to={"/userprofile"}>
                <img
                  src={Profilelogo}
                  className="profile-icon"
                  alt="profilelogo"
                />
              </Link>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </nav>
          )}
        </div>
      </div>
      <div className="product-types">
        <a href="/product-type/mobiles">
          <button>Mobiles</button>
        </a>
        <a href="/product-type/laptops">
          <button>Laptops</button>
        </a>
        <a href="/product-type/televisions">
          <button>Television</button>
        </a>
        <a href="/product-type/cameras">
          <button>Cameras</button>
        </a>
      </div>
    </div>
  );
};

export default Navbar;
