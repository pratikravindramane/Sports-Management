import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendLocation } from "../config";
const CreateUserPage = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(false);
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "student",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^[0-9]+$/, "Phone number must contain only digits")
      .min(10, "Phone number must be at least 10 characters")
      .max(10, "Phone number must not exceed 10 characters"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character."
      ),
    role: Yup.string()
      .oneOf(["student", "teacher"])
      .required("Role is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    const token = localStorage.getItem("token");
    const decode = jwtDecode(token);
    try {
      const newEmployee = await axios.post(
        `${backendLocation}/admin/create-user`,
        { ...values },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (newEmployee.data.message) {
        setServerError(newEmployee.data.message);
      } else {
        navigate(`/${values.role}s`);
      }
    } catch (error) {
      console.log(error);
    }
    // resetForm();
  };

  return (
    <div className="container mt-5 narrow-form">
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
      <h1>Create User</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ touched, errors }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <Field
                type="text"
                id="name"
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
              <label htmlFor="email">Email</label>
              <Field
                type="email"
                id="email"
                name="email"
                className={`form-control ${
                  touched.email && errors.email ? "is-invalid" : ""
                }`}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <Field
                type="text"
                id="phone"
                name="phone"
                className={`form-control ${
                  touched.phone && errors.phone ? "is-invalid" : ""
                }`}
              />
              <ErrorMessage
                name="phone"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field
                type="password"
                id="password"
                name="password"
                className={`form-control ${
                  touched.password && errors.password ? "is-invalid" : ""
                }`}
              />
              <ErrorMessage
                name="password"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <Field
                as="select"
                id="role"
                name="role"
                className={`form-control ${
                  touched.role && errors.role ? "is-invalid" : ""
                }`}
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </Field>
              <ErrorMessage
                name="role"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <button type="submit" className="btn btn-primary mt-3">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateUserPage;
