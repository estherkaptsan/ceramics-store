
export const SET_ORDERS = 'SET_ORDERS'
export const ADD_ORDER = 'ADD_ORDER'
export const REMOVE_ORDER = 'REMOVE_ORDER'
export const APPROVE_ORDER = 'APPROVE_ORDER'
export const UPDATE_ORDER = 'UPDATE_ORDER'
export const SET_FILTER_BY = 'SET_FILTER_BY'

const INITIAL_STATE = {
    orders: null,
    filterBy: {
        Buyer: '',
        Status: '',
        TotalPrice: '',
        ItemTitle: '',
        ItemPrice: '',
    }
}

export function orderReducer(state = INITIAL_STATE, action = {}) {

    switch (action.type) {
        case SET_ORDERS:
            return {
                ...state,
                orders: action.orders
            }
        case ADD_ORDER:
            return {
                ...state,
                orders: [...state.orders, action.order]
            }
        case APPROVE_ORDER:
            return {
                ...state,
                orders: state.orders.filter(order => order._id !== action.orderId)
            }
        case REMOVE_ORDER:
            return {
                ...state,
                orders: state.orders.filter(order => order._id !== action.orderId)
            }
        case UPDATE_ORDER:
            return {
                ...state,
                orders: state.orders.map(order => order._id === action.order._id ? action.order : order)
            }
        case SET_FILTER_BY:
            return {
                ...state,
                filterBy: { ...action.filterBy }
            }

        default:
            return state;
    }
}