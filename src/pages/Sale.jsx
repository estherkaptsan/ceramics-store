import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loadItems } from '../store/actions/item.actions';
import { useLocation } from 'react-router-dom';
import ItemList from '../cmps/ItemList'

export default function Sale() {
    const items = useSelector((storeState) => storeState.itemModule.items);
    const dispatch = useDispatch();
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const filterByCategory = queryParams.get('category');

    useEffect(() => {
        const loadAllItems = async () => {
            await dispatch(loadItems(filterByCategory));
        };
        loadAllItems();
    }, [dispatch, filterByCategory]);

    const filteredSaleItems = items.filter(item => item.inSale);

    if (!filteredSaleItems) return <div>Loading data...</div>

    return (
        <div className='sale-items'>
            {/* <p className='sale-title'>SALE</p> */}
            {filteredSaleItems.map((item, index) => (
                <ItemList
                    item={item}
                    key={`${item._id}-${index}`} />
            ))}
        </div>
    )
}
