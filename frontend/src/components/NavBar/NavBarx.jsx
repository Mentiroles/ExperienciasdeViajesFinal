import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

function NavBarx() {
  const { user, logout } = useContext(AuthContext);
  
  return ( 
      <Navbar expand="lg" className="bg-body-tertiary mb-3 sticky-top shadow p-3">
        <Container fluid>
          <Link to="/" className="navbar-brand">Logo</Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" className="justify-content-end">
            <Nav
              className="me-2 my-2 my-lg-0"
              style={{ maxHeight: '200px' }}
              navbarScroll
            >
              <Link to="/recommendations" className="nav-link">Recommendations</Link>
              <Link to="/about" className="nav-link">About</Link>
              {user ? (
                <Link to="/user" className="nav-link">Profile</Link>
              ) : (
                <Link to="/login" className="nav-link">Login</Link>
              )}
            </Nav>
            {user  ? (
              <Link to="/"><Button variant='outline-primary' onClick={logout}>Log Out</Button></Link>
            ) : (
              <Link to="/register"><Button variant='outline-primary'>Register</Button></Link>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
}

export default NavBarx;