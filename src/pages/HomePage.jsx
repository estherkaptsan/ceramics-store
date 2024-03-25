import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadItems, removeItem, loadCategories } from '../store/actions/item.actions';
import { Link } from 'react-router-dom';
// import vases from '../assets/imgs/vases.jpg';

export default function HomePage() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const categories = useSelector((storeState) => storeState.itemModule.categories)
    const imageUrls = [
        'https://images.unsplash.com/photo-1523976714396-3ee195e3b3a1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1590605105526-5c08f63f89aa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1523367662635-ec427c441fe6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ];
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadCategories());
    }, [dispatch]);


    useEffect(() => {

        imageUrls.forEach((imageUrl) => {
            const img = new Image();
            img.src = imageUrl;
        });

        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [imageUrls]);

    const backgroundImageStyle = {
        backgroundImage: `url(${imageUrls[currentImageIndex]})`,
    };

    if (!categories) {
        return <div>Loading data...</div>
    }

    return (
        <div className='home-page'>
            <div className='hero-container' style={backgroundImageStyle}>
            </div>
            <p className='shop-categories'>Shop Categories</p>
            <div className='categories'>
                {categories.map((category, index) => (
                    <article className='category' key={index} value={category}>
                        <Link key={index}
                            to={`/item/${encodeURIComponent(category.categoryName)}`}>
                            <img className='category-img' src={category.categoryImg} />
                            <p> {category.categoryName} </p>
                        </Link>
                    </article>
                ))}
            </div>
        </div>
    )
}
