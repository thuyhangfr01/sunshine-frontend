import * as React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css"
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
    <Header/>
      <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<Home />} /> 
      </Routes>
    <Footer />
    </>
  );
}

export default App;