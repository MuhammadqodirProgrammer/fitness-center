import React from "react";
import Header from "./Header/Header";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

export default function LayoutClient({ children }: any) {
  return (
    <div>
      <Navbar />
      <div className="inner_container mt-[15px] mb-[14vh] ">{children}</div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
