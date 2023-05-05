import React, { Component } from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Test from './containers/test';
import Login from './components/auth/Login';
import Home from './pages/client/Home';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import About from './pages/client/About';
import ProjectDetail from './containers/ProjectDetail';
import ProjectDonation from './containers/ProjectDonation';
import Project from './pages/client/Project';
import Contact from './pages/client/Contact';
import Report from './pages/client/Report';
import ErrorPage from './components/error/ErrorPage';
import { ToastContainer, toast } from 'react-toastify';
import ClipLoader from "react-spinners/ClipLoader";
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Register from "./components/auth/Register";
import UserManagement from "./pages/admin/UserManagement";

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
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.projects.isLoading)

  const router = createBrowserRouter([
    {
      path: "/",
      element:  <Layout/>,
      // errorElement: <div>404 page</div>,
  
      children: [
        { path: "home", index: true, element: <Home /> },
        {
          path: "about",
          element: <About/>,
        },
        {
          path: "project",
          element: <Project/>,
        },
        {
          path: "project/:id",
          element: <ProjectDetail/>,
        },
        {
          path: "project/donations",
          element: <ProjectDonation/>,
        },
        {
          path: "contact",
          element: <Contact/>,
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
    {
      path: "/admin",
      element: <UserManagement/>
    },
    {
      path: "/test",
      element: <Test/>
    }
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
          style={{fontSize: "16px"}}
          />
    </>
  )
}
