import React, { Fragment, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Typography } from "@material-ui/core";
import { useAlert } from "react-alert";
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements,
    CardElement,
} from "@stripe/react-stripe-js";

import axios from "axios";
import "./payment.css";
import { FiMail } from 'react-icons/fi';
import { createOrder, clearErrors } from "../../actions/orderAction";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";

const API_KEY = 'pk_test_51L0l3aDIahaKXnTeiATjHgffljac8OyDTEMyVn0KIsKESv0LjifHOm5c2Y8vcXyhHSvzEZB265lqIC87Cgij288F00cYoKwWBs';

const stripePromise = loadStripe(
    "pk_test_51L0l3aDIahaKXnTeiATjHgffljac8OyDTEMyVn0KIsKESv0LjifHOm5c2Y8vcXyhHSvzEZB265lqIC87Cgij288F00cYoKwWBs"
)

const CheckoutForm = () => {
    const navigate = useNavigate()
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

    const dispatch = useDispatch();
    const alert = useAlert();
    const stripe = useStripe();
    const elements = useElements();
    const payBtn = useRef(null);
    const [clientSecret, setClientSecret] = useState("");


    const { shippingInfo, cartItems } = useSelector((state) => state.cart) || {}
    const { user } = useSelector((state) => state.user) || {}
    const { error } = useSelector((state) => state.newOrder) || {}

    const paymentData = {
        amount: Math.round(orderInfo?.totalPrice),
    };

    const order = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo?.subtotal,
        taxPrice: orderInfo?.tax,
        shippingPrice: orderInfo?.shippingCharges,
        totalPrice: orderInfo?.totalPrice,
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        payBtn.current.disabled = true;

        try {
            fetch('https://ec-server.onrender.com/api/v1/payment/process', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `Bearer sk_test_51L0l3aDIahaKXnTe0u0ZQPqD2DoWj712k0z4mFTJED9ymPTPnJVstJxcSkeB6LqTsMs2qfhrfCAYzU7wztrdvpY200muWiDZT3`
                },
                body: JSON.stringify({ paymentData })
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data?.clientSecret) {
                        setClientSecret(data?.clientSecret)
                    }
                });

            const client_secret = clientSecret;

            if (!stripe || !elements) return;
            const card = elements.getElement(CardElement);
            if (card == null) {
                return
            }
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card
            });

            // confirm card payment
            const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(clientSecret
                ,
                {
                    payment_method: {
                        card: card,
                        billing_details: {
                            name: user?.name,
                            email: user?.email,
                        },
                    },
                },
            );
            if (intentError) {
                console.log(intentError?.message)

                alert.error(intentError?.message);
            } else {
                console.log('COngreates!@! Your Payment is compleated');

            }
        } catch (error) {
            payBtn.current.disabled = false;
            alert.error(error.response.data.message);
        }
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, error, alert]);

    return (
        <Fragment>
            <MetaData title="Payment" />

            <div className="paymentContainer">
                <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
                    <Typography>Card Info</Typography>
                    <div>
                        <FiMail />
                        <CardNumberElement className="paymentInput" />
                    </div>
                    <div>
                        <FiMail />
                        <CardExpiryElement className="paymentInput" />
                    </div>
                    <div>
                        <FiMail />
                        <CardCvcElement className="paymentInput" />
                    </div>

                    <input
                        type="submit"
                        value={`Pay - ${orderInfo && orderInfo.totalPrice}`}
                        ref={payBtn}
                        className="paymentFormBtn"
                    />
                </form>
            </div>
        </Fragment>
    );
};

export default CheckoutForm;