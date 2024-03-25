import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";

const CreditCardForm = () => {
    const navigate = useNavigate();

    const [state, setState] = useState({
        number: "",
        name: "",
        expiry: "",
        cvc: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState((prev) => ({ ...prev, [name]: value }));
    };

    const handleInputFocus = (e) => {
        setState((prev) => ({ ...prev, focus: e.target.name }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(state);
        // TODO: remove all items from cart
        
        navigate('/');
    };

    return (
        <div className="credit-card-form">
            <Cards
                number={state.number}
                expiry={state.expiry}
                cvc={state.cvc}
                name={state.name}
                focused={state.focus}
            />
            <div className="mt-3">
                <form className="form-control" onSubmit={handleSubmit}>
                    <input
                        type="number"
                        name="number"
                        placeholder="Card Number"
                        value={state.number}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        required
                    />
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        required
                    />
                    <input
                        type="number"
                        name="expiry"
                        placeholder="Valid Thru"
                        pattern="\d\d/\d\d"
                        value={state.expiry}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        required
                    />
                    <input
                        type="number"
                        name="cvc"
                        placeholder="CVC"
                        pattern="\d{3,4}"
                        value={state.cvc}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        required
                    />
                    <div className="">
                        <button type="submit" className="confirm-btn">Confirm</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default CreditCardForm;
