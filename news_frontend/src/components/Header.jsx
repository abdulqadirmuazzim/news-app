import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const user = sessionStorage.getItem("username");
  return (
    <>
      <header
        className="d-flex align-items-center justify-content-between border-bottom py-3 px-3 px-md-4 px-lg-5"
        style={{ borderBottomColor: "var(--secondary-color) !important" }}
      >
        <div className="d-flex align-items-center gap-3 gap-md-5">
          <a href="/" style={{ textDecoration: "none" }}>
            <div
              className="d-flex align-items-center gap-2"
              style={{ color: "var(--primary-color)" }}
            >
              <i className="bi bi-newspaper fs-2"></i>
              <h1
                className="m-0 fs-3 fw-bold"
                style={{ color: "var(--text-primary)" }}
              >
                NewsToday
              </h1>
            </div>
          </a>
        </div>

        {/* <div className="d-flex flex-grow-1 justify-content-center d-none d-md-flex">
          <nav className="d-flex align-items-center gap-4 gap-lg-5">
            <a
              className="text-decoration-none fs-6 fw-medium"
              href="#"
              style={{ color: "var(--text-primary)" }}
            >
              Home
            </a>
            <a
              className="text-decoration-none fs-6 fw-medium"
              href="#"
              style={{ color: "var(--text-secondary)" }}
            >
              Saved
            </a>
          </nav>
        </div> */}

        <div className="d-flex align-items-center gap-3">
          <div className="d-none d-md-flex position-relative min-w-40">
            <div
              className="d-flex align-items-stretch rounded-pill search-bar"
              style={{ height: "40px" }}
            >
              <span
                className="d-flex align-items-center justify-content-center ps-3"
                style={{ color: "var(--text-secondary)" }}
              >
                <i className="bi bi-search"></i>
              </span>
              <input
                className="form-control border-0 bg-transparent ps-2 pe-3 text-truncate"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  color: "var(--text-primary)",
                  height: "40px",
                  boxShadow: "none",
                }}
                type="text"
              />
            </div>
          </div>

          <button
            className="btn icon-button rounded-circle d-flex align-items-center justify-content-center"
            style={{ width: "40px", height: "40px" }}
          >
            <i className="bi bi-bell fs-5"></i>
          </button>
          {user ? (
            <button
              className="btn btn-secondary rounded-border"
              onClick={() => navigate("/dashboard")}
            >
              {user}
            </button>
          ) : (
            <button
              className="btn btn-secondary rounded-border"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}

          <button
            className="btn icon-button rounded-circle d-flex align-items-center justify-content-center d-md-none"
            style={{ width: "40px", height: "40px" }}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mobileMenu"
          >
            <i className="bi bi-list fs-5"></i>
          </button>
        </div>
      </header>
    </>
  );
}

export default Header;
