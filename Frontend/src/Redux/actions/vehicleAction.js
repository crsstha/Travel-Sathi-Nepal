import axios from "axios";

import {
  ALL_VEHICLE_FAIL,
  ALL_VEHICLE_REQUEST,
  ALL_VEHICLE_SUCCESS,
  VEHICLE_DETAILS_FAIL,
  VEHICLE_DETAILS_SUCCESS,
  VEHICLE_DETAILS_REQUEST,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  CLEAR_ERRORS,
  HOST_VEHICLE_SUCCESS,
  HOST_VEHICLE_FAIL,
  HOST_VEHICLE_REQUEST,
  DELETE_VEHICLE_REQUEST,
  DELETE_VEHICLE_FAIL,
  DELETE_VEHICLE_SUCCESS,
  NEW_VEHICLE_REQUEST,
  NEW_VEHICLE_SUCCESS,
  NEW_VEHICLE_FAIL,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_REQUEST,
  UPDATE_VEHICLE_REQUEST,
  UPDATE_VEHICLE_SUCCESS,
  UPDATE_VEHICLE_FAIL,
} from "../constants/vehicleConstants";

// Get All Vehicles
export const getVehicle =
  (keyword = "", currentPage = 1, min_price = [0, 25000], category, ratings = 0) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_VEHICLE_REQUEST });

      let link = `/vehicle/vehicles?keyword=${keyword}&page=${currentPage}&min_price[gte]=${min_price[0]}&min_price[lte]=${min_price[1]}&ratings[gte]=${ratings}`;

      if (category) {
        link = `/vehicle/vehicles?keyword=${keyword}&page=${currentPage}&category=${category}&ratings[gte]=${ratings}`;
      }
      const { data } = await axios.get(link
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
  
// Get Vehicles Details
export const getVehicleDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: VEHICLE_DETAILS_REQUEST });

    const { data } = await axios.get(
      `/vehicle/vehicle/${id}`
    );
    console.log(data);
    dispatch({
      type: VEHICLE_DETAILS_SUCCESS,
      payload: data,
      
    });
  } catch (error) {
    dispatch({
      type: VEHICLE_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};



// Get All Reviews of a Vehicle
export const getAllReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_REVIEW_REQUEST });

    const { data } = await axios.get(`/vehicle/reviews?id=${id}`);

    dispatch({
      type: ALL_REVIEW_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: ALL_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getHostVehicles = () => async (dispatch) => {
  try {
    dispatch({ type: HOST_VEHICLE_REQUEST });

    const { data } = await axios.get("/vehicle/host/vehicles");

    dispatch({
      type: HOST_VEHICLE_SUCCESS,
      payload: data.vehicles,
    });
  } catch (error) {
    dispatch({
      type: HOST_VEHICLE_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const getAdminVehicles = () => async (dispatch) => {
  try {
    dispatch({ type: HOST_VEHICLE_REQUEST });

    const { data } = await axios.get("/vehicle/admin/vehicles");

    dispatch({
      type: HOST_VEHICLE_SUCCESS,
      payload: data.vehicles,
    });
  } catch (error) {
    dispatch({
      type: HOST_VEHICLE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteVehicle = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_VEHICLE_REQUEST });

    const { data } = await axios.delete(`/vehicle/host/vehicle/${id}`);

    dispatch({
      type: DELETE_VEHICLE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_VEHICLE_FAIL,
      payload: error.response.data.message,
    });
  }
};


// Create Vehicle
export const createVehicle = (vehicleData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_VEHICLE_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/vehicle/add/`,
      vehicleData,
      config
    );

    dispatch({
      type: NEW_VEHICLE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_VEHICLE_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(`/vehicle/review`, reviewData, config);

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Vehicle
export const updateVehicle = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_VEHICLE_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/vehicle/host/vehicle/${id}`,
      productData,
      config
    );

    dispatch({
      type: UPDATE_VEHICLE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_VEHICLE_FAIL,
      payload: error.response.data.message,
    });
    console.log(error)
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
