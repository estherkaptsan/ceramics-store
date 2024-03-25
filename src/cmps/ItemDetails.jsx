import React, { useEffect, useState, useCallback } from 'react';
import { itemService } from '../services/item.service';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadItems, removeItem, setFilterBy, loadCategories } from '../store/actions/item.actions';
import { addToCart } from '../store/actions/cart.actions';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons"

export default function ItemDetails(props) {
  const [item, setItem] = useState(null);
  const [itemIds, setItemIds] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const items = useSelector((storeState) => storeState.itemModule.items);
  const filterBy = useSelector((storeState) => storeState.itemModule.filterBy);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadItems());
  }, [dispatch]);

  useEffect(() => {
    loadItemIds();
    loadItem();
  }, [params._id]);

  useEffect(() => {
    if (item) {
      const { category } = item;
    }
  }, [item]);

  const onChangeFilter = useCallback(
    (category) => {
      dispatch(setFilterBy({ ...filterBy, category: category }));
      dispatch(loadItems());
    },
    [dispatch, filterBy]
  );

  async function loadItemIds() {
    try {
      const ids = items.map((item) => item._id);
      setItemIds(ids);
    } catch (error) {
      console.log('error:', error);
    }
  }

  async function loadItem(nextIndex) {
    let item = '';
    try {
      if (nextIndex) {
        item = await itemService.getItemById(nextIndex);
      } else {
        item = await itemService.getItemById(params.id);
      }
      setItem(item);
    } catch (error) {
      console.log('error:', error);
    }
  }

  function onBack() {
    navigate(`/item/${item.category}`);
  }

  const onAddToCart = (itemId) => {
    dispatch(addToCart(itemId));
    console.log(itemId, 'add to cart this item');
  };

  if (!item) return <div className='loader'>Loading data...</div>

  return (
    <section className="item-details">
      <img src={item.mediaUrl.url} className='left-details' />

      <section className='right-details'>
        <h3>{item.title}</h3>

        {(item.inSale && item.numOfItemsInStock > 0) ?
          <p className='sale-price'>
            <span>₪{item.price}</span> ₪{item.salePrice}</p> : <p> ₪{item.price}</p>}
        {(item.inSale && item.numOfItemsInStock > 0) ? <p>SALE</p> : null}

        <p>{item.description}</p>

        {item.numOfItemsInStock === 0
          ? <p className='out-of-stock'>OUT OF STOCK</p>
          : <button
            className="add-to-cart"
            onClick={() => onAddToCart(item?._id)}>ADD TO CART</button>}

      </section>
    </section>
  );
}
