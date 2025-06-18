import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { FaUserPlus, FaSignInAlt, FaTachometerAlt, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import './Menu.css';
import { useEffect, useState } from 'react';

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? 'nav-link active' : 'nav-link';

const Menu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const onStorage = () => setIsAuthenticated(!!localStorage.getItem('token'));
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem('token'));
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await fetch('/api/v1/auth/logout', { method: 'POST', credentials: 'include' });
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      navigate('/login');
    } catch (err) {
      setIsAuthenticated(false);
      navigate('/login');
    }
  };

  return (
    <Navbar expand="lg" style={{ background: 'blueviolet' }} variant="dark" className="shadow-sm py-2">
      <Container fluid>
        <Navbar.Brand as={NavLink} to="/" style={{ color: 'white', fontWeight: 700, letterSpacing: 1 }}>
          TaskMaster
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarSupportedContent" className="d-lg-none" />
        <Navbar.Collapse id="navbarSupportedContent">
          <Nav className="ms-auto">
            {isAuthenticated ? (
              <>
                <NavLink to="/dashboard" className={navLinkClass}>
                  <FaTachometerAlt className="me-2" /> Dashboard
                </NavLink>
                <NavLink to="/profile" className={navLinkClass}>
                  <FaUserCircle className="me-2" /> Profile
                </NavLink>
                <Button variant="outline-light" className="ms-3" onClick={handleLogout} style={{ fontWeight: 500 }}>
                  <FaSignOutAlt className="me-2" /> Logout
                </Button>
              </>
            ) : (
              <>
                <NavLink to="/register" className={navLinkClass}>
                  <FaUserPlus className="me-2" /> Register
                </NavLink>
                <NavLink to="/login" className={navLinkClass}>
                  <FaSignInAlt className="me-2" /> Login
                </NavLink>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;
