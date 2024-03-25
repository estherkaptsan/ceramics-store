import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faBars } from "@fortawesome/free-solid-svg-icons";

export default function AppHeader() {
    const cartItems = useSelector(state => state.cartModule.itemsInCart);
    const location = useLocation();
    const loggedInUser = useSelector((state) => state.userModule.loggedInUser);
    const [showMenu, setShowMenu] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const isCheckoutPage = location.pathname === '/checkout';

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    if (!cartItems) return <div>Loading data...</div>
    return (
        <nav className='app-header'>
            {isCheckoutPage ? (
                <Link to="/" className="logo checkout-header">
                    TM
                </Link>
            ) : (
                <>
                    <Link to="/" className="logo">
                        TM
                    </Link>
                    {showMenu && (
                        <div className="menu-icon" onClick={toggleMenu}>
                            <FontAwesomeIcon icon={faBars} />
                        </div>
                    )}
                    {/* {!showMenu && ( */}
                    <ul className={showMenu ? "nav-links" : "nav-links"} onClick={toggleMenu}>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link className='sale-link' to="/sale">Sale</Link></li>
                        {loggedInUser && (
                            <li><Link to="/item/edit">Edit</Link></li>
                        )}
                        <li>
                            <Link to="/cart">
                                <FontAwesomeIcon className='icon-t-shirt' icon={faShoppingCart} /> Cart ({cartItems.length})
                            </Link>
                        </li>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/dashboard">Dashboard</Link></li>
                        {/* {loggedInUser && isAdmin && (
                            <li><Link to="/dashboard">Dashboard</Link></li>
                        )} */}
                    </ul>
                </>
            )}
        </nav>
    )
}
