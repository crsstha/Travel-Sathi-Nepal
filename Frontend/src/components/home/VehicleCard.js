import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";

export default function VehicleCard({ vehicle }) {
  const options = {
    value: vehicle.ratings,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <Link className="vehicleCard" to={`/vehicle/${vehicle._id}`}>
      <img src={vehicle.images[0].url} alt={vehicle.model} />
      <p>{vehicle.model}</p>
      <div>
        <Rating {...options} />{" "}
        <span className="vehicleCardSpan">
          {" "}
          ({vehicle.numOfReviews} Reviews)
        </span>
      </div>
      <span>{`रू${vehicle.min_price} /Hour`}</span>
    </Link>
  );
}
