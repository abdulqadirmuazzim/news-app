import React, { useState } from "react";
import "./ChangePass.css";
import api from "../api";

function ChangePassword() {
  // variables
  const [oldPass, setOldPass] = useState("");
  const [NewPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  // functions
  const handleSubmit = (e) => {
    e.preventDefault();

    if (NewPass !== confirmPass) {
      // api.put("/", { NewPass });
      console.log("Password changed successfully");
    }
  };
  return (
    <div className="min-vh-100 bg-body">
      <div className="d-flex flex-column min-vh-100">
        <main className="d-flex align-items-center justify-content-center py-5 flex-grow-1 px-3">
          <div className="w-100" style={{ maxWidth: "480px" }}>
            {/* Header Section */}
            <div className="text-center mb-5">
              <div
                className="text-primary mx-auto mb-3"
                style={{ width: "48px", height: "48px" }}
              >
                <svg
                  fill="none"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_6_330)">
                    <path
                      clipRule="evenodd"
                      d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z"
                      fill="currentColor"
                      fillRule="evenodd"
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="clip0_6_330">
                      <rect fill="white" height="48" width="48"></rect>
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <h1 className="h2 fw-bold text-body-emphasis">Change Password</h1>
            </div>

            {/* Password Form */}
            <form className="d-flex flex-column gap-4" onSubmit={handleSubmit}>
              {/* Old Password Field */}
              <div className="form-group">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <label
                    htmlFor="oldPassword"
                    className="form-label text-body-emphasis fw-medium mb-0 small"
                  >
                    Old Password
                  </label>
                  <a
                    href="#"
                    className="text-primary text-decoration-none small fw-medium"
                  >
                    Forgot Password?
                  </a>
                </div>
                <input
                  type="password"
                  className="form-control"
                  value={oldPass}
                  onChange={(e) => setOldPass(e.target.value)}
                  id="oldPassword"
                  placeholder="Enter your old password"
                  style={{ height: "48px" }}
                />
              </div>

              {/* New Password Field */}
              <div className="form-group">
                <label
                  htmlFor="newPassword"
                  className="form-label text-body-emphasis fw-medium mb-2 small"
                >
                  New Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  value={NewPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  id="newPassword"
                  placeholder="Enter your new password"
                  style={{ height: "48px" }}
                />
              </div>

              {/* Confirm New Password Field */}
              <div className="form-group">
                <label
                  htmlFor="confirmPassword"
                  className="form-label text-body-emphasis fw-medium mb-2 small"
                >
                  Confirm New Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  id="confirmPassword"
                  placeholder="Confirm your new password"
                  style={{ height: "48px" }}
                />
              </div>

              {/* Action Buttons */}
              <div className="d-flex gap-3 pt-3">
                <button
                  type="button"
                  className="btn btn-outline-primary flex-grow-1 py-2 fw-bold"
                  style={{ height: "44px" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary flex-grow-1 py-2 fw-bold"
                  style={{ height: "44px" }}
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ChangePassword;
