import React, { useState } from "react";
import "../css/Productcontainer.css";
import { Link } from "react-router-dom";

const Productcontainer = (product) => {
  let p = product.product;
  let overalltax = 10 / 100; //10%
  let overcommission = 10 / 100; //10%
  let extraforfun = 10 / 100; //10%

  let mrp = parseInt(p.price);
  mrp = mrp + overalltax * mrp + overcommission * mrp + extraforfun * mrp;
  const saleprice = mrp - extraforfun * mrp;

  return (
    <div className="product-container">
      <img src={p.productImage} alt="" />
      <div className="product-details">
        <a href={`/product/${p.productType}/${p.id}`}>
          <button className="producttitle">{p.productTitle}</button>
        </a>
        <div className="price-container">
          <p className="mrp">
            MRP: <p className="rate">₹{mrp}</p>
          </p>
          <p className="saleprice">
            Discount Price: <p className="rate">₹{saleprice}</p>
          </p>
          <p className="yousave">You Save: ₹{mrp - saleprice}</p>
        </div>
        <a href={`/product/${p.productType}/${p.id}`}>
          <button className="showmore-btn">More Details &gt;</button>
        </a>
      </div>
    </div>
  );
};

export default Productcontainer;
