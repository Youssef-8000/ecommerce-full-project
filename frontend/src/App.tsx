import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import Home from "./Pages/Home/home";
import Register from "./Pages/Auth/Register";
import Orders from "./Pages/Orders/Orders";
import Cart from "./Pages/Cart/Cart";
import { useEffect, useState } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("userId") ? true : false);
  useEffect(() => {
    setIsAuthenticated(localStorage.getItem("userId") ? true : false);
  }, [isAuthenticated]);
  return (
    <Routes>
      <Route path="/Login" element={<Login></Login>} />
      {isAuthenticated && <Route path="/Orders" element={<Orders setIsAuthenticated={setIsAuthenticated}></Orders>} />}
      <Route path="/Register" element={<Register></Register>} />
      <Route path="/" element={<Login></Login>} />
      {isAuthenticated && <Route path="/Products" element={<Home></Home>} />}
      {isAuthenticated && <Route path="/Cart" element={<Cart></Cart>} />}
    </Routes>
  );
}

export default App;
