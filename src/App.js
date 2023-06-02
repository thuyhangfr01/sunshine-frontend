import React, { useState, useEffect } from 'react';

import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';
import {ConfigProvider} from "antd";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from './components/auth/Login';
import Register from "./components/auth/Register";
import Home from './pages/client/Home';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import About from './pages/client/About';
import ProjectDetail from './containers/client/ProjectDetail';
import ProjectDonation from './containers/client/ProjectDonation';
import Project from './pages/client/Project';
import Report from './pages/client/Report';
import Contact from './pages/client/Contact';
import NotFound from './components/error/NotFound';
import ProjectDonationCarts from "./containers/client/ProjectDonationCarts";
import HistoryContribution from "./containers/client/contribution/HistoryContribution";
import Payment from "./containers/client/Payment";
import FormHelp from "./containers/client/form/FormHelp";

// import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import AdminPage from "./pages/admin/AdminPage";
import UserManagement from "./pages/admin/User/UserManagement";
import ProjectManagement from "./pages/admin/Project/ProjectManagement";
import ContributionArtifactManagement from "./pages/admin/Form/ContributionArtifact";
import ReceiptPayment from "./pages/admin/ReceiptPayment/ReceiptPayment";
import LayoutAdmin from "./components/admin/LayoutAdmin";
import FormHelpManagement from './pages/admin/Form/FormHelp';
import FormVolunteerManagement from './pages/admin/Form/FormVolunteer';
import Loading from './components/loading/Loading';

import locale from 'antd/locale/vi_VN';

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
          path: "reports",
          element: <Report/>,
        },
        {
          path: "order",
          element: <ProjectDonationCarts/>,
        },
        {
          path: "payment",
          element: <Payment/>,
        },
        {
          path: "historyContribution",
          element: <HistoryContribution/>,
        },
        {
          path: "formHelp",
          element: <FormHelp/>,
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
        {
          path: "receiptPayment",
          element: 
          // <ProtectedRoute>
          <ReceiptPayment />
          // {/* </ProtectedRoute> */}
        },
        {
          path: "contribution",
          element: 
          // <ProtectedRoute>
          <ContributionArtifactManagement />
          // {/* </ProtectedRoute> */}
        },
        {
          path: "help",
          element: 
          // <ProtectedRoute>
          <FormHelpManagement />
          // {/* </ProtectedRoute> */}
        },
        {
          path: "volunteer",
          element: 
          // <ProtectedRoute>
          <FormVolunteerManagement />
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
