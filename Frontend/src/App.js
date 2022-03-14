import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Alert from "./components/Alert";
import Footer from "./components/footer/Footer";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Navbar from "./components/navbar/Navbar";
import ForgetPassword from "./components/password/ForgetPassword";
import ResetPassword from "./components/password/ResetPassword";
import Register from "./components/userRegister/Register";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Alert alert={alert} />
        <div className="section">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login showAlert={showAlert} />} />
            <Route
              path="/Register"
              element={<Register showAlert={showAlert} />}
            />
            <Route
              path="/forgotpassword"
              element={<ForgetPassword showAlert={showAlert} />}
            />
            <Route
              exact
              path="/passwordreset/:Token"
              element={<ResetPassword showAlert={showAlert} />}
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
export default App;
