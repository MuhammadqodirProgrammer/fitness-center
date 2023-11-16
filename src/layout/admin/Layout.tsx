import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Navbar from "./Navbar/Navbar";


export default function LayoutAdmin({ children }: any) {
  return (
    <div>
      <Navbar/>
      <div className="inner_container mt-[15px] mb-[14vh] ">
        {children}
    
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
