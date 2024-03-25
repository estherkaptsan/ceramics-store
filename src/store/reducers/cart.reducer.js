export const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART';
export const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART';

const INITIAL_STATE = {
    itemsInCart: [],
};

export function cartReducer(state = INITIAL_STATE, action = {}) {

    switch (action.type) {
        case ADD_ITEM_TO_CART:
            return {
                ...state,
                itemsInCart: [...state.itemsInCart, action.itemId]
            }
        case REMOVE_ITEM_FROM_CART:
            return {
                ...state,
                itemsInCart: state.itemsInCart.filter(itemId => itemId !== action.itemId)
            }
        
        default:
            return state;
    }
}