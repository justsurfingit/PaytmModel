import React, { useEffect, useState } from "react";
import {
  useRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import { userInfo } from "../Store/userInfo";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import AllUser from "../component/AllUser";

const DashBoard = () => {
  const [udata, setudata] = useRecoilState(userInfo);
  const [data, setData] = useState(udata);
  const Navigate = useNavigate();
  useEffect(() => {
    setData(udata);
  }, [udata]);

  if (!data) return <div>Loading user data...</div>;
  function handleLogout(e) {
    e.preventDefault();
    Cookies.remove("authStatus");
    Cookies.remove("userInfo");
    setudata({});
    Navigate("/");
  }
  return (
    <div
      style={{
        backgroundColor: "#141619",
        height: "auto",
        color: "white",
        margin: "0px",
        padding: "5px",
        boxSizing: "border-box",
        width: "100%",
        minHeight: "100vh",
      }}
    >
      <div>
        <div className="text-3xl text-center p-3">Money Transfer Hub</div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-around",
            backgroundColor: "#141619",
            color: "white",
            padding: "18px",
            marginBottom: "12px",
          }}
          // className="flex "
        >
          <h1 className="text-xl">Welcome, {data.firstName}</h1>
          <h3>Balance: {data.balance}</h3>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <AllUser />
    </div>
  );
};

export default DashBoard;
