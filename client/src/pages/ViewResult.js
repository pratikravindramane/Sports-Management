import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendLocation } from "../config";

const ViewResultPage = () => {
  const [events, setEvents] = useState([]);
  const [serverError, setServerError] = useState(false);

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
      <h1>View Results</h1>
      {events.length > 0 ? (
        <table className="table mt-4">
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Winner</th>
              <th>Second Place</th>
              <th>Third Place</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event._id}>
                <td>{event.name}</td>
                <td>
                  {event?.winners?.first ? event?.winners?.first?.name : "Wait"}
                </td>
                <td>
                  {event?.winners?.second
                    ? event?.winners?.second?.name
                    : "Wait"}
                </td>
                <td>
                  {event?.winners?.third ? event?.winners?.third?.name : "Wait"}{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No events right now</p>
      )}
    </div>
  );
};

export default ViewResultPage;
