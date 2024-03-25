import React from 'react';
import ItemPreview from './ItemPreview';

export default function ItemList({ item, onRemoveItem }) {

  return (
    <div className='item-list'>
      <ItemPreview
        onRemoveItem={onRemoveItem}
        item={item}
        key={`${item._id}`} />
    </div>
  );
}
