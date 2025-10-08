import React, { useState } from "react";

function MobileNav() {
    const [search, setSearch] = useState("");
    
  return (
    <>
      <div
        className="collapse d-md-none border-bottom"
        id="mobileMenu"
        style={{
          borderBottomColor: "var(--secondary-color)",
          borderBottomStyle: "solid",
        }}
      >
        <div className="container-fluid py-3">
          <div className="d-flex flex-column gap-3">
            <nav className="d-flex justify-content-center gap-4">
              <a
                className="text-decoration-none fs-6 fw-medium"
                href="#"
                style={{ color: "var(--text-primary)" }}
              >
                For You
              </a>
              <a
                className="text-decoration-none fs-6 fw-medium"
                href="#"
                style={{ color: "var(--text-secondary)" }}
              >
                Following
              </a>
            </nav>

            <div className="position-relative">
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
                  type="text"
                  onChange={(e) => {setSearch(e.target.value)}}
                  value={search}
                  style={{
                    color: "var(--text-primary)",
                    height: "40px",
                    boxShadow: "none",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MobileNav;
