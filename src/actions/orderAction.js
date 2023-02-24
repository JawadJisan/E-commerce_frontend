import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_FAIL,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  ALL_ORDERS_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/orderConstants";

import axios from "axios";

// Create Order
export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("https://ec-server.onrender.com/api/v1/order/new", order, config);
    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// My Orders
export const myOrders = (user) => async (dispatch) => {
  try {
    //   dispatch({ type: MY_ORDERS_REQUEST });
    //   const users = {
    //     id: '54564654'
    //   }
    //   const config = { headers: { "Content-Type": "multipart/form-data" } };
    const token = JSON.parse(localStorage.getItem("auth"))
    // console.log(token?.accessToken)
    //   // const { data } = await axios.get("https://ec-server.onrender.com/api/v1/orders/me", users);
    //   const { data } = await axios.get('https://ec-server.onrender.com/api/v1/orders/me', { headers: { Authorization: 'fas' } });

    fetch('https://ec-server.onrender.com/api/v1/orders/me', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer my_token',
        'User-Agent': 'my_user_agent',
        'token': token?.accessToken
      }
    })
      .then(response => response.json())
      .then(data => {
        dispatch({ type: MY_ORDERS_SUCCESS, payload: data?.orders });
        console.log(data)
      })
    // dispatch({ type: MY_ORDERS_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({
      type: MY_ORDERS_FAIL,
      payload: error.response?.data?.message,
    });
  }
};

// Get All Orders (admin)
export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ORDERS_REQUEST });
    const token = JSON.parse(localStorage.getItem("auth"))

    const { data } = await axios.get("https://ec-server.onrender.com/api/v1/admin/orders", {
      headers: {
        'token': token?.accessToken
      }
    });

    dispatch({ type: ALL_ORDERS_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({
      type: ALL_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Order
export const updateOrder = (id, order) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER_REQUEST });
    const token = JSON.parse(localStorage.getItem("auth"))
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `https://ec-server.onrender.com/api/v1/admin/order/${id}`,
      order
      , {
        headers: {
          'token': token?.accessToken
        }
      }
    );

    dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Order
export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ORDER_REQUEST });
    const token = JSON.parse(localStorage.getItem("auth"))
    const { data } = await axios.delete(`https://ec-server.onrender.com/api/v1/admin/order/${id}`, {
      headers: {
        'token': token?.accessToken
      }
    });

    dispatch({ type: DELETE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Order Details
export const getOrderDetails = (id) => async (dispatch) => {
  try {
    const token = JSON.parse(localStorage.getItem("auth"))
    dispatch({ type: ORDER_DETAILS_REQUEST });

    const { data } = await axios.get(`https://ec-server.onrender.com/api/v1/order/${id}`, {
      headers: {
        'token': token?.accessToken
      }
    });

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};