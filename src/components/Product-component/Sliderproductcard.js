import React from "react";
import "../css/Sliderproductcard.css";
import { Link } from "react-router-dom";

const Sliderproductcard = (product) => {
  let overalltax = 10 / 100; //10%
  let overcommission = 10 / 100; //10%
  let extraforfun = 10 / 100; //10%

  let p = product.product;

  let mrp = parseInt(p.price);
  mrp = mrp + overalltax * mrp + overcommission * mrp + extraforfun * mrp;
  const saleprice = mrp - extraforfun * mrp;
  return (
    <div className="mini-product-container">
      <div className="mini-img-container">
        <img src={p.productImage} alt="mobo-img" />
      </div>
      <div className="mini-products-details">
        <p className="mini-producttitle">{p.productTitle}</p>
        <div className="mini-price-container">
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

export default Sliderproductcard;
