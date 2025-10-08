import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  // variables and states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  // functions
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    // DO some stuff here
    axios
      .post("/api/login", { username: username, password: password })
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("username", data.user.username);
        sessionStorage.setItem("email", data.user.email);
        sessionStorage.setItem("id", data.user.id);
        setLoading(false);
        navigate("/");
      }) // store the data in the sessions!
      .catch((err) => {
        console.log(err);
        setError(err);
        setLoading(false);
      });
  };

  const divStyle = { "max-width": "400px" };

  return (
    <>
      <div className="container mt-5" style={divStyle}>
        <form onSubmit={handleSubmit} className="shadow p-3 mb-5">
          {error && (
            <div class="alert alert-danger" role="alert">
              Invalid username or password
            </div>
          )}
          <h4 className="mb-4 text-center">Log In</h4>

          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            {/* USERNAME INPUT */}
            <input
              className="form-control form-control-sm"
              id="username"
              placeholder="Enter username"
              type="text"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              required
              type="password"
              className="form-control form-control-sm"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {loading ? (
            <button className="btn btn-primary" type="button" disabled>
              <span
                className="spinner-grow spinner-grow-sm"
                aria-hidden="true"
              ></span>
              <span role="status">Loading...</span>
            </button>
          ) : (
            <button type="submit" className="btn btn-primary w-100">
              Submit
            </button>
          )}
        </form>
      </div>
    </>
  );
}
export default Login;
