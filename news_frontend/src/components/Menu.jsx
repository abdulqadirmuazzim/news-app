import React, { useEffect, useState } from "react";
import Articles from "./Articles";

function Menu() {
  // variables
  const [tabs, setTabs] = useState([]);
  const [currentTab, setCurrentTab] = useState("All");
  // functions
  const fillTabs = (newCategories) => {
    let new_arr = ["All", "top", ...newCategories];
    let last_top = new_arr.lastIndexOf("top");

    if (last_top !== -1) {
      new_arr.splice(last_top, 1);
    }
    setTabs(new_arr);
  };

  // useEffect(()=>{

  // })
  // const handleSetTab = (tab) => {
  //   if (tab === "All")
  // }

  return (
    <>
      <main className="py-4 py-md-5 px-3 px-sm-4 px-md-5">
        <div className="container">
          <div
            className="border-bottom mb-4 mb-md-5"
            style={{
              borderBottomColor: "var(--secondary-color)",
              borderBottomStyle: "solid",
            }}
          >
            <div className="d-flex justify-content-center gap-3 gap-md-5 flex-wrap">
              {tabs.map((tab) => (
                <a
                  key={tab}
                  className={
                    "text-decoration-none d-flex flex-column align-items-center justify-content-center border-bottom-2 pb-2 pt-1" +
                    (currentTab === tab ? " tab-active" : " tab-inactive")
                  }
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentTab(tab);
                  }}
                >
                  <p className="m-0 fw-bold">{tab}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>
      {<Articles category={currentTab} setCategories={fillTabs} />}
    </>
  );
}

export default Menu;
