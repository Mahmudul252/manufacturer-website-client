import { signOut } from 'firebase/auth';
import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';

const Header = () => {
    const [user] = useAuthState(auth);
    console.log(user)
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" className='fixed-top' variant="dark">
            <Container>
                <Navbar.Brand as={Link} to="/home">Tools Express</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/tools">Tools</Nav.Link>
                        <Nav.Link as={Link} to="/reviews">Reviews</Nav.Link>
                        <Nav.Link as={Link} to="/blogs">Blogs</Nav.Link>
                    </Nav>
                    <Nav>
                        {
                            user ? <div className='d-flex flex-lg-row flex-column'>
                                <span className='text-white mt-2 me-2'>{user?.displayName}</span>
                                <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                                <Nav.Link onClick={() => signOut(auth)}>Sign Out</Nav.Link>
                            </div>
                                :
                                <div className="d-flex flex-lg-row flex-column">
                                    <Nav.Link as={Link} to='/login'>Login</Nav.Link>
                                    <Nav.Link as={Link} to='/signup'>Sign Up</Nav.Link>
                                </div>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;