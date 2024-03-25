import { orderService } from "../../services/order.service"
import { REMOVE_ORDER, SET_FILTER_BY, SET_ORDERS, APPROVE_ORDER } from "../reducers/order.reducer"

export function loadOrders() {
    return async (dispatch, getState) => {
        try {
            const orders = await orderService.query(getState().orderModule.filterBy)
            const action = {
                type: SET_ORDERS,
                orders
            }
            dispatch(action)
        } catch (error) {
            console.log('error:', error)
        }
    }
}

export function updateOrder(order, buyerDetails) {
    console.log(order);
    return async (dispatch, getState) => {
        try {
            const updatedOrder = await orderService.save(order, 'approved', buyerDetails);
            dispatch({ type: APPROVE_ORDER, order: updatedOrder });
        } catch (error) {
            console.log('error:', error)
        }
    }
}

export function removeOrder(orderId) {
    return async (dispatch) => {
        try {
            await orderService.remove(orderId)
            const action = { type: REMOVE_ORDER, orderId }
            dispatch(action)
            return 'Removed!'
        } catch (error) {
            console.log('error:', error)
        }
    }
}

export function setFilterBy(filterBy) {
    return (dispatch) => {
        dispatch({ type: SET_FILTER_BY, filterBy })
    }
}