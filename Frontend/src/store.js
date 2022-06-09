import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  newReviewReducer,
  newVehicleReducer,
  vehicleDetailsReducer,
  vehicleReducer,
  vehicleReviewsReducer,
  vehiclesReducer,
} from "./Redux/reducers/vehicleReducer";
import { allUsersReducer, profileReducer, userDetailsReducer, userReducer } from "./Redux/reducers/userReducer";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { cartReducer } from "./Redux/reducers/cartReducer";
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer } from "./Redux/reducers/orderReducer";

const persistConfig = {
  key: 'persist-key',
  storage,
};
const reducer = combineReducers({
  vehicles: vehiclesReducer,
  vehicleDetails: vehicleDetailsReducer,
  vehicleReviews: vehicleReviewsReducer,
  userDetails: userReducer,
  profile: profileReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  allOrders: allOrdersReducer,
  order: orderReducer,
  vehicle: vehicleReducer,
  allUsers: allUsersReducer,
  newVehicle: newVehicleReducer,
  newReview: newReviewReducer,
  singleuserDetails: userDetailsReducer,
});
let initialState = {
  
};


const persistedReducer = persistReducer(persistConfig, reducer);

const middleware = [thunk];
const store = createStore(
  persistedReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
const persistor = persistStore(store)
export default store;
export {persistor}
