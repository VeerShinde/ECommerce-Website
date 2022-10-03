import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { collection, query, onSnapshot, getDocs } from "firebase/firestore";
import { database } from "../../firebase_config";
import { useState, useEffect } from "react";
import Sliderproductcard from "./Sliderproductcard";

const Productslider = (props) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const [products, setProducts] = useState([]);
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
        .catch("Error error error");
    };
    getProducts();
  }, []);

  return (
    <div>
      <Carousel responsive={responsive}>
        {products.map((product) => (
          <Sliderproductcard key={product.id} product={product} />
        ))}
      </Carousel>
    </div>
  );
};

export default Productslider;
