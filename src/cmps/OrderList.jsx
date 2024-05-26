import React from 'react'
import OrderPreview from './OrderPreview'

export default function OrderList({ orders, onRemoveOrder, onApproveOrder }) {
  const tableTitles = [
    'Buyer',
    'Status',
    'Total Price',
    'Item Title',
    'Item Price',
    'Remove Item',
    'Change status'
  ];

  return (
    <div className='order-list'>
      <div className='order-title'>
          {tableTitles.map((title, index) =>
            <section key={index}>{title}</section>
          )}
      </div>
      {orders.map(order =>
        <OrderPreview order={order}
          onRemoveOrder={onRemoveOrder}
          onApproveOrder={onApproveOrder}
          key={order._id} />
      )}
    </div>
  )
}
