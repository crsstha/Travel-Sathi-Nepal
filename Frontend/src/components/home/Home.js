import React, { Fragment, useEffect } from "react";
import "./home.css";
import { Link } from "react-router-dom";
import back from "../img/gif2.gif";
import backs from "../img/gif3.gif";
import Searchbar from "./Searchbar/Searchbar";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getVehicle } from "../../Redux/actions/vehicleAction";
import VehicleCard from "./VehicleCard";
import Loader from "../Loader/Loader";
import Accordions from "../Host/Accordions";

export default function Home() {
  const dispatch = useDispatch();
  const { loading, error, vehicles } = useSelector((state) => state.vehicles);
  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    dispatch(getVehicle());
  }, [dispatch, error]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="home">
            <div className="hero-section">
              <div className="container ">
                <div className="row content">
                  <div className="hero-content col-xl-6 ">
                    <h1>
                      <span style={{ color: "Orange" }}>Looking </span> To{" "}
                      <br></br>
                      Rent a Bike or Car
                    </h1>
                    <p>
                      We offer Motorbike, Scooter, Car, Pickup Truck, etc on hire at a cheap price around Nepal.
                      Renting a Bike or Car in Nepal is easy and swift for
                      travelers: either locals or foreigners. We do have a wide
                      range of Bike or Car for rental service to explore around
                      Cities or a long ride outside.
                    </p>
                    <Link to="/vehicles" className="btn btn-outline-success">
                      Book a Car or Bike
                    </Link>
                  </div>
                  <div className="col-xl-6">
                    <img src={back} alt=""></img>
                  </div>
                </div>
              </div>
            </div>
            <div className="searchbar">
              <Searchbar />
            </div>
            <h2 className="homeHeading">
              <span style={{ color: "Orange" }}>Freatured</span> Vehicles
            </h2>
            <div className="container" id="container">
              {vehicles &&
                vehicles.map((vehicle) => (
                  <VehicleCard key={vehicle._id} vehicle={vehicle} />
                ))}
            </div>

            <div className="container faq" id="container">
              <div className="row">
                <div className="col-xl-6 col-sm-6">
                  <h2 className="homeHeading">
                    <span style={{ color: "Orange" }}>Frequently</span> Asked
                    Questions
                  </h2>
                  <Accordions />
                </div>
                <div className="col-xl-6 col-sm-6">
                  <img src={backs} alt=""></img>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
