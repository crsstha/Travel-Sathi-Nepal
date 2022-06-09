import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import bak from "../img/back2.png";
import { useAlert } from "react-alert";

export default function ResetPassword(props) {
  const [formValues, setEmail] = useState({ password: "", cpassword: "" });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  let history = useNavigate();
  const alert = useAlert();
  const { Token } = useParams();

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
            `/user/auth/passwordreset/${Token}`,
            {
              method: "put",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                password: formValues.password,
              }),
            }
          );
          const jsons = await response.json();
          console.log(jsons);
          if (jsons.success) {
            history("/login");
            console.log("New Password has been Set");
            alert.success("New Password has been Set");
          } else {
            console.log("Email Sent Unsucessfully");
            alert.error(" Unsucessfully! Try Again.");
          }
        } catch (error) {}
      };
      handleUser();
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    if (!values.password) {
      errors.password = "*Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be more than 6 characters";
    }
    if (!values.cpassword) {
      errors.cpassword = "*Password is required";
    } else if (values.cpassword !== values.password) {
      errors.cpassword = "Password Dont Match";
    }

    return errors;
  };
  return (
    <div className="login">
      <img className="bg-1" src={bak} alt="background" />
      <form onSubmit={handleSubmit}>
        <div className="form-inner">
          <h2
            className="hed"
            style={{ fontSize: "40px", paddingBottom: "10px" }}
          >
            Reset Password
          </h2>
          <div className="form-floating">
            <input
              type="password"
              name="password"
              placeholder="Enter new Password"
              className="form-control"
              value={formValues.password}
              onChange={handleChange}
            />
            <label htmlFor="floatingPassword">Enter a New Password</label>
          </div>
          <span className="error">{formErrors.password}</span>
          <div className="form-floating">
            <input
              type="password"
              name="cpassword"
              placeholder="Confirm new Password"
              className="form-control"
              value={formValues.cpassword}
              onChange={handleChange}
            />
            <label htmlFor="floatingPassword">Confirm Password</label>
          </div>
          <span className="error">{formErrors.cpassword}</span>
          <button type="submit" className="btn btn-success btn-lg btn-block">
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
}
