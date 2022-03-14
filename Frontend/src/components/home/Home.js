import React, { useEffect } from "react";
import "./home.css";
import { Link } from "react-router-dom";
import back from "../img/baackground1.png";
import Searchbar from "./Searchbar/Searchbar";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getVehicle } from "../../Redux/actions/vehicleAction";
import VehicleCard from "./VehicleCard";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVehicle());
  }, [dispatch]);
  return (
    <div className="hero-section">
      <div className="container">
        <div className="row content">
          <div className="hero-content col-xl-6">
            <h1 className="">
              <span style={{ color: "Orange" }}>Looking </span> To <br></br>Rent
              a Bike or Car
            </h1>
            <p>
              Ea irure reprehenderit pariatur esse cillum ea sit ea nisi labore.
              Ipsum esse culpa sint tempor duis. Aliquip enim officia ullamco
              proident nisi aliqua ut sint commodo excepteur nostrud proident
              eiusmod commodo. Nulla qui excepteur mollit qui. Sunt anim ea ex
              magna consectetur ullamco pariatur fugiat duis dolor cillum
              voluptate culpa.
            </p>
            <Link to="#" className="btn btn-outline-primary">
              Get Started
            </Link>
          </div>
          <div className="col-xl-6">
            <img src={back} alt=""></img>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-9">
            <Searchbar />
          </div>
        </div>
        <h2 className="homeHeading">Featured Products</h2>
      </div>
    </div>
  );
}
