import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Shipping({onSaveBuyerDetails}) {
    const navigate = useNavigate();

    const [buyerDetails, setBuyerDetails] = useState({
        email: '',
        country: '',
        lastName: '',
        firstName: '',
        streetName: '',
        houseNumber: '',
        city: '',
        postalCode: '',
        phone: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBuyerDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        onSaveBuyerDetails(buyerDetails)
        navigate(`/payment`);
    };

    return (
        <div className='shipping-form'>
            <h2>Shipping Information</h2>
            <form onSubmit={handleSubmit} >

                <input type='email' name='email' value={buyerDetails.email} onChange={handleChange} placeholder='Email' required />

                <input type='text' name='country' value={buyerDetails.country} onChange={handleChange} placeholder='Country' required />

                <input type='text' name='lastName' value={buyerDetails.lastName} onChange={handleChange} placeholder='Last Name' required />

                <input type='text' name='firstName' value={buyerDetails.firstName} onChange={handleChange} placeholder='First Name' required />

                <input type='text' name='streetName' value={buyerDetails.streetName} onChange={handleChange} placeholder='Street Name' required />

                <input type='text' name='houseNumber' value={buyerDetails.houseNumber} onChange={handleChange} placeholder='House Number' required />

                <input type='text' name='city' value={buyerDetails.city} onChange={handleChange} placeholder='City' required />

                <input type='text' name='postalCode' value={buyerDetails.postalCode} onChange={handleChange} placeholder='Postal Code' required />

                <input type='text' name='phone' value={buyerDetails.phone} onChange={handleChange} placeholder='Phone' required />

                <button type='submit'>pay now</button>
            </form>
        </div>
    );
}
