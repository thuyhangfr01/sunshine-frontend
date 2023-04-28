import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import {Navbar} from "./components/navbar/Navbar";
import Home from "./routes/client/Home";
import About from "./routes/client/About";
import Project from "./routes/client/Project";
import Report from "./routes/client/Report";
import Contact from "./routes/client/Contact";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import DetailsBene from "./routes/client/DetailsBene";
import DetailsReceipt from "./routes/client/DetailsReceipt";
// import AuthService from "./services/auth.service";

// import Login from "./components/auth/Login";
// import Register from "./components/auth/Register";
// import Home from "./components/home.component";
// import Profile from "./components/profile.component";
// import BoardRecipient from "./components/board-recipient.component";
// import BoardCollaborator from "./components/board-collaborator.component";
// import BoardBenefactor from "./components/board-benefactor.component";
// import BoardAdmin from "./components/board-admin.component";

// import EventBus from "./common/EventBus";

class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.logOut = this.logOut.bind(this);

  //   this.state = {
  //     showRecipientBoard: false,
  //     showBenefactorBoard: false,
  //     showCollaboratorBoard: false,
  //     showAdminBoard: false,
  //     currentUser: undefined,
  //   };
  // }

  // componentDidMount() {
  //   const user = AuthService.getCurrentUser();

  //   if (user) {
  //     this.setState({
  //       currentUser: user,
  //       showRecipientBoard: user.roles.includes("ROLE_RECIPIENT"),
  //       showBenefactorBoard: user.roles.includes("ROLE_BENEFACTOR"),
  //       showCollaboratorBoard: user.roles.includes("ROLE_COLLABORATOR"),
  //       showAdminBoard: user.roles.includes("ROLE_ADMIN"),
  //     });
  //   }
    
  //   EventBus.on("logout", () => {
  //     this.logOut();
  //   });
  // }

  // componentWillUnmount() {
  //   EventBus.remove("logout");
  // }

  // logOut() {
  //   AuthService.logout();
  //   this.setState({
  //     showRecipientBoard: false,
  //     showBenefactorBoard: false,
  //     showCollaboratorBoard: false,
  //     showAdminBoard: false,
  //     currentUser: undefined,
  //   });
  // }

  render() {
    // const { currentUser, showRecipientBoard, showBenefactorBoard, showAdminBoard } = this.state;

    return (
      <div>
        {/* <Navbar/> */}
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/home" element={<Home/>}></Route>
          <Route path="/about" element={<About/>}></Route>
          <Route path="/project" element={<Project/>}></Route>
          <Route path="/report" element={<Report/>}></Route>
          <Route path="/contact" element={<Contact/>}></Route>
          <Route path="/details-bene" element={<DetailsBene/>}></Route>
          <Route path="/details-receipt" element={<DetailsReceipt/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
        </Routes>
      </div>
    );
  }
}

export default App;
