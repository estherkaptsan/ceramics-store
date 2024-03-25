import React, { useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeItemFromCart } from '../store/actions/cart.actions';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

export default function CartPage() {
  const cartItems = useSelector(state => state.cartModule.itemsInCart);
  const items = useSelector(state => state.itemModule.items);
  const dispatch = useDispatch();
  const location = useLocation();

  const isCheckoutPage = location.pathname === '/checkout';

  const onRemoveItemFromCart = (itemId) => {
    dispatch(removeItemFromCart(itemId));
  };
  
  const totalPrice = cartItems.reduce((total, itemId) => {
    const item = items.find(item => item._id === itemId);
    if (item) {
      return total += item.price;
    }
    return total;
  }, 0);

  if (!cartItems || !items) return <div>Loading data...</div>;

  return (
    <>
      <div className='cart-page'>
        <h2>{cartItems.length} items</h2>

        <div>
          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <>
              <div className='cart-items'>
                {cartItems.map((itemId, index) => (
                  <Link key={index} to={`/details/${itemId}`}>
                    <article key={index} className='cart-item'>
                      <img src={items.find(item => item._id === itemId)?.mediaUrl.url} />
                      <p>{items.find(item => item._id === itemId)?.title}</p>
                      <p>₪{items.find(item => item._id === itemId)?.price}</p>
                      <button
                        className="delete-button"
                        onClick={() => onRemoveItemFromCart(itemId)}
                      >
                        <FontAwesomeIcon className='icon-delete' icon={faTrashAlt} />
                      </button>
                    </article>
                  </Link>
                ))}
              </div>
            </>
          )}

          {!isCheckoutPage &&  cartItems.length > 0 &&(
            <>
            <p>Total Price: ₪{totalPrice}</p>
              <Link to="/checkout" className='checkout-link'>
                <span> ₪{totalPrice}</span> TO THE CASH REGISTER <FontAwesomeIcon icon={faLock} />
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );

}
