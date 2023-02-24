import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../../actions/orderAction';

const CheckoutForm = () => {
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo")) || {};
    const [cardError, setCardError] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [clientSecret, setClientSecret] = useState("");
    const [processing, setProcessing] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { shippingInfo, cartItems } = useSelector((state) => state.cart) || {}
    const { user } = useSelector((state) => state.user) || {};
    console.log(user)
    const { error } = useSelector((state) => state.newOrder) || {}

    const paymentData = {
        amount: Math.round(orderInfo?.totalPrice * 100),
    };

    const order = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo?.subtotal,
        taxPrice: orderInfo?.tax,
        shippingPrice: orderInfo?.shippingCharges,
        totalPrice: orderInfo?.totalPrice,
        user
    };

    // useEffect(() => {
    //     // Create PaymentIntent as soon as the page loads
    //     fetch("https://ec-server.onrender.com/create-payment-intent", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({ price: paymentData?.amount }),
    //     })
    //         .then((res) => res.json())
    //         .then((data) => setClientSecret(data.clientSecret));
    // }, []);

    function getClientSecret() {
        fetch("https://ec-server.onrender.com/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ price: paymentData?.amount }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
        console.log('we got Client Secte')


    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return
        }
        const card = elements.getElement(CardElement)
        if (card === null) {
            return
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            console.log(error)
            alert.error(error.message)
        }
        setProcessing(true);
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.name,
                        email: user?.email,
                        address: {
                            line1: shippingInfo?.address,
                            city: shippingInfo?.city,
                            state: shippingInfo?.state,
                            postal_code: shippingInfo?.pinCode,
                            country: shippingInfo?.country,
                        },
                    }
                }
            }
        )
        if (confirmError) {
            alert.error(confirmError.message)
            return
        }
        if (paymentIntent.status === "succeeded") {
            alert.success("Your Payment Has been Successfull!!!")
            setTransactionId(paymentIntent.id)
            setProcessing(false)
            order.paymentInfo = {
                id: paymentIntent?.id,
                status: paymentIntent?.status,
            };
            dispatch(createOrder(order));
            navigate('/success')
        }
        setProcessing(false)
        console.log("Payment Intent", paymentIntent)
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn btn-success btn-sm mt-4' type="submit" disabled={!stripe || !clientSecret || processing}>
                    {`Pay - $-${orderInfo && orderInfo?.totalPrice}`}
                </button>
            </form>
            <button onClick={() => getClientSecret()}
                disabled={clientSecret}
            >Get Client Secret</button>
        </>
    )
}

export default CheckoutForm