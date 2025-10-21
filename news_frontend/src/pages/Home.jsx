import React from "react";
import Menu from "../components/Menu";
import Header from "../components/Header";
import MobileNav from "../components/MobileNav";

function Home() {
  return (
    <>
      <div className="steel-blue-theme">
        <div className="d-flex flex-column min-vh-100">
          <div className="container-fluid flex-grow-1">
            <Header />
            <MobileNav />
            <Menu />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
