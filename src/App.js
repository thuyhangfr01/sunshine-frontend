import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
// import BoardUser from "./components/board-user.component";
import BoardRecipient from "./components/board-recipient.component";
import BoardCollaborator from "./components/board-collaborator.component";
import BoardBenefactor from "./components/board-benefactor.component";
import BoardAdmin from "./components/board-admin.component";

// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showRecipientBoard: false,
      showBenefactorBoard: false,
      showCollaboratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showRecipientBoard: user.roles.includes("ROLE_RECIPIENT"),
        showBenefactorBoard: user.roles.includes("ROLE_BENEFACTOR"),
        showCollaboratorBoard: user.roles.includes("ROLE_COLLABORATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
    
    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showRecipientBoard: false,
      showBenefactorBoard: false,
      showCollaboratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showRecipientBoard, showBenefactorBoard, showAdminBoard } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            bezKoder
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {showRecipientBoard && (
              <li className="nav-item">
                <Link to={"/recipient"} className="nav-link">
                  Recipient Board
                </Link>
              </li>
            )}

            {/* {showCollaboratorBoard && (
              <li className="nav-item">
                <Link to={"/collaborator"} className="nav-link">
                  Collaborator Board
                </Link>
              </li>
            )} */}

            {showBenefactorBoard && (
              <li className="nav-item">
                <Link to={"/benefactor"} className="nav-link">
                  Benefactor Board
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/collaborator"} className="nav-link">
                  Colla
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.email}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            {/* <Route path="/user" element={<BoardUser />} /> */}
            <Route path="/recipient" element={<BoardRecipient />} />
            <Route path="/collaborator" element={<BoardCollaborator />} />
            <Route path="/benefactor" element={<BoardBenefactor />} />
            <Route path="/admin" element={<BoardAdmin />} />
          </Routes>
        </div>

        {/* <AuthVerify logOut={this.logOut}/> */}
      </div>
    );
  }
}

export default App;
