import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./screens/Home";
import Product from "./Components/Product.jsx";
import Addproduct from "./Components/Addproduct.jsx";
import Dashboard from "./screens/Dashboard.jsx";

const AppRouter = () => {
  return (
    <BrowserRouter>
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <Link className="navbar-brand btn btn-primary" to="/">Hidden brand</Link>
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <Link className="nav-link btn btn-primary" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="btn btn-primary nav-link" to='/addproduct'>Add Product</Link>
            </li>
            <li className="nav-item">
              <Link className="btn btn-primary nav-link" to="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </div>
      </nav>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:productId" element={<Product />} />
        <Route path="/addproduct" element={<Addproduct />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
