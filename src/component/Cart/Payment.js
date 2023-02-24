import React, { Fragment, useEffect, useRef } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import MetaData from "../layout/MetaData";
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm.js';
import "./payment.css";
import {
    Elements,
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(
    "pk_test_51L0l3aDIahaKXnTeiATjHgffljac8OyDTEMyVn0KIsKESv0LjifHOm5c2Y8vcXyhHSvzEZB265lqIC87Cgij288F00cYoKwWBs"
)
console.log(stripePromise)
const Payment = () => {
    return (
        <>
            <MetaData title="Payment" />
            <CheckoutSteps activeStep={2} />
            <Elements stripe={stripePromise}>
                <CheckoutForm />
            </Elements>
        </>
    );
};
export default Payment;