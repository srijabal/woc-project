import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';


function Navigation() {
    return (
        <Navbar className="bg-body-tertiary" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    StudyAce
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link className="nav-link" to="/">Home</Link>
                        <Link className="nav-link active" aria-current="page" to="/"> Login</Link>
                        <Link className="nav-link" to="/register"> Register</Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <Link to="/todo" className="dropdown-item">User Profile</Link>
                            <Link to="/relaxation-corner" className="dropdown-item">Relaxation Corner</Link>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;