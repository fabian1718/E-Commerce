import React, { useEffect } from 'react';
import { ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Total from '../components/Total';
import { getFavoritesThunk } from '../store/slices/purchases.slice';

const Purchases = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const purchases = useSelector((state) => state.purchases);

    useEffect(() => {
        dispatch(getFavoritesThunk());
    }, []);
    console.log(purchases)

  return (
    <div className='conatiner-purchase'>
      <h1>Mis compras</h1>
      <ListGroup>
        {purchases.map((purchase) => (
          <ListGroup.Item>
            {purchase.cart.products.map((product) => (
                <div key={product.id} onClick={() => navigate(`/productDetail/${product.id}`)}> <h5 className='h5-purchase'>{product.title}</h5></div>
            ))}
            <br />
            <b>Total: </b>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};


export default Purchases;