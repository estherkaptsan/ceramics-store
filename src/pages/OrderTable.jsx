import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadOrders, removeOrder, updateOrder } from '../store/actions/order.action';
import OrderList from '../cmps/OrderList';

export default function OrderTable() {
    const orders = useSelector((storeState) => storeState.orderModule.orders);
    const dispatch = useDispatch();

    useEffect(() => {
        const loadAllOrders = async () => {
            await dispatch(loadOrders());
        };

        loadAllOrders();
    }, [dispatch]);

    const onRemoveOrder = useCallback(async (orderId) => {
        try {
            dispatch(removeOrder(orderId))
        } catch (error) {
            console.log('error:', error)
        }
    }, [])

    const onApproveOrder = useCallback(async (order) => {
        try {
            dispatch(updateOrder(order))
        } catch (error) {
            console.log('error:', error)
        }
    }, [])

    if (!orders) return <div>Loading data....</div>

    return (
        <div className='order-table'>
            <OrderList orders={orders}
                onRemoveOrder={onRemoveOrder}
                onApproveOrder={onApproveOrder} />
        </div>
    )
}
