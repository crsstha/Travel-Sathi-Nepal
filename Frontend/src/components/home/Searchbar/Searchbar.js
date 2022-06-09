import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Searchbar.css";
export default function Searchbar() {
  const [keyword, setKeyword] = useState("");
  const [tripStart, setTripStart] = useState("");
  const [tripEnd, setTripEnd] = useState("");

  const Days = new Date(Date.parse(tripEnd)-Date.parse(tripStart)).getDate() - 1
  const history = useNavigate();

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history(`/vehicles/${keyword}&TripDuration[lte]=${Days}`);
    } else {
      history("/vehicles");
    }
  };

  return (
    <div className="form-container">
      <form  onSubmit={searchSubmitHandler}>
        <div className="input-box">
          <span>Location</span>
          <input
            typeof="search"
            name=""
            id=""
            placeholder="Search Places"
            onChange={(e) => setKeyword(e.target.value)}
          ></input>
        </div>
        <div className="input-box">
          <span>Pick-Up Date</span>
          <input type="date" name="" id="" placeholder="Searrch Places" onChange={(e) => setTripStart(e.target.value)}></input>
        </div>
        <div className="input-box">
          <span>Return Date</span>
          <input type="date" name="" id="" placeholder="Searrch Places" onChange={(e) => setTripEnd(e.target.value)}></input>
        </div>
        <input type="submit" className="btn"></input>
      </form>
    </div>
  );
}
