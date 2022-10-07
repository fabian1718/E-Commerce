import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { addProductCartThunk } from "../store/slices/cart.slice";
import Carousel from "react-bootstrap/Carousel";

const ProductDetail = () => {
  const { id } = useParams();

  const productsList = useSelector((state) => state.products);

  const productsDetail = productsList.find(
    (products) => products.id === Number(id)
  );
  const relatedProducts = productsList.filter(
    (products) => products.category.id === productsDetail.category.id
  );

  useEffect(() => {
    setRate(1);
  }, [id]);

  const dispatch = useDispatch();

  const [rate, setRate] = useState(0);

  const addCart = () => {
    alert("Haz añadido " + rate + " productos a tu carrito");
    const cart = {
      id: id,
      quantity: rate,
    };
    dispatch(addProductCartThunk(cart));
  };

  console.log(relatedProducts);

  return (
    <div>
      <div className="container-all">
        <div className="container-carousel">
          
          <Carousel className="">
            <Carousel.Item interval={1000}>
              <img
                style={{ height: 300, objectFit: "contain" }}
                className="d-block w-100"
                src={productsDetail?.productImgs?.[0]}
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item interval={500}>
              <img
                style={{ height: 300, objectFit: "contain" }}
                className="d-block w-100"
                src={productsDetail?.productImgs?.[1]}
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                style={{ height: 300, objectFit: "contain" }}
                className="d-block w-100"
                src={productsDetail?.productImgs?.[2]}
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>

          <div>
            <h4>
              <b>{productsDetail?.title}</b>
            </h4>
            <p>{productsDetail?.description}</p>
            <div className="rate">
              <div className="container-btn-add-cart">
                <div>
                  <b>$ {productsDetail.price}</b>
                </div>
                <div className="btn-add-cart">
                  <Button
                    variant="light"
                    className="me-3"
                    onClick={() => setRate(rate - 1)}
                  >
                    -
                  </Button>
                  <div>{rate}</div>
                  <Button
                    variant="light"
                    className="ms-3"
                    onClick={() => setRate(rate + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>
              <br />
              <Button onClick={addCart}>Añadir al carrito</Button>
            </div>
          </div>
        </div>
        <h3>Compara con otros productos similares</h3>
        <ul className="grup-similar">
          {relatedProducts.map((products) => (
            <li key={products.id}>
              <img
                style={{ height: 150, objectFit: "contain" }}
                className="img-similar"
                src={products.productImgs[1]}
                alt=""
              />
              <Link to={`/productDetail/${products.id}`}>{products.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductDetail;
