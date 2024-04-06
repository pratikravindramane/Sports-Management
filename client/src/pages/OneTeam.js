import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams to get the team id from the URL
import axios from "axios";
import { backendLocation } from "../config";

const ViewTeamPage = () => {
  const [team, setTeam] = useState({});
  const token = localStorage.getItem("token");
  const [serverError, setServerError] = useState(false);

  const params = useParams();
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `${backendLocation}/student/one/team/${params.id}`,
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
          setTeam(response?.data);
        }
      } catch (error) {}
    };
    fetch();
  }, [params.id, token]);
  if (!team) {
    return <div>Loading...</div>; // Show loading indicator while fetching data
  }

  return (
    <div className="container mt-5" >
      <h1>View Team</h1>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Name: {team?.name}</h5>
          <p className="card-text">Captain: {team?.captain?.name}</p>
          <p className="card-text">Event: {team?.event?.name}</p>
          <p className="card-text">Venue: {team?.event?.venue}</p>
          <p className="card-text">Date: {team?.event?.date}</p>
          <p className="card-text">Time: {team?.event?.time}</p>
          <h6 className="card-subtitle mb-2 text-muted">Participants:</h6>
          <ul className="list-group">
            {team?.participants?.map((participant) => (
              <li key={participant._id} className="list-group-item">
                {participant.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ViewTeamPage;
