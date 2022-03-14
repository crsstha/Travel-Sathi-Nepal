import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import bak from "../img/back2.png";

export default function Login(props) {
  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  let history = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
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
            "http://localhost:5000/user/auth/login",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: formValues.email,
                password: formValues.password,
              }),
            }
          );
          const jsons = await response.json();
          console.log(jsons);
          if (jsons.sucess) {
            localStorage.setItem("token", jsons.authtoken);
            history("/");
            console.log("Login Sucessful");
            props.showAlert("Login sucessful", "success");
          } else {
            console.log("Login Unsucess");
            props.showAlert(
              "Login unsucessful! Please Check You email and Password",
              "danger"
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
    if (!values.password) {
      errors.password = "*Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be more than 6 characters";
    }

    return errors;
  };
  return (
    <div className="login">
      <img className="bg-1" src={bak} alt="background" />
      <form onSubmit={handleSubmit}>
        <div className="form-inner">
          <h2 className="hed">LOGIN</h2>
          <div className="form-floating mb-3">
            <input
              type="text"
              name="email"
              className="form-control"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
            />
            <label htmlFor="floatingInput">Email Address</label>
          </div>
          <span className="error">{formErrors.email}</span>
          <div className="form-floating">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="form-control"
              value={formValues.password}
              onChange={handleChange}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <span className="error">{formErrors.password}</span>
          <Link to="/forgotpassword" className="pass">
            Forget Password?
          </Link>
          <button type="submit" className="btn btn-success btn-lg btn-block">
            Login
          </button>
        </div>
      </form>
      <div className="new">
        <h1> Don't have an Travel Sathi Nepal Account?</h1>
        <Link
          to="/Register"
          className="btn btn-outline-success btn-lg btn-block"
        >
          Create Account
        </Link>
      </div>
    </div>
  );
}
