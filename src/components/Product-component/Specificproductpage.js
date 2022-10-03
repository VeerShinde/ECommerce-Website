import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import { useParams } from "react-router-dom";
import { database, auth } from "../../firebase_config";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  addDoc,
} from "firebase/firestore";
import Productslider from "./Productslider";
import "../css/Specificproductpage.css";

const Specificproductpage = () => {
  // useParams hook is used to get details of the url we have given in path.
  const { type, id } = useParams();
  const [product, setProduct] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  function GetCurrentProduct() {
    useEffect(() => {
      const getProduct = async () => {
        const docRef = doc(database, `products-${type.toUpperCase()}`, id);
        const docSnap = await getDoc(docRef);
        setProduct(docSnap.data());
      };
      getProduct();
    }, []);
    return product;
  }
  GetCurrentProduct();
  return (
    <div>
      <Navbar />
      <h2>{id}</h2>
      <h2>{type}</h2>
    </div>
  );
};

export default Specificproductpage;
