import React from "react";
import Header from "../components/Header";
import api from "../api";
import { useNavigate } from "react-router-dom";

function Dashoard() {
  const user = sessionStorage.getItem("username");
  const navigate = useNavigate();

  const Logout = () => {
    api
      .post("logout")
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        sessionStorage.clear();
        navigate("/login");
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
      <Header />
      <main className="px-3 px-md-4 px-lg-5 py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-xxl-10">
              <h1 className="h2 fw-bold text-dark mb-4">Account: {user}</h1>

              <div className="row g-4">
                {/* Saved Posts Section */}
                <div className="col-12 col-lg-8">
                  <div className="mb-5">
                    <h2 className="h4 fw-bold text-dark mb-3">Saved Posts</h2>

                    <div className="d-flex flex-column gap-4">
                      {/* Post 1 */}
                      <div className="d-flex flex-column flex-md-row align-items-start gap-3 p-3 rounded bg-light">
                        <div className="flex-grow-1">
                          <p className="text-primary small fw-medium mb-1">
                            Technology
                          </p>
                          <h3 className="h5 fw-bold text-dark mb-2">
                            Tech Giant Unveils New AI Assistant
                          </h3>
                          <p className="small text-muted mb-0">
                            The company's latest AI assistant promises to
                            revolutionize personal productivity and digital
                            interaction.
                          </p>
                        </div>
                        <img
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVJEWbHbyMeQtM5XKQYpf-NijJ3cGpb3MYJQuMLpHsesL35Y2NV7zOeQBxAwMYgrkwjfCGuVBintUcSrY9J2xzxRH6UqZuFp3TOkoFtC7-HeQSR_74_ERCU5-0cQHYXvdMB_dEtvJEJPll4rqcmQlRpH3R5JMEiwKg9NyB_5KLL5uq7VRns93i0oa3P70V4QjQUR6pkkS5qvPS21yGhSm06WrO59xr03zjqaD2iEoiMi26oFlRH1zb_u7mMkrCIblO1OoHFKQ_0pA"
                          alt="Tech Giant Unveils New AI Assistant"
                          className="img-fluid rounded"
                          style={{
                            width: "160px",
                            height: "112px",
                            objectFit: "cover",
                          }}
                        />
                      </div>

                      {/* Post 2 */}
                      <div className="d-flex flex-column flex-md-row align-items-start gap-3 p-3 rounded bg-light">
                        <div className="flex-grow-1">
                          <p className="text-primary small fw-medium mb-1">
                            Science
                          </p>
                          <h3 className="h5 fw-bold text-dark mb-2">
                            Breakthrough in Renewable Energy
                          </h3>
                          <p className="small text-muted mb-0">
                            Scientists achieve a major milestone in solar energy
                            efficiency, paving the way for more sustainable
                            power solutions.
                          </p>
                        </div>
                        <img
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuD887ArnTt3Zg8aJqh295gRjDT_4hW9MmD4rHQe7ex9t-UK5_Z8lQYe2NnvEMeoPcG7tBzvh87mIdRhbg_4mdcLkdwn83NFIJnVSCskqfkRzKTKc60IDTeWFaJFR9r_IBPtCPnpG0ZQRNUt6FzYiEklo-AVGldiiOhQudXrEQ3QDEBTNoCJ2PxzQSVCtUirb8NvCHQjLIvdX4cirGmmlDizyw1PpTNt2zuiz2rJkvvxQjrUmjLNgTHq2tPdJ-f-v-AzZMFPZXDyvY4"
                          alt="Breakthrough in Renewable Energy"
                          className="img-fluid rounded"
                          style={{
                            width: "160px",
                            height: "112px",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sidebar - Account Information & Actions */}
                <div className="col-12 col-lg-4">
                  {/* Account Information Form */}
                  <div className="mb-5">
                    <h2 className="h4 fw-bold text-dark mb-3">
                      Account Information
                    </h2>

                    <form className="d-flex flex-column gap-3">
                      <div>
                        <label
                          htmlFor="name"
                          className="form-label small fw-medium text-dark mb-1"
                        >
                          Name
                        </label>
                        <input type="text" className="form-control" id="name" />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="form-label small fw-medium text-dark mb-1"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="password"
                          className="form-label small fw-medium text-dark mb-1"
                        >
                          New Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                        />
                      </div>

                      <button
                        type="submit"
                        className="btn btn-primary w-100 fw-bold py-2"
                      >
                        Update Information
                      </button>
                    </form>
                  </div>

                  {/* Actions Section */}
                  <div>
                    <h2 className="h4 fw-bold text-dark mb-3">Actions</h2>

                    <div className="d-flex flex-column gap-3">
                      <button
                        className="btn btn-outline-secondary w-100 fw-bold py-2"
                        onClick={Logout}
                      >
                        Log Out
                      </button>

                      <button className="btn btn-outline-danger w-100 fw-bold py-2">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Dashoard;
