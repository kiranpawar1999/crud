import "../App.css";
import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/Slices/UserSlice";
import { searchUserData } from "../Redux/Slices/CurdSlice";

function HomeNav() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(state => state.userAuth.token);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      <Navbar sticky="top" expand="lg" bg="dark" variant="dark" className="shadow">
        <Container fluid>

          {/* Logo */}
          <Navbar.Brand style={{ fontWeight: "bold" }}>
            CURD APP
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">

            {/* Left Side Nav Links */}
            <Nav className="me-auto align-items-center" navbarScroll>

              <NavLink 
                to="/" 
                className="nav-link"
              >
                Home
              </NavLink>

              <NavLink 
                to="/create-page" 
                className="nav-link"
              >
                Create
              </NavLink>

              {!token && (
                <>
                  <NavLink to="/register" className="nav-link">
                    Registration
                  </NavLink>

                  <NavLink to="/login" className="nav-link">
                    Login
                  </NavLink>
                </>
              )}

            </Nav>

            {/* Right Side */}
            <div className="d-flex align-items-center gap-2">

              {/* Search */}
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search by name..."
                  className="me-2"
                  style={{ width: "200px" }}
                  onChange={(e) =>
                    dispatch(searchUserData(e.target.value))
                  }
                />
              </Form>

              {/* Logout */}
              {token && (
                <Button variant="primary" onClick={handleLogout}>
                  Logout
                </Button>
              )}

            </div>

          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Outlet />
    </>
  );
}

export default HomeNav;
