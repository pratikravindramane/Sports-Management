import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendLocation } from "../config";
import { jwtDecode } from "jwt-decode";

const ViewNotificationPage = () => {
  const [serverError, setServerError] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `${backendLocation}/student/notification/${decode.id}`,
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
          setNotifications(response?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);
  //   const notifications = [
  //     {
  //       user: {
  //         _id: "user1",
  //         name: "John Doe",
  //       },
  //       message: "Notification 1",
  //       createdAt: new Date(),
  //     },
  //     {
  //       user: {
  //         _id: "user2",
  //         name: "Jane Smith",
  //       },
  //       message: "Notification 2",
  //       createdAt: new Date(),
  //     },
  //     // Add more demo notification entries as needed
  //   ];

  return (
    <div className="container mt-5">
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
      <h1>Notifications</h1>
      <ul className="list-group mt-4">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <li key={notification._id} className="list-group-item">
              <strong>User:</strong> {notification.user.name}
              <br />
              <strong>Message:</strong> {notification.message}
              <br />
              <small className="text-muted">
                Created at: {new Date(notification.createdAt).toLocaleString()}
              </small>
            </li>
          ))
        ) : (
          <p>No notifications</p>
        )}
      </ul>
    </div>
  );
};

export default ViewNotificationPage;
