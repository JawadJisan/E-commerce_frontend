import React, { useEffect } from "react";
import "./Home.css";
import { CgMouse } from "react-icons/cg";
import ProductCard from "./ProductCard";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, products, productsCount, error } =
    useSelector((state) => state.products) || {};

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="E-Commerce" />
          <div className="banner">
            <p>Welcome to E-commerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>
          {/* <h2 className="homeHeading">Featured Products</h2> */}
          {/* <div className="container" id="container"> */}
          {/* {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))} */}
          {/* </div> */}

          <h2 className="homeHeading">Smart Phone</h2>
          <div className="container" id="container">
            {products &&
              products
                .filter((p) => p.category === "SmartPhones")
                .map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
          </div>

          {/* laptop section */}
          <h2 className="homeHeading">Laptop</h2>
          <div className="container" id="container">
            {products &&
              products
                .filter((p) => p.category === "Laptop")
                .map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
          </div>

          {/* Camera section */}
          <h2 className="homeHeading">Camera</h2>
          <div className="container" id="container">
            {products &&
              products
                .filter((p) => p.category === "Camera")
                .map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
          </div>

          {/* Printer section */}
          <h2 className="homeHeading">Printer</h2>
          <div className="container" id="container">
            {products &&
              products
                .filter((p) => p.category === "Printer")
                .map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
          </div>

          {/* Gadgets section */}
          <h2 className="homeHeading">Gadgets</h2>
          <div className="container" id="container">
            {products &&
              products
                .filter((p) => p.category === "Gadgets")
                .map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
          </div>
          {/* Gaming Console section */}
          <h2 className="homeHeading">Gaming Console</h2>
          <div className="container" id="container">
            {products &&
              products
                .filter((p) => p.category === "Gaming Console")
                .map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
