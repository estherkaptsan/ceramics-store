import React from 'react';
import CreditCardForm from '../cmps/CreditCardForm';
import { PaymentForm } from 'react-square-web-payments-sdk';
import { CreditCard } from "react-square-web-payments-sdk";

export default function PaymentPage() {
  
  return (
    <div className='payment-page'>
      <CreditCardForm />
 
    </div>
  )
}
