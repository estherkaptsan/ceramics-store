import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadCategories } from '../store/actions/item.actions';
import { Link } from 'react-router-dom';
// import vases from '../assets/imgs/vases.jpg';

export default function HomePage() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const categories = useSelector((storeState) => storeState.itemModule.categories)
    const imageUrls = [
        'https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?q=80&w=1569&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1595351298020-038700609878?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1610206349499-c932c3b3aacb?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1621453571889-0b228e998080?q=80&w=1638&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
