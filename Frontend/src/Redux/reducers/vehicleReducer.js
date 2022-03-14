import {
  ALL_VEHICLE_FAIL,
  ALL_VEHICLE_REQUEST,
  ALL_VEHICLE_SUCCESS,
  HOST_VEHICLE_REQUEST,
  HOST_VEHICLE_SUCCESS,
  HOST_VEHICLE_FAIL,
  NEW_VEHICLE_REQUEST,
  NEW_VEHICLE_SUCCESS,
  NEW_VEHICLE_FAIL,
  NEW_VEHICLE_RESET,
  UPDATE_VEHICLE_REQUEST,
  UPDATE_VEHICLE_SUCCESS,
  UPDATE_VEHICLE_FAIL,
  UPDATE_VEHICLE_RESET,
  DELETE_VEHICLE_REQUEST,
  DELETE_VEHICLE_SUCCESS,
  DELETE_VEHICLE_FAIL,
  DELETE_VEHICLE_RESET,
  VEHICLE_DETAILS_REQUEST,
  VEHICLE_DETAILS_FAIL,
  VEHICLE_DETAILS_SUCCESS,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_RESET,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_RESET,
  CLEAR_ERRORS,
} from "../constants/vehicleConstants";

export const vehiclesReducer = (state = { vehicles: [] }, action) => {
  switch (action.type) {
    case ALL_VEHICLE_REQUEST:
    case HOST_VEHICLE_REQUEST:
      return {
        loading: true,
        vehicles: [],
      };
    case ALL_VEHICLE_SUCCESS:
      return {
        loading: false,
        vehicles: action.payload.vehicles,
        vehiclesCount: action.payload.vehiclesCount,
        resultPerPage: action.payload.resultPerPage,
        filteredvehiclesCount: action.payload.filteredVEHICLEsCount,
      };
    case HOST_VEHICLE_SUCCESS:
      return {
        loading: false,
        VEHICLEs: action.payload,
      };
    case ALL_VEHICLE_FAIL:
    case HOST_VEHICLE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const newVEHICLEReducer = (state = { VEHICLE: {} }, action) => {
  switch (action.type) {
    case NEW_VEHICLE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_VEHICLE_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        VEHICLE: action.payload.VEHICLE,
      };
    case NEW_VEHICLE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_VEHICLE_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const VEHICLEReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_VEHICLE_REQUEST:
    case UPDATE_VEHICLE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_VEHICLE_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_VEHICLE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_VEHICLE_FAIL:
    case UPDATE_VEHICLE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_VEHICLE_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_VEHICLE_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const VEHICLEDetailsReducer = (state = { VEHICLE: {} }, action) => {
  switch (action.type) {
    case VEHICLE_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case VEHICLE_DETAILS_SUCCESS:
      return {
        loading: false,
        VEHICLE: action.payload,
      };
    case VEHICLE_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const newReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_REVIEW_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case NEW_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_REVIEW_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const VEHICLEReviewsReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case ALL_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_REVIEW_SUCCESS:
      return {
        loading: false,
        reviews: action.payload,
      };
    case ALL_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const reviewReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case DELETE_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_REVIEW_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
