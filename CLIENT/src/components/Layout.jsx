import React from 'react'
// src/components/Layout.js
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';  // Assume you have a Navbar component
import Footer from './Footer';  // Assume you have a Footer component

const Layout = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />  {/* This renders the child routes */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
