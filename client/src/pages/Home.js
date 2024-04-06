import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="container mt-5 pt-3" style={{ minHeight: "52vh" }}>
      <div className="row">
        <div className="col-md-6">
          <h1 className="fs-1 fw-bold">Welcome to Sport Event Management</h1>
          <p className="fs-6">
            At Sport Event Management, we're passionate about sports and
            dedicated to helping athletes, teams, and sports enthusiasts achieve
            their goals. Whether you're a professional athlete, a weekend
            warrior, or a sports organization looking to streamline your
            operations, we've got you covered.
          </p>
          <Link to="/login" className="btn btn-primary my-4">
            Login
          </Link>
        </div>
        <div className="col-md-6">
          <img
            src="https://t3.ftcdn.net/jpg/02/78/42/76/360_F_278427683_zeS9ihPAO61QhHqdU1fOaPk2UClfgPcW.jpg"
            alt="Sport Event"
            className="img-fluid"
          />
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-4">
          <img
            src="https://static.toiimg.com/photo/64697339.cms"
            alt="Football"
            className="img-fluid rounded"
          />
          <p className="fs-6 text-center mt-3">
            Football: A game loved by millions, known for its exhilarating
            moments and team spirit.
          </p>
        </div>
        <div className="col-md-4">
          <img
            src="https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D"
            alt="Basketball"
            className="img-fluid rounded"
          />
          <p className="fs-6 text-center mt-3">
            Basketball: Fast-paced and dynamic, basketball is a sport that
            demands skill, strategy, and teamwork.
          </p>
        </div>
        <div className="col-md-4">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSakncXUJaWdsTf86CLJTcghMZB-3IoNM-Stic8hHM7NA&s"
            alt="Tennis"
            className="img-fluid rounded"
          />
          <p className="fs-6 text-center mt-3">
            Tennis: An elegant and competitive sport that requires agility,
            precision, and mental strength.
          </p>
        </div>
        {/* Add more images and paragraphs for other sports */}
      </div>
    </div>
  );
};

export default HomePage;
