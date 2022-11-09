import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { BUTTON_TYPE_CLASSES } from "../button/button.component";
import React, { useState } from "react";

import { FormContainer, PaymentButton, PaymentFormContainer } from "./payment-form.styles";
import { useSelector } from "react-redux";
import { selectCartTotal } from "../../Slice/memoized_selectors/cart.selector";
import { currentUserSlice } from "../../Slice/AsynThunkReducers/userSlice";


// const CARD_OPTIONS = {
//     iconStyle: 'solid',
//     style: {
//         base: {
//             iconColor: '#c4f0ff',
//             color: '#fff',
//             fontWeight: 500,

//         },
//         invalid: {
//             iconColor: '#ffc7ee',
//             color: '#ffc7ee',
//         }
//     }
// }
const PaymentForm = () => {
  const stripe = useStripe();
    const elements = useElements();
    const amount = useSelector(selectCartTotal)
    const currentUser = useSelector(currentUserSlice)
    const [isProcessingPayment,setIsProcessingPayment]=useState(false)
  const paymentHandler = async (e) => {
   // console.log("a");
    e.preventDefault();

    if (!stripe || !elements) {
      return;
      }
      setIsProcessingPayment(true)
      
       const response = await fetch("/.netlify/functions/create-payment-intent", {
              method: "post",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                  amount:amount*100
              }),
          }).then((res) => res.json());
    
    const {
      paymentIntent: { client_secret },
    } = response;

    

    
     const paymentResult = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          type: "card",
          card: elements.getElement(CardElement), //get the number enter in the card textview
          billing_details: {
            name:currentUser? currentUser.displayName:'Guest'
          },
        },
     });
      setIsProcessingPayment(false)
    
    if (paymentResult.error) {
      alert(paymentResult.error);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        alert("payment SuccessFull");
      }
    }
  };
  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Credit Card Payment: </h2>
        <CardElement />
        <PaymentButton isLoading={isProcessingPayment} buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay Now</PaymentButton>
      </FormContainer>
    </PaymentFormContainer>
  );
};

export default PaymentForm;

//  const clientSecret=response.paymentIntent.client_secret
