import React from 'react';

export default function OrderPreview({ order, onRemoveOrder, onApproveOrder }) {
  const statusStyle = {
    color: order.status === 'approved' ? 'red' : 'inherit',
  };

  return (
    <article className='order-preview'>
            <section>{order.buyer.firstName}</section>
            <section style={statusStyle}>{order.status}</section>
            <section>{order.totalPrice}</section>
            <section>{order.items.map(item => <p key={item._id}>{item.title}</p>)}</section>
            <section>{order.items.map(item => <p key={item._id}>{item.price}</p>)}</section>
            <section><button onClick={() => onRemoveOrder(order._id)}>Remove</button></section>
            {order.status !== 'approved' &&
              <section><button onClick={() => onApproveOrder(order)}>Approve</button></section>
            }
    </article>
  );
}
