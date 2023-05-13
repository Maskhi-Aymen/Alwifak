import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import CarListing from "../pages/CarListing";
import CarDetails from "../pages/CarDetails"; 
import NotFound from "../pages/NotFound";
import Contact from "../pages/Contact";
import Login from "../components/Login/Login";
import Register from "../components/Login/Register";
import TableCars from "../components/UI/TableCars";
import CarAdmin from "../pages/CarAdmin";
import NewCar from "../pages/NewCar";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/cars" element={<CarListing />} />
      <Route path="/cars/:slug" element={<CarDetails />} />
      <Route path="/admin/cars" element={<TableCars />} />
      <Route path="/admin/newcar" element={<NewCar/>} />
      <Route path="/admin/cars/:slug" element={<CarAdmin />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Routers;
