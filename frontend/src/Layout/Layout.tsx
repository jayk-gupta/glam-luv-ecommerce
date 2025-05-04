import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Chatbot from "@/components/Chatbot/Chatbot";

const Layout: React.FC = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <div className="fixed bottom-6 right-6 z-50">
        <Chatbot />
      </div>

      <Footer />
    </>
  );
};

export default Layout;
