import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';

function NavBarx() {
  
  const {user} = useContext(AuthContext);
  

  if (user === true) {
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
            <Link to="/profile" className="nav-link">Profile</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

      
    )
  } else {
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
            <Link to="/login" className="nav-link">Login</Link>
          </Nav>
          <Link to="/register"><Button variant='outline-primary'>Register</Button></Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );
    
  }

}

export default NavBarx;