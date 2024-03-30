import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { backendLocation } from "../config";
import { useNavigate } from "react-router-dom";

const AddTeamPage = () => {
  const [events, setEvents] = useState([]);
  const [serverError, setServerError] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [eventValue, setEventValue] = useState("");
  const [applicants, setApplicants] = useState();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`${backendLocation}/sports`);
        if (response?.data?.message) {
          setServerError(response?.data?.message);
        } else {
          setEvents(response?.data);
        }
      } catch (error) {}
    };
    const fetch = async () => {
      try {
        const response = await axios.get(
          `${backendLocation}/admin/view-students`,
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
          setUsers(response?.data);
        }
      } catch (error) {}
    };
    fetch();
    fetchEvent();
  }, []);
  const handleParticipantToggle = (event, setFieldValue) => {
    const selectedOptions = Array.from(event.target.options)
      .filter((option) => option.selected)
      .map((option) => option.value);

    setFieldValue("participants", selectedOptions);
  };
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const newCompany = await axios.post(
        `${backendLocation}/teacher/create-team`,
        { ...values, event: eventValue },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (newCompany.data.message) {
        setServerError(newCompany.data.message);
      } else {
        navigate("/teams");
      }
    } catch (error) {
      console.log(error);
    }
    // resetForm();
  };
  const changeHandler = async (e) => {
    if (e.target.value === "") {
      setShow(false);
    } else {
      try {
        setEventValue(e.target.value);
        setShow(true);
        const selectedEvent = events.find(
          (event) => event._id === e.target.value
        );
        setApplicants(selectedEvent.applicants);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="container mt-5 view-height narrow-form">
      <h1>Add Team</h1>
      <Formik
        initialValues={{
          name: "",
          event: "",
          captain: "",
          participants: [],
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required("Name is required"),
          // event: Yup.string().required("Event is required"),
          captain: Yup.string().required("Captain is required"),
          participants: Yup.array().min(
            1,
            "At least one participant is required"
          ),
        })}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, setFieldValue }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="name">Team Name</label>
              <Field
                type="text"
                name="name"
                className={`form-control ${
                  touched.name && errors.name ? "is-invalid" : ""
                }`}
              />
              <ErrorMessage
                name="name"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-group">
              <label htmlFor="event">Event</label>
              <Field
                as="select"
                name="event"
                className={`form-control ${
                  touched.event && errors.event ? "is-invalid" : ""
                }`}
                value={eventValue}
                onChange={(e) => {
                  // handleChange(e);

                  e.preventDefault();
                  changeHandler(e);
                }}
              >
                <option value="">Select Event</option>
                {events.map((event) => (
                  <option key={event._id} value={event._id}>
                    {event.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="event"
                component="div"
                className="invalid-feedback"
              />
            </div>
            {show && (
              <>
                <div className="form-group">
                  <label htmlFor="captain">Captain</label>
                  <Field
                    as="select"
                    name="captain"
                    className={`form-control ${
                      touched.captain && errors.captain ? "is-invalid" : ""
                    }`}
                  >
                    <option value="">Select Captain</option>
                    {applicants?.map((e) => (
                      <option key={e.user._id} value={e.user._id}>
                        {e.user.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="captain"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="participants">Participants</label>
                  <Field
                    as="select"
                    name="participants"
                    className={`form-control ${
                      touched.participants && errors.participants
                        ? "is-invalid"
                        : ""
                    }`}
                    multiple
                    onChange={(event) =>
                      handleParticipantToggle(event, setFieldValue)
                    }
                    value={values.participants}
                  >
                    {applicants?.map((e) => (
                      <option key={e.user._id} value={e.user._id}>
                        {e.user.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="participants"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
              </>
            )}
            <button type="submit" className="btn btn-primary mt-3">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddTeamPage;
