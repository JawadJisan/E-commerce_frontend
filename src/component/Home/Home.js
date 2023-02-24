import React, { useEffect } from 'react'
import './Home.css'
import { CgMouse } from "react-icons/cg";
import ProductCard from './ProductCard';
import MetaData from '../layout/MetaData';
import { clearErrors, getProduct } from '../../actions/productAction';
import { useDispatch, useSelector } from 'react-redux';
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";





const Home = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, products, productsCount, error } = useSelector((state) => state.products) || {}

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct())
    }, [dispatch])



    return (
        <>
            {loading ? <Loader /> :
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
                    <h2 className="homeHeading">Featured Products</h2>
                    <div className="container" id="container">
                        {products &&
                            products.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                    </div>

                </>
            }
        </>
    )
}

export default Home