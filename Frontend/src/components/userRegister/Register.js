import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import bak from "../img/back3.png";
import pro from "../img/Profile.png";
import { clearErrors, register } from "../../Redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";

export default function Register() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useNavigate();
  const { error, isAuthenticated } = useSelector(
    (state) => state.userDetails
  )
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    username: "",
    email: "",
    phone:"",
    password: "",
    password2: "",
  });
  
  const [formErrors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState(pro);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setValues({ ...values, [e.target.name]: e.target.value });
    }
  };
  // const handleUser = async (e) => {
  //   const response = await fetch("http://localhost:5000/user/auth/register", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       firstName: values.firstName,
  //       lastName: values.lastName,
  //       dob: values.dob,
  //       username: values.username,
  //       phone:values.phone,
  //       email: values.email,
  //       password: values.password2,
  //       password2: values.password2,
  //       avatar:avatar
  //     }),
  //   });
  //   const jsons = await response.json();
  //   console.log(values);
  //   console.log(jsons);
  //   if (jsons.sucess) {
  //     localStorage.setItem("token", jsons.authtoken);
  //     history("/login");
  //     console.log("Registeration Sucessful");
  //     props.showAlert("Registeration Successful", "success");
  //   } else {
  //     props.showAlert(
  //       "Registeration Unsuccessful ! Please Check Your Details",
  //       "danger"
  //     );
  //   }
  // };
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);

    const myForm = new FormData();

    myForm.set("firstName", values.firstName);
    myForm.set("lastName", values.lastName);
    myForm.set("dob", values.dob);
    myForm.set("email", values.email);
    myForm.set("password", values.password);
    myForm.set("password2", values.password2);
    myForm.set("phone", values.phone);
    myForm.set("username", values.username);
    myForm.set("avatar", avatar);

    dispatch(register(myForm));
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      history("/");
      alert.success("Registration Successful")
    }
  }, [dispatch, error, alert, history, isAuthenticated]);
  // useEffect(() => {

  //   // console.log(formErrors);
  //   // if (Object.keys(formErrors).length === 0 && isSubmitting) {
  //   //   handleUser();
  //   // }
  // }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.firstName.trim()) {
      errors.firstName = "*First Name requried!";
    }

    if (!values.lastName.trim()) {
      errors.lastName = "*Last Name requried!";
    }
    if (!values.dob.trim()) {
      errors.dob = "*Date of Birth requried!";
    }

    if (!values.username.trim()) {
      errors.username = "*Username requried!";
    }
    if (!values.phone.trim()) {
      errors.phone = "*Phone Number requried!";
    }

    if (!values.email) {
      errors.email = "*Email required";
    } else if (!regex.test(values.email)) {
      errors.email = "*Email Address is Invalid";
    }
    if (!values.password) {
      errors.password = "*Password is required";
    } else if (values.password.length < 6) {
      errors.password = "*Password needs to 6 characters or more";
    }

    if (!values.password2) {
      errors.password2 = "*Password is required";
    } else if (values.password2 !== values.password) {
      errors.password2 = "*Password do not match";
    }
    return errors;
  };

  return (
    <div className="reg-center">
      <h1 style={{ textAlign: "center" }}>
        <span style={{ color: "Orange" }}>Get Started </span>with us today!{" "}
        <br />
        Create Your Account By filling out the information below
      </h1>
      <div className="row">
        <div className="col-xl-6">
          <img className="bg-2" src={bak} alt="background" />
        </div>
        <div className="col-xl-6">
          <form className="reg-form" onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            <div className="form-floating mb-3 ">
              <input
                type="text"
                name="firstName"
                className="form-control"
                placeholder="Enter your First Name"
                value={values.firstName}
                onChange={handleChange}
              />
              <label htmlFor="floatingInput">First Name</label>
              {formErrors.firstName && <p>{formErrors.firstName}</p>}
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="form-control"
                placeholder="Enter your Last Name"
                value={values.lastName}
                onChange={handleChange}
              />
              <label htmlFor="floatingInput" className="form-label">
                Last Name
              </label>
              {formErrors.lastName && <p>{formErrors.lastName}</p>}
            </div>
            <div className="form-floating mb-3">
              <input
                type="date"
                id="dob"
                name="dob"
                className="form-control"
                placeholder="Enter your Date of birth"
                value={values.dob}
                onChange={handleChange}
              />
              <label htmlFor="floatingInput" className="form-label">
                Date of Birth
              </label>
              {formErrors.dob && <p>{formErrors.dob}</p>}
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                id="username"
                name="username"
                className="form-control"
                placeholder="Enter your Username"
                value={values.username}
                onChange={handleChange}
              />
              <label htmlFor="username" className="form-label">
                Username
              </label>
              {formErrors.username && <p>{formErrors.username}</p>}
            </div>
            <div className="form-floating mb-3">
              <input
                type="email"
                id="email"
                name="email"
                className="form-control is-validt"
                placeholder="Enter your email"
                value={values.email}
                onChange={handleChange}
              />
              <label htmlFor="floatingInput" className="form-label">
                Email
              </label>
              {formErrors.email && <p>{formErrors.email}</p>}
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                id="phone"
                name="phone"
                className="form-control"
                placeholder="Enter your Phone Number"
                value={values.phone}
                onChange={handleChange}
              />
              <label htmlFor="username" className="form-label">
               Phone number
              </label>
              {formErrors.phone && <p>{formErrors.phone}</p>}
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                id="password"
                name="password"
                className="form-control is-validt"
                placeholder="Enter your Password"
                value={values.password}
                onChange={handleChange}
              />
              <label htmlFor="floatingInput" className="form-label">
                Password
              </label>
              {formErrors.password && <p>{formErrors.password}</p>}
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                id="password2"
                name="password2"
                className="form-control is-validt"
                placeholder="Enter your Password"
                value={values.password2}
                onChange={handleChange}
              />
              <label htmlFor="floatingInput" className="form-label">
                Confirm Password
              </label>
              {formErrors.password2 && <p>{formErrors.password2}</p>}
            </div>
            <div className=" form-floating mb-3" id="registerImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
            <div className="col-12">
              <button type="submit" className="btn btn-success">
                Sign Up
              </button>
            </div>
          </form>
          <div className="signup">
            <h1>Already have an account? </h1>
            <Link to="/login" className="btn btn-outline-success">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
