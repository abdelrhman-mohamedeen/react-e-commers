import React from "react";
import Nave from "../Nave/Nave";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Nave />
      <div className=" mx-auto container my-6 py-10">
        <Outlet></Outlet>
      </div>
      <Footer />
    </>
  );
}
