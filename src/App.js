import React, { Component } from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Test from './containers/client/test';
import Login from './components/auth/Login';
import Home from './pages/client/Home';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import About from './pages/client/About';
import ProjectDetail from './containers/client/ProjectDetail';
import ProjectDonation from './containers/client/ProjectDonation';
import Project from './pages/client/Project';
import Contact from './pages/client/Contact';
import Report from './pages/client/Report';
import NotFound from './components/error/NotFound';
import { ToastContainer, toast } from 'react-toastify';
import ClipLoader from "react-spinners/ClipLoader";
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Register from "./components/auth/Register";
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import AdminPage from "./pages/admin/AdminPage";
import UserManagement from "./pages/admin/User/UserManagement";
import ProjectManagement from "./pages/admin/Project/ProjectManagement";
import LayoutAdmin from "./components/admin/LayoutAdmin";
import Loading from './components/loading/Loading';
import dayjs from 'dayjs';
import locale from 'antd/locale/vi_VN';
import {ConfigProvider} from "antd";

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
  const {showLoading, isLogginIn} = useSelector(state => state.auth);

  const router = createBrowserRouter([
    {
      path: "/",
      element:  <Layout/>,
      errorElement: <NotFound/>,
  
      children: [
        { index: true, element: <Home />},
        { path: "home", element: <Home /> },
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
      path: "/admin",
      element: <LayoutAdmin/>,
      errorElement: <NotFound/>,
      children: [
        {
          index: true, element:
            // <ProtectedRoute>
                 <AdminPage />
            // {/* </ProtectedRoute>  */}
        },
        {
          path: "user",
          element: 
          // <ProtectedRoute>
            <UserManagement />
          // </ProtectedRoute>
        },
        {
          path: "project",
          element: 
          // <ProtectedRoute>
            <ProjectManagement />
          // {/* </ProtectedRoute> */}
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
      {
        showLoading === false
          || window.location.pathname === '/login'
          || window.location.pathname === '/register'
          || window.location.pathname === '/'
          || window.location.pathname === '/home'
          ?
          <>
          <ConfigProvider locale={locale}>
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
          </ConfigProvider>
          </>
          :
          <Loading />
      }
    </>
  )
}
