import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { HashRouter, Route, Routes } from "react-router-dom";
import Login from './pages/Login'
import ProductDetail from './pages/ProductDetail'
import Purchases from './pages/Purchases'
import Home from './pages/Home';
import MyNavbar from './components/MyNavbar';
import LoadingScreen from './components/LoadingScreen';
import { useDispatch, useSelector } from "react-redux";
import { getProductsThunk } from './store/slices/products.slice';
import ProtectedRoutes from './components/ProtectedRouters';
import { Container } from 'react-bootstrap';

function App() {
  const isLoading = useSelector(state => state.isLoading)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProductsThunk())
  }, [])

  return (
    
    <HashRouter>
      <MyNavbar />
      {isLoading && <LoadingScreen />}
      <Container className='mt-1'>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/productDetail/:id" element={<ProductDetail />}/>
        <Route element={<ProtectedRoutes />}>
        <Route path="/purchases" element={<Purchases />}/>
        </Route>
      </Routes>
      </Container>
    </HashRouter>
    
  )
}

export default App