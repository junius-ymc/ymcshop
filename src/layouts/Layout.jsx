import React from "react";
import { Outlet } from "react-router-dom";
import MainNav from "../components/MainNav";
import Footer from "../components/Footer";

const Layout = () => {

  return (
    <div>
      <MainNav />
      <main className="content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
