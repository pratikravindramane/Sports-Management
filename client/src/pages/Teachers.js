import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for making HTTP requests
import { backendLocation } from "../config";

const ViewTeachersPage = () => {
  const [teachers, setTeachers] = useState([]);
  const [serverError, setServerError] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `${backendLocation}/admin/view-teachers`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response?.data?.message) {
          setServerError(response?.data?.message);
        } else {
          setTeachers(response?.data);
        }
      } catch (error) {}
    };
    fetch();
  }, [token]);

  return (
    <div className="container mt-5 view-height">
      {serverError && (
        <>
          <div className="error-div">
            <p>{serverError}</p>
            <button
              onClick={(e) => {
                e.preventDefault();
                setServerError(false);
              }}
              className="button border border-dark bg-danger"
            >
              ok
            </button>
          </div>
        </>
      )}
      <h1>View Teachers</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher._id}>
              <td>{teacher.name}</td>
              <td>{teacher.email}</td>
              <td>{teacher.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewTeachersPage;
