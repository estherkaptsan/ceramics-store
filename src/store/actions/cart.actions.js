import { ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART } from "../reducers/cart.reducer"

export const addToCart = (itemId) => ({
  type: ADD_ITEM_TO_CART,
  itemId: itemId, 
});

export function removeItemFromCart(itemId) {
  return async (dispatch) => {
    try {
      dispatch({ type: REMOVE_ITEM_FROM_CART, itemId }); 
      return 'Removed from cart!'; 
    } catch (error) {
      console.log('Error:', error);  
    }
  };
}
