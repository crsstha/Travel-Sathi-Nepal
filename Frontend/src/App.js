import {  useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/footer/Footer";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Navbar from "./components/navbar/Navbar";
import ForgetPassword from "./components/password/ForgetPassword";
import ResetPassword from "./components/password/ResetPassword";
import Register from "./components/userRegister/Register";
import VehicleDetails from "./components/vehicle/VehicleDetails";
import store from "./store";
import { loadUser } from "./Redux/actions/userAction";
import Vehicles from "./components/vehicle/Vehicles";
import BecomeHost from "./components/Host/BecomeHost";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import { useSelector } from "react-redux";
import Profile from "./components/profile/Profile";
import Navbar2 from "./components/navbar/Navbar2";
import UpdatePassword from "./components/profile/UpdatePassword";
import UpdateProfile from "./components/profile/UpdateProfile";
import Addvehicle from "./components/Host/Addvehicle";
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import MyOrders from "./components/order/MyOrders";
import OrderDetails from "./components/order/OrderDetails";
import GetPayment from "./components/cart/GetPayment";
import OrderSuccess from "./components/cart/OrderSuccess";
import Dashboard from "./components/dashboard/Dashboard";
import OrderList from "./components/dashboard/OrderList";
import AllOrderList from "./components/dashboard/AllOrderList";
import AddvehicleDash from "./components/dashboard/AddvehicleDash";
import ProcessOrder from "./components/dashboard/ProcessOrder";
import UpdatevehicleDash from "./components/dashboard/UpdatevehicleDash";
import Contact from "./components/about/Contact";
import About from "./components/about/About";
import VehicleList from "./components/dashboard/VehicleList";
import AllVehicleList from "./components/dashboard/AllVehicleList";
import UsersList from "./components/dashboard/UsersList";


function App() {
  const { isAuthenticated, user } = useSelector((state) => state.userDetails);

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        {isAuthenticated ? <Navbar user={user} /> : <Navbar2 />}

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/aboutus" element={<About />} />
          <Route exact path="/vehicle/:id" element={<VehicleDetails />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/Register"
            element={<Register />}
          />
          <Route
            path="/forgotpassword"
            element={<ForgetPassword />}
          />
          <Route
            exact
            path="/passwordreset/:Token"
            element={<ResetPassword  />}
          />
          <Route exact path="/vehicles/:keyword" element={<Vehicles />} />
          <Route exact path="/vehicles/" element={<Vehicles />} />
          <Route exact path="/becomeahost" element={<BecomeHost />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            exact
            path="/updatePassword"
            element={
              <ProtectedRoute>
                <UpdatePassword />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/update"
            element={
              <ProtectedRoute>
                <UpdateProfile />
              </ProtectedRoute>
            }
          />
          <Route exact path="/addvehicle" element={<ProtectedRoute><Addvehicle /></ProtectedRoute>} />
          <Route exact path="/favourites" element={<Cart />} />
          <Route exact path="/rent" element={<Shipping />} />
          <Route
            exact
            path="/rent/confirm"
            element={
              <ProtectedRoute>
                <ConfirmOrder />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/orders"
            element={
              <ProtectedRoute>
                <MyOrders />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/ordersuccess"
            element={
              <ProtectedRoute>
                <OrderSuccess />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/order/:id"
            element={
              <ProtectedRoute>
                <OrderDetails />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/payment/:id"
            element={
              <ProtectedRoute>
                <GetPayment />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/host/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
           <Route
            exact
            path="/host/vehicles"
            element={
              <ProtectedRoute>
                <VehicleList />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/admin/users"
            element={
              <ProtectedRoute>
                <UsersList />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/admin/vehicles"
            element={
              <ProtectedRoute>
                <AllVehicleList />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/host/orders"
            element={
              <ProtectedRoute>
                <OrderList/>
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/admin/orders"
            element={
              <ProtectedRoute>
                <AllOrderList/>
              </ProtectedRoute>
            }
          />
           <Route
            exact
            path="/host/addVehicle"
            element={
              <ProtectedRoute>
                <AddvehicleDash/>
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/host/updateVehicle/:id"
            element={
              <ProtectedRoute>
                <UpdatevehicleDash/>
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/host/processorder/:id"
            element={
              <ProtectedRoute>
                <ProcessOrder/>
              </ProtectedRoute>
            }
          />
        </Routes>
        
        <Footer />
      </div>
    </BrowserRouter>
  );
}
export default App;
