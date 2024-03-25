import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPencil, faTrashAlt } from "@fortawesome/free-solid-svg-icons"

export default function ItemPreview({ item, onRemoveItem }) {
  const loggedInUser = useSelector((state) => state.userModule.loggedInUser);

  if (!item) return <div>Loading data...</div>;

  return (
    <article className='item-preview'>
      {loggedInUser && (
        <div className="edit-delete-buttons">
          <Link to={`/item/edit/${item._id}`} className="edit-link">
            <FontAwesomeIcon className='icon-edit' icon={faPencil} />
          </Link>
          <button
            className="delete-button"
            onClick={() => onRemoveItem(item._id)}
          >
            <FontAwesomeIcon className='icon-delete' icon={faTrashAlt} />
          </button>
        </div>
      )}

      {item.inSale && item.numOfItemsInStock > 0 && (
        <p className='sale-label'>SALE</p>
      )}
      {item.numOfItemsInStock === 0 && (
        <p className='out-of-stock-label'>OUT OF STOCK</p>
      )}

      <Link to={`/details/${item._id}`} className='details-link'>
        {!item.mediaUrl.url ? (
          <p>Details</p>
        ) : (
          <img src={item.mediaUrl.url} alt={item.title} />
        )}
        <section className='title-and-price'>
          <p className='item-title'>{item.title}</p>
          <p className='item-price'>₪{item.price}</p>
        </section>
      </Link>
    </article>
  );
}
