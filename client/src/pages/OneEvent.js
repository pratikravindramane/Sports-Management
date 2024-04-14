import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendLocation } from "../config";
import { useParams,useNavigate } from "react-router-dom";

const UpdateWinnersPage = () => {
  const [event, setEvents] = useState({});
  const [selectedWinners, setSelectedWinners] = useState({});
  const [serverError, setServerError] = useState(false);
  const [team, setTeam] = useState([]);
  const params = useParams();
  const navigate= useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventData = await axios.get(
          `${backendLocation}/sports/${params.id}`
        );
        const teamsData = await axios.get(
          `${backendLocation}/student/by-event/teams/${params.id}`
        );

        if (eventData.data?.message) {
          setServerError(eventData.data.message);
        } else {
          setEvents(eventData.data);
        }

        if (teamsData.data?.message) {
          setServerError(teamsData.data.message);
        } else {
          setTeam(teamsData.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params.id]);

  const handleWinnerChange = (eventId, prize, teamId) => {
    setSelectedWinners((prevWinners) => ({
      ...prevWinners,
      [eventId]: { ...prevWinners[eventId], [prize]: teamId },
    }));
  };

  const handleSubmit = async (eventId) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(
        `${backendLocation}/teacher/update-result/${eventId}`,
        { winners: selectedWinners[eventId] },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data?.message) {
        setServerError(response.data.message);
      }else{
        navigate("/view-result");
      }
    } catch (error) {
      console.error("Error updating winners:", error);
    }
  };

  return (
    <div className="container mt-5" style={{ minHeight: "56vh" }}>
      {serverError && (
        <div className="alert alert-danger" role="alert">
          {serverError}
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => setServerError(false)}
          ></button>
        </div>
      )}

      <h1 className="mb-4">Update Winners</h1>

      <div className="card mb-4">
        <div className="card-body">
          <h2 className="card-title">{event.name}</h2>
          <p className="card-text">Date: {event.date}</p>
          <p className="card-text">Venue: {event.venue}</p>
          <p className="card-text">
            Number of Participants: {event.numberOfParticipants}
          </p>

          <form>
            <div className="mb-3">
              <label
                htmlFor={`firstWinner_${event._id}`}
                className="form-label"
              >
                First Prize:
              </label>
              <select
                id={`firstWinner_${event._id}`}
                className="form-select"
                value={selectedWinners[event._id]?.first || ""}
                onChange={(e) =>
                  handleWinnerChange(event._id, "first", e.target.value)
                }
              >
                <option value="">Select team</option>
                {team.map((team) => (
                  <option key={team._id} value={team._id}>
                    {team.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label
                htmlFor={`secondWinner_${event._id}`}
                className="form-label"
              >
                Second Prize:
              </label>
              <select
                id={`secondWinner_${event._id}`}
                className="form-select"
                value={selectedWinners[event._id]?.second || ""}
                onChange={(e) =>
                  handleWinnerChange(event._id, "second", e.target.value)
                }
              >
                <option value="">Select team</option>
                {team.map((team) => (
                  <option key={team._id} value={team._id}>
                    {team.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label
                htmlFor={`thirdWinner_${event._id}`}
                className="form-label"
              >
                Third Prize:
              </label>
              <select
                id={`thirdWinner_${event._id}`}
                className="form-select"
                value={selectedWinners[event._id]?.third || ""}
                onChange={(e) =>
                  handleWinnerChange(event._id, "third", e.target.value)
                }
              >
                <option value="">Select team</option>
                {team.map((team) => (
                  <option key={team._id} value={team._id}>
                    {team.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              className="btn btn-primary"
              onClick={() => handleSubmit(event._id)}
            >
              Update Winners
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateWinnersPage;
