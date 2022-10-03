import React from "react";
import Navbar from "../Navbar";
import { useState, useEffect } from "react";
import "../css/Allproductpage.css";
import Productcontainer from "./Productcontainer";
import {
  collection,
  query,
  onSnapshot,
  getDocs,
  querySnapshot,
} from "firebase/firestore";
import { database } from "../../firebase_config";

// props has been sended from App.js
const Allproductpage = (props) => {
  // defining usuState because if someone add new product tar te pn disla pahije.
  const [products, setProducts] = useState([]);
  // useEffect, after loading data should be visible
  // inside useEffect data get kartoy.
  useEffect(() => {
    const getProducts = () => {
      // ya array madhe data get kartoy
      const productsArray = [];
      // ha path aahe jithun products get karnar tar te folder name uppercase madhe aahe database madhe tar uppercase use karava lagnar.
      const path = `products-${props.type.toUpperCase()}`;
      // console.log(path);  // checking path bhetla ka nhi

      // data render kela, aani te products productsArray madhe store kele
      getDocs(collection(database, path))
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            productsArray.push({ ...doc.data(), id: doc.id });
            console.log(doc.id, "=>", doc.data());
          });
          // initially products empty asnar and aapan aata data store kela tyat.
          setProducts(productsArray);
        })
        .catch((error) => {
          console.log(error.message);
        });
    };
    getProducts();
  }, []);
  // console.log(props.type);
  console.log(products);
  return (
    <div className="allproductpage">
      <Navbar />
      <div className="heading">
        <p>Top Results from {props.type}</p>
      </div>
      <div className="allproductcontainer">
        {products.map((product) => (
          // passing a product as props to productcontainer
          <Productcontainer key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Allproductpage;
