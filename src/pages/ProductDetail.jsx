import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { addProductCartThunk } from "../store/slices/cart.slice";

const ProductDetail = () => {
  const { id } = useParams();

  const productsList = useSelector((state) => state.products);

  const productsDetail = productsList.find(
    (products) => products.id === Number(id)
  );
  const relatedProducts = productsList.filter(
    (products) => products.category.id === productsDetail.category.id
  );

  //   Nuevo funciona añadir

  useEffect(() => {
    setRate(5);
  }, [id]);

  const dispatch = useDispatch();

  const [rate, setRate] = useState(5);

  const addCart = () => {
    alert("rate: " + rate);
    const cart = {
      id: id,
      quantity: rate,
    };
    dispatch(addProductCartThunk(cart));
  };

  //Nuevo hasta aqui funciona

  return (
    <div>
      <h3>Producto</h3>
      <div>
        {/* //Nuevo funciona */}
        <div className="rate">
          <Button className="me-3" onClick={() => setRate(rate - 1)}>
            -
          </Button>
          {rate}
          <Button className="ms-3" onClick={() => setRate(rate + 1)}>
            +
          </Button>
          <br />
          <Button onClick={addCart}>Add to cart</Button>
        </div>

        {/* //Nuevo hasta aqui funciona */}

        <ul>
          {relatedProducts.map((products) => (
            <li key={products.id}>
              <Link to={`/productDetail/${products.id}`}>{products.title}</Link>
            </li>
          ))}
        </ul>
        <h2>{productsDetail?.title}</h2>
        <p>{productsDetail?.description}</p>
        <img
          src={productsDetail?.productImgs?.[0]}
          alt={productsDetail?.title}
        />
        <img
          src={productsDetail?.productImgs?.[1]}
          alt={productsDetail?.title}
        />
        <img
          src={productsDetail?.productImgs?.[2]}
          alt={productsDetail?.title}
        />
      </div>
    </div>
  );
};

export default ProductDetail;
