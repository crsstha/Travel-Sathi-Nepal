import React from "react";
import { useState, useEffect } from "react";
import bak from "../img/back2.png";
import "./ForgetPassword.css";
import { useAlert } from "react-alert";

export default function ForgetPassword() {
  const [formValues, setEmail] = useState({ email: "" });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const alert = useAlert();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmail({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      const handleUser = async (e) => {
        try {
          const response = await fetch(
            "/user/auth/forgotpassword",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: formValues.email,
              }),
            }
          );
          const jsons = await response.json();
          console.log(jsons);

          if (jsons.success) {
            console.log("Email Sent Sucessfully");
            alert.success(
              "Email Sent Sucessfully , Please Check your Email"
            );
          } else {
            console.log("Email Sent Sucessfully");
            alert.error(
              "Email Sent unsucessfully! Please Check You email."
            );
          }
        } catch (error) {}
      };
      handleUser();
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = "*Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    return errors;
  };
  return (
    <div className="login">
      <img className="bg-1" src={bak} alt="background" />
      <form onSubmit={handleSubmit}>
        <div className="form-inner">
          <h2 className="hed" style={{ fontSize: "40px" }}>
            Forgot Password
          </h2>
          <p
            className="forgotpassword-screen__subtext"
            style={{ fontSize: "24px", textAlign: "left", margin: "20px" }}
          >
            Please enter the email address you register your account with. We
            will send you reset password confirmation to this email
          </p>
          <div className="form-floating mb-3">
            <input
              type="text"
              required
              name="email"
              className="form-control"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
            />
            <label htmlFor="floatingInput">Email Address</label>
          </div>
          <span className="error">{formErrors.email}</span>
          <button type="submit" className="btn btn-success btn-lg btn-block">
            Sent
          </button>
        </div>
      </form>
    </div>
  );
}
