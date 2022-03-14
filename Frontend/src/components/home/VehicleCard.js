import React from "react";
import { Link } from "react-router-dom";

export default function VehicleCard({ vehicle }) {
  const options = {
    value: vehicle.ratings,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <>
      <Link className="productCard" to={`/vehicle/${vehicle._id}`}>
        <img src={vehicle.images[0].url} alt={vehicle.Model} />
        <p>{vehicle.location}</p>
        <div>
          <span className="productCardSpan">
            {" "}
            ({vehicle.numOfReviews} Reviews)
          </span>
        </div>
        <span>{`₹${vehicle.price}`}</span>
      </Link>
    </>
  );
}
