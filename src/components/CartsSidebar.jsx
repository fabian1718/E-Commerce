import React, { useEffect } from "react";
import { Offcanvas, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCartThunk, purchaseCartThunk } from "../store/slices/cart.slice";
import productsSlice from "../store/slices/products.slice";
import '../styles/cartsSidebar.css'
import Total from "./Total";

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
        <Offcanvas.Title> <b>Carrito de compras</b></Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <ul className="container-product-cart">
        {
        cart.map(product => (
            <li key={product.id}>
                <div >
                   <div className="delette-cart">
                     <p className="product-p">{product.brand}</p>
                     <i class="fa-regular fa-trash-can i-delette"></i>
                   </div>
                    <Link className="link-cart" to={`/productDetail/${product.id}`}>{product.title}</Link>
                    <div className="cant-cart">{product.productsInCart.quantity}</div>
                    <div className="total-product-cart">
                        <p className="product-p">Total: </p>
                        <b className="link-cart">{(product.price) * (product.productsInCart.quantity)}</b>
                    </div>
                </div >
            </li>
        ))
        }
        </ul>
        <li>
            <div className="total-general">
                <p className="product-p">Total </p>
                <Total cart={cart}/>
            </div>
        </li>
        <Button 
          onClick={
            () => dispatch(purchaseCartThunk())
            
            }>
            Checkout
        </Button>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default CartsSidebar;

//https://ecommerce-api-react.herokuapp.com/api/v1/cart
