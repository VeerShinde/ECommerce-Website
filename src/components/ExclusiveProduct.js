import React from "react";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import { storage, auth, database } from "../firebase_config";
import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
import { Navigate, useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import "../components/css/Exclusiveproduct.css";

// showcasing products for a selected users.
const ExclusiveProduct = () => {
  const [productTitle, setProductTitle] = useState("");
  const [productType, setProductType] = useState("");
  const [productSpecs, setProductSpecs] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [customerSupport, setCustomerSupport] = useState("");
  const [price, setPrice] = useState("");
  const [warranty, setWarranty] = useState("");
  const [productImage, setProductImage] = useState("");

  const [imageError, setImageError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [uploadError, setUploadError] = useState("");

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
  // if (loggeduser) {
  //   console.log(loggeduser[0].email);
  // }
  const types = ["image/jpg", "image/jpeg", "image/png", "image/PNG"];
  const handleProductImg = (e) => {
    e.preventDefault();
    let selectedfile = e.target.files[0];
    if (selectedfile) {
      if (selectedfile && types.includes(selectedfile.type)) {
        setProductImage(selectedfile);
        setImageError("");
      } else {
        setProductImage(null);
        setImageError("Please select valid image file type(jpg,jpeg,png,PNG)");
      }
    } else {
      setImageError("Please select your file");
    }
  };

  // to pass data to database
  const handleAddProduct = (e) => {
    e.preventDefault();
    const storageRef = ref(
      storage,
      `product-images${productType.toUpperCase()}/${Date.now()}`
    );
    // console.log(storageRef._location.path);
    uploadBytes(storageRef, productImage).then(() => {
      getDownloadURL(storageRef).then((url) => {
        addDoc(collection(database, `products-${productType.toUpperCase()}`), {
          productTitle,
          productType,
          productSpecs,
          description,
          brand,
          customerSupport,
          price,
          warranty,
          // storage madhe jo url bannar toh aaplyala ithe bhetnar
          productImage: url,
        });
      });
    });
  };
  return (
    <div>
      <Navbar />
      {loggeduser && loggeduser[0].email == "veershinde195@gmail.com" ? (
        <div className="addprod-container">
          <form className="addprod-form" onSubmit={handleAddProduct}>
            <p>Add data</p>
            {successMsg && <div className="success-msg">{successMsg}</div>}
            {uploadError && <div className="error-msg">{uploadError}</div>}

            <label>Product Title</label>
            <input
              type="text"
              onChange={(e) => {
                setProductTitle(e.target.value);
              }}
              placeholder="Product Title"
            />

            <label>Product Type</label>
            <input
              type="text"
              onChange={(e) => {
                setProductType(e.target.value);
              }}
              placeholder="Product Type"
            />

            <label>Brand Name</label>
            <input
              type="text"
              onChange={(e) => {
                setBrand(e.target.value);
              }}
              placeholder="Brand Name"
            />

            <label>Product Specification</label>
            <textarea
              onChange={(e) => {
                setProductSpecs(e.target.value);
              }}
              placeholder="Enter Product Specification"
            ></textarea>

            <label>Warranty</label>
            <input
              type="text"
              onChange={(e) => {
                setWarranty(e.target.value);
              }}
              placeholder="Product Warranty"
            />

            <label>Image</label>
            <input type="file" onChange={handleProductImg} />
            {imageError && (
              <>
                <div className="error-msg">{imageError}</div>
              </>
            )}

            <label>Description</label>
            <textarea
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              placeholder="Describe your product in brief"
            ></textarea>

            <label>MRP</label>
            <input
              type="text"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              placeholder="Enter Price with Tax"
            />

            <label>Cutomer Supports</label>
            <input
              type="text"
              onChange={(e) => {
                setCustomerSupport(e.target.value);
              }}
              placeholder="Customer Support Email, phone, or address"
            />

            <button type="submit">Add</button>
          </form>
        </div>
      ) : (
        <div>
          <h3>You don't have access to this products</h3>
        </div>
      )}
    </div>
  );
};

export default ExclusiveProduct;
