import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import TeacherDashboard from "./components/TeacherDashboard";
import StudentDashboard from "./components/StudentDashboard";
import EventList from "./components/EventList";
import NotFound from "./components/NotFound";
import AboutUsPage from "./pages/AboutUs";
import ContactUsPage from "./pages/ContactUs";
import Navbar from "./components/Navbar";
import HomePage from "./pages/Home";
import SignupPage from "./pages/Signup";
import { useAuth } from "./context/AuthContext";
import ViewNotificationPage from "./pages/ViewNotification";
import Footer from "./components/Footer";
import "./App.css";
import ViewResultPage from "./pages/ViewResult";
import CreateUserPage from "./pages/CreateUser";
import CreateEventPage from "./pages/CreateEvent";
import ViewStudentsPage from "./pages/Students";
import ViewTeachersPage from "./pages/Teachers";
import AddTeamPage from "./pages/AddTeam";
import ViewTeamsPage from "./pages/Teams";
import ViewTeamPage from "./pages/OneTeam";
import UpdateWinnersPage from "./pages/OneEvent";
const App = () => {
  const { isLoggedIn, role } = useAuth();
  return (
    <div>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route exact path="/" element={<HomePage />} />
        {/* <Route exact path="/" element={<LoginForm />} /> */}
        <Route exact path="/login" element={<LoginForm />} />
        <Route exact path="/signup" element={<SignupPage />} />
        <Route exact path="/aboutus" element={<AboutUsPage />} />
        <Route exact path="/contactus" element={<ContactUsPage />} />

        {/* <Route exact path="/signup" element={Sing}>
        <h1>Sign Up Page</h1>
      </Route> */}

        {/* Private Routes */}
        {isLoggedIn && role === "teacher" && (
          <>
            <Route path="/dashboard" element={<TeacherDashboard />} />
            <Route path="/event/:id" element={<UpdateWinnersPage />} />
          </>
        )}
        {isLoggedIn && role === "student" && (
          <>
            <Route path="/view-result" element={<ViewResultPage />} />
            <Route path="/notification" element={<ViewNotificationPage />} />
          </>
        )}
        {isLoggedIn && role === "admin" && (
          <>
            <Route path="/create-user" element={<CreateUserPage />} />
            <Route path="/create-event" element={<CreateEventPage />} />
            <Route path="/feedbacks" element={<ViewNotificationPage />} />
            <Route path="/students" element={<ViewStudentsPage />} />
            <Route path="/teachers" element={<ViewTeachersPage />} />
          </>
        )}
        {isLoggedIn && (
          <>
            <Route path="/view-event" element={<EventList />} />
            <Route path="/view-result" element={<ViewResultPage />} />
            <Route path="/create-team" element={<AddTeamPage />} />
            <Route path="/teams" element={<ViewTeamsPage />} />
            <Route path="/team/:id" element={<ViewTeamPage />} />
          </>
        )}

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
