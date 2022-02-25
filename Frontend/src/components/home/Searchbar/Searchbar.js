import React from "react";
import "./Searchbar.css";
export default function Searchbar() {
  return (
    <div className="form-container">
      <form action="">
        <div className="input-box">
          <span>Location</span>
          <input
            typeof="search"
            name=""
            id=""
            placeholder="Search Places"
          ></input>
        </div>
        <div className="input-box">
          <span>Pick-Up Date</span>
          <input type="date" name="" id="" placeholder="Searrch Places"></input>
        </div>
        <div className="input-box">
          <span>Return Date</span>
          <input type="date" name="" id="" placeholder="Searrch Places"></input>
        </div>
        <input type="submit" className="btn"></input>
      </form>
    </div>
  );
}
