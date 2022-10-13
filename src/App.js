// import logo from './logo.svg';
import "./App.css";
import app from "./firebase_config";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PgFOF from "./components/PgFOF";
import Cart from "./components/Cart";
import Userprofile from "./components/Userprofile";
import ExclusiveProduct from "./components/ExclusiveProduct";
import Allproductpage from "./components/Product-component/Allproductpage";
import Productcontainer from "./components/Product-component/Productcontainer";
import Specificproductpage from "./components/Product-component/Specificproductpage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/ECommerce-Website/" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/userprofile" element={<Userprofile />} />
        <Route path="/exclusiveproducts" element={<ExclusiveProduct />} />
        <Route
          // sending type as a props.
          path="/product-type/mobiles"
          element={<Allproductpage type={"Mobile"} />}
        ></Route>
        <Route
          path="/product-type/laptops"
          element={<Allproductpage type={"Laptop"} />}
        ></Route>
        <Route
          path="/product-type/televisions"
          element={<Allproductpage type={"Television"} />}
        ></Route>
        <Route
          path="/product-type/cameras"
          element={<Allproductpage type={"Camera"} />}
        ></Route>
        {/* we are keeping id and title in url thats why i am writing id and title*/}
        <Route
          path="/product/:type/:id"
          element={<Specificproductpage />}
        ></Route>
        <Route path="*" element={<PgFOF />} />
      </Routes>
    </Router>
  );
}

export default App;
