import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { isLoggedIn, role, logout } = useAuth();
  const navigate = useNavigate();

  const getNavLinks = () => {
    if (isLoggedIn === false) {
      return (
        <>
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/aboutus" className="nav-link">
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contactus" className="nav-link">
              Contact
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/signup" className="nav-link">
              Signup
            </Link>
          </li>
        </>
      );
    } else {
      switch (role) {
        case "teacher":
          return (
            <>
              <li className="nav-item">
                <Link to="/create-team" className="nav-link">
                  AddTeam
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/teams" className="nav-link">
                  Teams
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/view-event" className="nav-link">
                  Events
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/view-result" className="nav-link">
                  Results
                </Link>
              </li>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  logout();
                  localStorage.removeItem("token");
                  navigate("/");
                }}
                className="bg-transparent py-2 px-3 border-0"
              >
                Logout
              </button>
            </>
          );
        case "admin":
          return (
            <>
              <li className="nav-item">
                <Link to="/create-user" className="nav-link">
                  AddUser
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/create-event" className="nav-link">
                  AddEvent
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link to="/feedbacks" className="nav-link">
                  Feedbacks
                </Link>
              </li> */}
              <li className="nav-item">
                <Link to="/students" className="nav-link">
                  Students
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/teachers" className="nav-link">
                  Teachers
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/view-event" className="nav-link">
                  Events
                </Link>
              </li>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  logout();
                  localStorage.removeItem("token");
                  navigate("/");
                }}
                className="bg-transparent py-2 px-3 border-0"
              >
                Logout
              </button>
            </>
          );
        case "student":
          return (
            <>
              {/* <li className="nav-item">
                <Link to="/notification" className="nav-link">
                  Notifications
                </Link>
              </li> */}
              <li className="nav-item">
                <Link to="/view-event" className="nav-link">
                  Events
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/view-result" className="nav-link">
                  Results
                </Link>
              </li>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  logout();
                  localStorage.removeItem("token");
                  navigate("/");
                }}
                className="bg-transparent py-2 px-3 border-0"
              >
                Logout
              </button>
            </>
          );
        default:
          return null;
      }
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand">
          SportsSync
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">{getNavLinks()}</ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
