import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validateLogin } from "../utils/Validation";
import { backendLocation } from "../config";
function AdminLogin() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await axios.post(
        `${backendLocation}/admin/login`,
        values
      );
      if (response.data.message) {
        setServerError(response.data.message);
      } else {
        login();
        navigate(`/dashboard/${response.data._id}`);
        localStorage.setItem("token", response.data.token);
      }
    } catch (error) {
      console.log(error);
    }
    // resetForm();
  };
  const initialValues = {
    email: "",
    password: "",
  };

  return (
    <div className="login">
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
      <div>
        <h1 className="mb-0">Admin Login</h1>
        <hr className="my-0" />
        <Formik
          initialValues={initialValues}
          validationSchema={validateLogin}
          onSubmit={handleSubmit}
        >
          {({ dirty, isValid }) => (
            <Form>
              <div className="d-grid mt-1">
                <label htmlFor="email">Email</label>
                <Field type="email" id="email" name="email" />
                <ErrorMessage name="email" component="div" className="error" />
              </div>
              <div className="d-grid mt-3">
                <label htmlFor="password">Password</label>
                <Field type="password" id="password" name="password" />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error"
                />
              </div>
              <div className="d-flex justify-content-between align-items-center mt-3">
                <button type="submit" className="button">
                  Login
                </button>
                <Link className="button" to={"/"}>
                  Back
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default AdminLogin;
