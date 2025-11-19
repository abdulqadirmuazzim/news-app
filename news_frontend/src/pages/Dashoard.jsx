import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import api from "../api";
import { useNavigate } from "react-router-dom";

function Dashoard() {
  useEffect(() => {
    getPosts();
  }, []);
  // Variables
  const user = sessionStorage.getItem("username");
  const userEmail = sessionStorage.getItem("email");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [savedArticles, setSavedArticles] = useState([]);
  const navigate = useNavigate();

  // functions
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
  const deleteAcount = async () => {
    let res = await api.post("delete_user");
    console.log(res.data);
    sessionStorage.clear();
  };
  const ChangeInfo = async (e) => {
    e.preventDefault();
    console.log(username, email);
    let res = await api.put("update_user", {
      username: username,
      email: email,
    });
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("email", email);
    console.log(res.data);
  };

  const getPosts = async () => {
    let response = await api.get("get_articles");
    setSavedArticles(response.data);
    console.log(response.data);
  };

  const deleteArticle = async (article) => {
    let response = await api.post("article", article);
    console.log(response.data);
    getPosts();
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
                    {/* Posts */}
                    <div className="d-flex flex-column gap-4 overflow-y-auto vh-50">
                      {savedArticles.map((article) => {
                        return (
                          <div
                            key={article.id}
                            className="d-flex flex-column flex-md-row align-items-start gap-3 p-3 rounded bg-light"
                          >
                            <div className="flex-grow-1">
                              <p className="text-primary small fw-medium mb-1">
                                <a href={article.link}>
                                  {article.category.split(", ")[0]}
                                </a>
                              </p>
                              <h3 className="h5 fw-bold text-dark mb-2">
                                {article.title}
                              </h3>
                              <p className="small text-muted mb-0">
                                {article.description}
                              </p>
                              <i
                                class="bi bi-trash my-2 fs-5 text-danger"
                                role="button"
                                onClick={() => deleteArticle(article)}
                              ></i>
                            </div>
                            <img
                              src={article.image_url}
                              alt={article.title}
                              className="img-fluid rounded"
                              style={{
                                width: "160px",
                                height: "112px",
                                objectFit: "cover",
                              }}
                            />
                          </div>
                        );
                      })}
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
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
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
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>

                      <button
                        type="submit"
                        className="btn btn-primary w-100 fw-bold py-2"
                        onClick={ChangeInfo}
                      >
                        Update Information
                      </button>

                      <button
                        type="button"
                        className="btn btn-primary w-100 fw-bold py-2"
                        onClick={() => navigate("/change_password")}
                      >
                        Change Password
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

                      <button
                        className="btn btn-outline-danger w-100 fw-bold py-2"
                        onClick={deleteAcount}
                      >
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
