import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendLocation } from "../config";
import { Link } from "react-router-dom";

const ViewTeamsPage = () => {
  const [teams, setTeams] = useState([]);
  const [serverError, setServerError] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`${backendLocation}/student/teams`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (response?.data?.message) {
          setServerError(response?.data?.message);
        } else {
          setTeams(response?.data);
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
      <h1>View Teams</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Captain</th>
            <th>Players</th>
            <th>Event</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team._id}>
              <td>{team.name}</td>
              <td>{team.captain.name}</td>
              <td>{team.participants.length}</td>
              <td>{team.event.name}</td>
              <td>
                <Link to={`/team/${team._id}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewTeamsPage;
