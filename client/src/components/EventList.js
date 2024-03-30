import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { backendLocation } from "../config";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
const ViewEventPage = () => {
  const [serverError, setServerError] = useState(false);
  const [events, setEvents] = useState([]);
  const { role } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`${backendLocation}/sports`);
        if (response?.data?.message) {
          setServerError(response?.data?.message);
        } else {
          setEvents(response?.data);
        }
      } catch (error) {}
    };
    fetch();
  }, []);
  const RegisterHandler = async (id) => {
    const token = localStorage.getItem("token");
    const decode = jwtDecode(token);
    try {
      const response = await axios.put(
        `${backendLocation}/student/register-event/${id}`,
        { user: decode.id },
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
        alert("Registered Successfully");
      }
    } catch (error) {
      console.log(error.message);
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
      <h1>View Events</h1>
      {events.length > 0 ? (
        <table className="table mt-4">
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Venue</th>
              <th>Participants</th>
              {(role === "student" || role === "teacher") && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event._id}>
                <td>{event.name}</td>
                <td>{event.date}</td>
                <td>{event.time}</td>
                <td>{event.venue}</td>
                <td>{event.numberOfParticipants}</td>
                {role === "student" && (
                  <td>
                    <button onClick={() => RegisterHandler(event._id)}>
                      Register
                    </button>
                  </td>
                )}

                {role === "teacher" && (
                  <td>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/event/${event._id}`);
                      }}
                    >
                      Update
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No Events to Show</p>
      )}
    </div>
  );
};

export default ViewEventPage;
