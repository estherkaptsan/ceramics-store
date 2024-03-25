import React from 'react';

export default function OrderPreview({ order, onRemoveOrder, onApproveOrder }) {
  const tableTitles = [
    'Buyer',
    'Status',
    'Total Price',
    'Item Title',
    'Item Price',
    'Remove Item',
  ];

  const statusStyle = {
    color: order.status === 'approved' ? 'red' : 'inherit',
  };

  return (
    <article className='order-preview'>
      <table>
        <thead>
          <tr>
            {tableTitles.map((title, index) =>
              <th key={index}>{title}</th>
            )}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{order.buyer.firstName}</td>
            <td style={statusStyle}>{order.status}</td>
            <td>{order.totalPrice}</td>
            <td>{order.items.map(item => <p key={item._id}>{item.title}</p>)}</td>
            <td>{order.items.map(item => <p key={item._id}>{item.price}</p>)}</td>
            <td><button onClick={() => onRemoveOrder(order._id)}>Remove</button></td>
            {order.status !== 'approved' &&
              <td><button onClick={() => onApproveOrder(order)}>Approve</button></td>
            }
          </tr>
        </tbody>
      </table>
    </article>
  );
}
