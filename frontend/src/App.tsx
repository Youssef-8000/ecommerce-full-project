import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import Home from "./Pages/Home/home";
import Register from "./Pages/Auth/Register";
import Orders from "./Pages/Orders/Orders";

function App() {
  return (
    <Routes>
      <Route path="/Login" element={<Login></Login>} />
      <Route path="/Orders" element={<Orders></Orders>} />
      <Route path="/Register" element={<Register></Register>} />
      <Route path="/" element={<Home></Home>} />
    </Routes>
  );
}

export default App;
