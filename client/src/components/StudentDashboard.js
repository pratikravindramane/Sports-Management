import React from "react";

const StudentDashboard = () => {
  // Sample data for upcoming events and notifications
  const upcomingEvents = [
    {
      id: 1,
      name: "Event 1",
      date: "2024-04-15",
      time: "10:00 AM",
      venue: "Stadium A",
    },
    {
      id: 2,
      name: "Event 2",
      date: "2024-04-20",
      time: "2:00 PM",
      venue: "Stadium B",
    },
  ];

  const notifications = [
    { id: 1, message: "Notification 1" },
    { id: 2, message: "Notification 2" },
  ];

  return (
    <div className="container mt-5">
      <h1>Student Dashboard</h1>

      {/* Upcoming Events */}
      <div className="mt-4">
        <h2>Upcoming Events</h2>
        <ul>
          {upcomingEvents.map((event) => (
            <li key={event.id}>
              <strong>{event.name}</strong> - {event.date} at {event.time},
              Venue: {event.venue}
            </li>
          ))}
        </ul>
      </div>

      {/* Registered Events */}
      <div className="mt-4">
        <h2>Registered Events</h2>
        <p>No events registered yet.</p>
        {/* You can display registered events here */}
      </div>

      {/* Notifications */}
      <div className="mt-4">
        <h2>Notifications</h2>
        <ul>
          {notifications.map((notification) => (
            <li key={notification.id}>{notification.message}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StudentDashboard;
