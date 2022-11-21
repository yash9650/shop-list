import React from 'react';
import { Navbar, Container, Nav} from 'react-bootstrap';
import { Link} from "react-router-dom";

const Header = () => {
    return(
        <Navbar className='nav bg-info' expand="lg" width="100vw">
            <Container fluid>
                <Navbar.Brand as={Link} to="/">ShopList</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll >

                        <Nav.Link as={Link} to="/">Shops</Nav.Link>
                        <Nav.Link as={Link} to="/add-shop">Add Shops</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;