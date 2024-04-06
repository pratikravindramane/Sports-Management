import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for making HTTP requests
import { backendLocation } from "../config";
import { useAuth } from "../context/AuthContext";

const ViewTeachersPage = () => {
  const [teachers, setTeachers] = useState([]);
  const [serverError, setServerError] = useState(false);
  const { role } = useAuth();
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
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  });

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(
        `${backendLocation}/admin/delete/user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (data?.message) {
        setServerError(data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
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
            {role === "admin" && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {teachers?.map((e) => (
            <tr key={e._id}>
              <td>{e.name}</td>
              <td>{e.email}</td>
              <td>{e.phone}</td>
              {role === "admin" && (
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteHandler(e._id)}
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewTeachersPage;
