import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import bak from "../img/back2.png";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login } from "../../Redux/actions/userAction";
import Loader from "../Loader/Loader";

export default function Login() {
  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const history = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.userDetails
  );
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    dispatch(login(formValues.email, formValues.password));
    
  };
  useEffect(() => {
    if (error) {
      alert.error("Invlid Email Or Password");
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      alert.show("Login Sucessfully",{type: 'success'});
      history("/");
      
    }
  }, [dispatch, error, alert, history, isAuthenticated]);

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
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
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
                <button
                  type="submit"
                  className="btn btn-success btn-lg btn-block"
                >
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
        </Fragment>
      )}
    </Fragment>
  );
}
