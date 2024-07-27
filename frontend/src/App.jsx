import { BrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import "./index.css";
import Login from "./pages/Login";
import Signin from "./pages/Signin";
import DashBoard from "./pages/DashBoard";
import authContext from "./context/authContext";
import { useState } from "react";
import Protected from "./component/Protected";
import { RecoilRoot } from "recoil";

// Provider

function App() {
  const [safe, setsafe] = useState(0);
  return (
    <RecoilRoot>
      <div
        
      >
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/" element={<Login />} />
          <Route
            path="/dashBoard"
            element={<Protected Component={DashBoard} />}
          />
        </Routes>
      </div>
    </RecoilRoot>
  );
}

export default App;
