import React, { useEffect } from "react";
import { Offcanvas, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCartThunk, purchaseCartThunk } from "../store/slices/cart.slice";
import productsSlice from "../store/slices/products.slice";

const CartsSidebar = ({ show, handleClose }) => {
  
    const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
      dispatch(getCartThunk()); 
  },[])

  console.log(cart);

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Mis compras</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <ul>
        {
        cart.map(product => (
            <li key={product.id}>
                <Link to={`/productDetail/${product.id}`}>{product.title}</Link>
            </li>
        ))
        }
        </ul>
        <Button onClick={() => dispatch(purchaseCartThunk())}>
            Checkout
        </Button>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default CartsSidebar;

//https://ecommerce-api-react.herokuapp.com/api/v1/cart
