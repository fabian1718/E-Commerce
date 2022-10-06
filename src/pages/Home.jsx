import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form, InputGroup  } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../styles/home.css'


const Home = () => {

    const productsList = useSelector(state => state.products)
    const navigate = useNavigate()
    const [categoryProds, setCategoryProd] = useState([])
    const [productsFiltered, setProductsFiltered] = useState([])
    const [searchValue, setSearchValue] = useState('')
    useEffect(() => {
        axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products/categories')
            .then(res => setCategoryProd(res.data.data.categories))
    }, [])

    useEffect(() => {
        setProductsFiltered(productsList)
    }, [productsList])

    const filterCategoryProds = (categoryProdsid) => {
        const productsFiltered = productsList.filter((products) => products.category.id === categoryProdsid)
        setProductsFiltered(productsFiltered)
    }

    const searchProduct = () => {
        const filtered = productsList.filter(
            products => products.title.toLowerCase().includes(searchValue.toLowerCase())
        ); setProductsFiltered(filtered)
    }

    return (
        <div>
            <h3 className='h3-home'>Inicio</h3>
            <div className='container-btns-category'>
                {
                    categoryProds.map(categoryProd => (
                            <Button className='btn-category'  key={categoryProd.id} onClick={() => filterCategoryProds(categoryProd.id)}>{categoryProd.name}</Button>
                    ))
                }
            </div>
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Search Product"
                    onChange={(e) => setSearchValue(e.target.value)}
                    value={searchValue}
                />
                <Button variant="outline-secondary" onClick={searchProduct}>
                    Button
                </Button>
            </InputGroup>
            <ul className='container-products'>
                {productsFiltered.map(products => (
                    <li className='product-home' key={products.id} onClick={() => navigate(`/productDetail/${products.id}`)}>
                        <div className='container-img-product'>
                            <img style={{width:250}} className='img-home' src={products.productImgs?.[0]} alt={products.title} />
                        </div>
                        <h4>{products.title}</h4>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;