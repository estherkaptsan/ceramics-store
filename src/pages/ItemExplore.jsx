import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { loadItems, removeItem, loadCategories, setFilterBy } from '../store/actions/item.actions';
import ItemList from '../cmps/ItemList';

export default function ItemExplore() {
  const { category } = useParams();
  const location = useLocation();
  const items = useSelector((storeState) => storeState.itemModule.items) || [];
  const categories = useSelector((storeState) => storeState.itemModule.categories);
  const filterBy = useSelector((storeState) => storeState.itemModule.filterBy);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const filterByCategory = queryParams.get('category');

  useEffect(() => {
    const loadAllItems = async () => {
      await dispatch(loadItems(filterByCategory));
      await dispatch(loadCategories());
    };

    loadAllItems();
  }, [dispatch, filterByCategory]);

  const onChangeFilter = useCallback(
    (selectedCategory) => {
      const { category } = selectedCategory;
      navigate(`/item/${category}`);
      dispatch(setFilterBy(selectedCategory));
    },
    [dispatch, navigate]
  );

  useEffect(() => {
    if (filterByCategory && filterByCategory !== category) {
      onChangeFilter({ category: filterByCategory });
    }
  }, [category, filterByCategory, onChangeFilter]);

  const onRemoveItem = useCallback(
    async (ItemId) => {
      try {
        dispatch(removeItem(ItemId));
      } catch (error) {
        console.log('error:', error);
      }
    },
    [dispatch, items]
  );

  const filteredItems = items.filter(item => item.category === category);

  if (!filteredItems) return <div>loading data...</div>

  return (
    <>
      <p className='category-title'>{category}</p>
      <div className='item-explore'>
        {filteredItems.map((item, index) => (
          <ItemList
            onRemoveItem={onRemoveItem}
            item={item}
            key={`${item._id}-${index}`} />
        ))}
      </div>
    </>
  )
}
