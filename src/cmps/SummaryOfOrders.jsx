import React from 'react';

export default function SummaryOfOrders({ orders }) {
    const pendingOrders = orders.filter(order => order.status === 'pending');
    const approvedOrders = orders.filter(order => order.status === 'approved');

    return (
        <div className='summary-of-orders'>
            <article className='orders'>All orders: {orders.length} </article>
            <article className='pending'>Pending orders: {pendingOrders.length}</article>
            <article className='approved'>Approved orders: {approvedOrders.length}</article>
        </div>
    )
}
