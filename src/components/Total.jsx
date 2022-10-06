import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { sumCart } from '../store/slices/total.slice';

const Total = ({cart}) => {

    const [ sumCant, setSumCant ] = useState(0);

    // const dispatch = useDispatch();

    // const load = () => {
    //     dispatch(sumCart());
    // }
        
    let sum = 0;

    for (let i = 0; i < cart.length; i++) {
        sum += ((cart[i].productsInCart.quantity) * parseFloat(cart[i].price))
    }
    
    return (
        <div>
            <p> <b> $ {sum} </b></p>
        </div>
    );
};

export default Total;