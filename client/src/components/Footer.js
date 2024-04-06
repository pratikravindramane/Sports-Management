import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-5 py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5>Follow Us</h5>
            <ul className="list-inline d-grid">
              <li className="list-inline-item">
                <a href="https://www.facebook.com">Facebook</a>
              </li>
              <li className="list-inline-item">
                <a href="https://www.twitter.com">Twitter</a>
              </li>
              <li className="list-inline-item">
                <a href="https://www.instagram.com">Instagram</a>
              </li>
            </ul>
          </div>
          <div className="col-md-6">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/aboutus">About Us</Link>
              </li>
              <li>
                <Link to="/contactus">Contact Us</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
            </ul>
          </div>
        </div>
        <hr />
        <div className="row mt-3">
          <div className="col">
            <p className="text-center">&copy; 2024 Sport Event Management</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
