import React, { Component } from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { Outlet } from "react-router-dom";

import Login from './components/auth/Login';
import Home from './pages/client/Home';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import About from './pages/client/About';
import Project from './pages/client/Project';
import Contact from './pages/client/Contact';
import Report from './pages/client/Report';
import ErrorPage from './components/error/ErrorPage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Register from "./components/auth/Register";

const Layout = () => {
  return(
    <div>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element:  <Layout/>,
      // errorElement: <div>404 page</div>,
  
      children: [
        { path: "home", index: true, element: <Home /> },
        {
          path: "contact",
          element: <Contact/>,
        },
        {
          path: "project",
          element: <Project/>,
        },
      ],
    },
    {
      path: "/login",
      element: <Login/>
    },
    {
      path: "/register",
      element: <Register/>
    },
  ]);

  return (
    <>
    <RouterProvider router={router} />
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      fontSize="15px"
      />
    </>
  )
}
