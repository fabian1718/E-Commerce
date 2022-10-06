import React, { useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import CardsSidebar from './CartsSidebar';
import '../styles/navbar.css'

const MyNavbar = () => {
    const navigate = useNavigate()

    const logout = () => {
        localStorage.setItem("token", "")
        navigate("/login")
    }

    const [ show, setShow ] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className='NavbarG' >
            <Navbar className='container-navbar' bg="primary" variant="dark" >
                <Container className='container-navbar-icon'>
                        <Navbar.Brand to="/" as={Link}>E-Commers</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to='/login'><i className="fa-solid fa-user"></i></Nav.Link>
                            <Nav.Link as={Link} to='/purchases'><i className="fa-solid fa-store"></i></Nav.Link>
                            <Nav.Link onClick={handleShow}><i className="fa-solid fa-cart-shopping"></i></Nav.Link>
                            <Nav.Link onClick={logout}>Logout</Nav.Link>
                        </Nav>
                        </Navbar.Collapse>
                </Container>
            </Navbar>
            <CardsSidebar show={show} handleClose={handleClose} />
        </div>
    );
};

export default MyNavbar;