import './App.css';
import Header from "./component/layout/Header/Header.js";
import Navbar from "./component/layout/Header/Navbar.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { useEffect, useState } from 'react';
import WebFont from "webfontloader";
import Footer from './component/layout/Footer/Footer';
import Home from './component/Home/Home.js';
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import LoginSignUp from './component/user/LoginSignUp';
import { loadUser } from './actions/userAction';
import useAuthCheck from './hooks/useAuthCheck';
import UserOptions from "./component/layout/Header/UserOptions";
import { useDispatch, useSelector } from 'react-redux';
import Profile from "./component/user/Profile.js";
import ProtectedRoute from "./component/Route/ProtectedRoute.js";
import UpdateProfile from './component/user/UpdateProfile';
import UpdatePassword from './component/user/UpdatePassword.js';
import ForgotPassword from "./component/user/ForgotPassword.js";
import ResetPassword from './component/user/ResetPassword';
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from './component/Cart/ConfirmOrder';
import axios from 'axios';
import Payment from "./component/Cart/Payment.js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails.js";
import Dashboard from "./component/Admin/Dashboard.js";
import ProductList from "./component/Admin/ProductList.js";
import NewProduct from "./component/Admin/NewProduct.js";
import UpdateProduct from "./component/Admin/UpdateProduct.js";
import OrderList from "./component/Admin/OrderList.js";
import ProcessOrder from "./component/Admin/ProcessOrder.js";
import UsersList from "./component/Admin/UsersList.js";
import UpdateUser from "./component/Admin/UpdateUser.js";
import ProductReviews from "./component/Admin/ProductReviews.js";
import Contact from "./component/layout/Contact/Contact.js";
import About from "./component/layout/About/About.js";
import NotFound from "./component/layout/Not Found/NotFound.js";









function App() {
  const authChecked = useAuthCheck();
  const dispatch = useDispatch()
  const { isAuthenticated, user } = useSelector((state) => state.user) || {};

  const [stripeApiKey, setStripeApiKey] = useState("");


  const token = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {}
  // console.log(token?.accessToken)


  async function getStripeApiKey() {
    const { data } = await axios.get("https://ec-server.onrender.com/api/v1/stripeapikey", {
      headers: {
        'token': token?.accessToken,
        'Content-Type': 'application/json'
      }
    });
    setStripeApiKey(data?.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    // store.dispatch(loadUser())
    getStripeApiKey();
  }, []);

  window.addEventListener("contextmenu", (e) => e.preventDefault());


  return !authChecked ? (<div>Checking authintacation...</div>) :
    (
      <Router>
        <Header />
        {isAuthenticated && <UserOptions user={user} />}

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<LoginSignUp />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          {/* <Route path="/account" element={<Profile />} /> */}
          {/* <ProtectedRoute path="/account" element={<Profile />} /> */}
          <Route path="/account"
            element={<ProtectedRoute>
              <Profile />
            </ProtectedRoute>}
          />
          <Route path="/me/update"
            element={<ProtectedRoute>
              <UpdateProfile />
            </ProtectedRoute>}
          />
          <Route path="/password/update"
            element={<ProtectedRoute>
              <UpdatePassword />
            </ProtectedRoute>}
          />
          <Route path="/orders"
            element={<ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>}
          />
          <Route path="admin/dashboard"
            element={<ProtectedRoute isAdmin={true}>
              <Dashboard />
            </ProtectedRoute>}
          />
          <Route path="admin/orders"
            element={<ProtectedRoute isAdmin={true}>
              <OrderList />
            </ProtectedRoute>}
          />
          <Route path="admin/order/:id"
            element={<ProtectedRoute isAdmin={true}>
              <ProcessOrder />
            </ProtectedRoute>}
          />
          <Route path="admin/products"
            element={<ProtectedRoute isAdmin={true}>
              <ProductList />
            </ProtectedRoute>}
          />
          <Route path="admin/product"
            element={<ProtectedRoute isAdmin={true}>
              <NewProduct />
            </ProtectedRoute>}
          />
          <Route path="admin/users"
            element={<ProtectedRoute isAdmin={true}>
              <UsersList />
            </ProtectedRoute>}
          />
          <Route path="admin/user/:id"
            element={<ProtectedRoute isAdmin={true}>
              <UpdateUser />
            </ProtectedRoute>}
          />
          <Route path="admin/reviews"
            element={<ProtectedRoute isAdmin={true}>
              <ProductReviews />
            </ProtectedRoute>}
          />
          <Route path="admin/product/:id"
            element={<ProtectedRoute isAdmin={true}>
              <UpdateProduct />
            </ProtectedRoute>}
          />

          <Route path="password/forgot"
            element={<ProtectedRoute>
              <ForgotPassword />
            </ProtectedRoute>}
          />
          <Route path="shipping"
            element={<ProtectedRoute>
              <Shipping />
            </ProtectedRoute>}
          />
          <Route path="success"
            element={<ProtectedRoute>
              <OrderSuccess />
            </ProtectedRoute>}
          />
          <Route path="order/confirm"
            element={<ProtectedRoute>
              <ConfirmOrder />
            </ProtectedRoute>}
          />

          <Route path="/order/:id"
            element={<ProtectedRoute>
              <OrderDetails />
            </ProtectedRoute>}
          />
          {
            stripeApiKey && (
              <Route path="process/payment"
                element={<ProtectedRoute>
                  <Payment />
                </ProtectedRoute>}
              />
            )
          }

          <Route path="/password/reset/:token" element={<ResetPassword />} />
          <Route path="/cart" element={<Cart />} />
          <Route path='*' element={<NotFound />} />
        </Routes>

        <Footer />
      </Router>
    );
}

export default App;
