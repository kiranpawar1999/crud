import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../Redux/Slices/UserSlice.jsx";

function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.userAuth.token);

  useEffect(() => {
    console.log("token changed 👉", token);
    if (token) {
      navigate("/");
    }
  }, [token]);

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userLogin(loginData));
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">Login</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter email"
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter password"
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;