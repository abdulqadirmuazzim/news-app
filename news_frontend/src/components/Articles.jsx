import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import api from "../api";

function Articles({ category, setCategories }) {
  // Variables and states
  const [articles, setArticles] = useState([]);
  const [pubTime, setPubTime] = useState([]);
  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(null);
  const count = useRef(0);

  useEffect(() => {
    count.current += 1;
    console.log(`We have rendered this page ${count.current} times`);
    fetchApi({});
  }, []);

  // functions
  // News Api call
  const fetchApi = async (parameters) => {
    console.log("Parameters:", parameters);
    setLoading(true);
    try {
      const data = await axios.get("/api/get_news", {
        params: parameters,
      });
      const news = data.data.articles;
      setCategories(data.data.categories);
      setArticles(news);
      sessionStorage.setItem("nextPage", data.data.nextPage);
      setLoading(false);
    } catch (error) {
      setLoading("error");
    }

    let iDoNotKnowWhatToNameIt = news.map((element) => {
      let dates = parseDateTime(element.pubDate);
      console.log(dates);
      return Math.floor(dates);
    });
    setPubTime(iDoNotKnowWhatToNameIt);
    setLoading(false);
  };
  // function to get the next page
  function getNextPage() {
    fetchApi({ page: sessionStorage.getItem("next_page") });
  }
  const handleSaving = (article) => {
    // Updating the state
    setSaved((prevIds) =>
      prevIds.includes(article)
        ? prevIds.filter((item) => item !== article)
        : [...prevIds, article]
    );
    // Don't forget to clean up code
    console.log("Saved articles:", saved);
    console.log("Article to save:", article);
    // sending the request to the backend
    let token = sessionStorage.getItem("token");
    if (token) {
      api
        .post("/article", article)
        .then((res) => res.data)
        .then((data) => {
          console.log(data);
        });
    }
  };

  // function to parse date time
  const parseDateTime = (pubDate) => {
    let now = new Date();
    let published = new Date(pubDate);
    let timeDiff = now - published;
    let timeLaps = {
      second: 1000,
      minute: 1000 * 60,
      hour: 1000 * 60 * 60,
      day: 1000 * 60 * 60 * 24,
      month: 1000 * 60 * 60 * 24 * 30,
      year: 1000 * 60 * 60 * 24 * 365,
    };
    // console.log(timeDiff/timeLaps.hour)

    // starting with year
    if (timeDiff / timeLaps.year >= 1) return timeDiff / timeLaps.year;
    // then month
    else if (timeDiff / timeLaps.month >= 1) return timeDiff / timeLaps.month;
    // then day
    else if (timeDiff / timeLaps.day >= 1) return timeDiff / timeLaps.day;
    // then hour
    else if (timeDiff / timeLaps.hour >= 1) return timeDiff / timeLaps.hour;
    // then minute
    else if (timeDiff / timeLaps.minute >= 1) return timeDiff / timeLaps.minute;
    // then second
    else if (timeDiff / timeLaps.second >= 1) return timeDiff / timeLaps.second;
  };
  // JSX Constants
  const connectionError = (
    <div className="text-center">
      <h2>Error 500</h2>
      <h2>Server seems to be down</h2>
      <button className="btn btn-primary" onClick={() => history.go(0)}>
        Refresh
      </button>
    </div>
  );

  const preLoader = (
    <div className="text-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  if (loading === "error") {
    return connectionError;
  } else {
    return loading ? (
      preLoader
    ) : (
      <>
        <h1 className="text-center">
          We have rendered this page {count.current} times
        </h1>
        {articles.map((art, index) => {
          if (category === "All") {
            return (
              <div className="d-flex flex-column flex-md-row justify-content-between gap-3 p-3 rounded news-card">
                <div className="flex-grow-1 news-content">
                  <a
                    href={art.link}
                    className="fs-4 fw-bold mb-2  text-body link-offset-2 text-decoration-none"
                  >
                    {art.title}
                  </a>
                  <p
                    className="mb-0"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {art.description} <br /> released: {pubTime[art]} hours ago.
                  </p>
                  <div
                    className="d-inline-flex p-2"
                    role="button"
                    onClick={() => handleSaving(art)}
                  >
                    <i
                      className={
                        saved.includes(art)
                          ? "bi bi-bookmark-fill"
                          : "bi bi-bookmark"
                      }
                    ></i>
                  </div>
                </div>
                <img
                  src={art.image_url}
                  alt="Headline image"
                  className="news-image rounded"
                />
              </div>
            );
          } else {
            return (
              art.category.includes(category) && (
                <div className="d-flex flex-column flex-md-row justify-content-between gap-3 p-3 rounded news-card">
                  <div className="flex-grow-1 news-content">
                    <a
                      href={art.link}
                      className="fs-4 fw-bold mb-2  text-body link-offset-2 text-decoration-none"
                    >
                      {art.title}
                    </a>
                    <p
                      className="mb-0"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {art.description} <br /> released: {pubTime[index]} hours
                      ago.
                    </p>
                    <div
                      className="d-inline-flex p-2"
                      role="button"
                      onClick={() => handleSaving(art)}
                    >
                      <i
                        className={
                          saved.includes(art)
                            ? "bi bi-bookmark-fill"
                            : "bi bi-bookmark"
                        }
                      ></i>
                    </div>
                  </div>
                  <img
                    src={art.image_url}
                    alt="Headline image"
                    className="news-image rounded"
                  />
                </div>
              )
            );
          }
        })}
        <div className="btn btn-info" onClick={getNextPage}>
          Next page
        </div>
      </>
    );
  }
}

export default Articles;
