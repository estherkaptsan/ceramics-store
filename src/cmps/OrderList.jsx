import React from 'react'
import OrderPreview from './OrderPreview'

export default function OrderList({ orders, onRemoveOrder, onApproveOrder }) {
  return (
    <div>
      {orders.map(order =>
        <OrderPreview order={order}
          onRemoveOrder={onRemoveOrder}
          onApproveOrder={onApproveOrder}
          key={order._id} />
      )}
    </div>
  )
}
