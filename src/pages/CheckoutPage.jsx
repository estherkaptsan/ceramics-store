import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartPage from '../pages/CartPage';
import Shipping from '../cmps/Shipping';

export default function CheckoutPage() {
    const cartItemsId = useSelector(state => state.cartModule.itemsInCart);
    const dispatch = useDispatch();

    const onSaveBuyerDetails = useCallback(
        async (buyerDetails) => {
            console.log(buyerDetails);
            //   try {
            //     dispatch(updateOrder(buyerDetails, cartItemsId));
            //   } catch (error) {
            //     console.log('error:', error);
            //   }
        },
        [dispatch]
    );

    return (
        <div className='checkout-page'>
            <section className='cart-in-checkout'>
                <CartPage />
            </section>

            <section className='checkout-details'>
                <section className='shiping-in-checkout'>
                    <Shipping onSaveBuyerDetails={onSaveBuyerDetails} />
                </section>
            </section>
        </div>
    )
}
