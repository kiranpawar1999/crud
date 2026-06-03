import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userRegister } from "../../Redux/Slices/UserSlice.jsx";
import { Container, Card, Form, Button } from "react-bootstrap";

function RegistrationForm() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userRegister(form));
    alert("Registration Successfully Submitted");
    navigate("/login");
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "90vh" }}>
      <Card style={{ width: "400px" }} className="shadow-lg p-4 rounded-4">
        
        <Card.Body>
          <h3 className="text-center mb-4 text-primary fw-bold">
            Registration Form
          </h3>

          <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Enter your full name"
                value={form.username}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <div className="d-grid">
              <Button variant="primary" type="submit" size="lg">
                Register
              </Button>
            </div>

          </Form>

          <p className="text-center mt-3 mb-0">
            Already have an account?{" "}
            <span
              style={{ cursor: "pointer", color: "#0d6efd" }}
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>

        </Card.Body>
      </Card>
    </Container>
  );
}

export default RegistrationForm;
