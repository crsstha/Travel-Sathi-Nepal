import axios from "axios";

import {
  ALL_VEHICLE_FAIL,
  ALL_VEHICLE_REQUEST,
  ALL_VEHICLE_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/vehicleConstants";

// Get All Products
export const getVehicle =
  (keyword = "", currentPage = 1, price = [0, 25000], category, ratings = 0) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_VEHICLE_REQUEST });

      const { data } = await axios.get(
        "http://localhost:5000/vehicle/vehicles"
      );

      dispatch({
        type: ALL_VEHICLE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_VEHICLE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
