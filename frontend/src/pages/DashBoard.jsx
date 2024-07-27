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
import axios from "axios";

const DashBoard = () => {
  const [udata, setUdata] = useRecoilState(userInfo);

  const navigate = useNavigate();

  async function getLatestBalance() {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/balance",
        {
          user: udata.id,
        }
      );
      return response.data.balance;
    } catch (error) {
      console.error("Error fetching balance:", error);
      return udata.balance; // Return the current balance in case of an error
    }
  }

  useEffect(() => {
    const updateBalance = async () => {
      const balance = await getLatestBalance();
      setUdata((previousData) => ({
        ...previousData,
        balance: balance,
      }));
    };

    updateBalance();
  }, []);

  if (!udata) return <div>Loading user data...</div>;

  function handleLogout(e) {
    e.preventDefault();
    Cookies.remove("authStatus");
    Cookies.remove("userInfo");
    setUdata({});
    navigate("/");
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
      <div style={{ border: "3px solid violet" }}>
        <div className="text-3xl text-center p-3">Money Transfer Hub</div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            backgroundColor: "#141619",
            color: "white",
            padding: "18px",
            marginBottom: "12px",
          }}
        >
          <h1 className="text-xl">Welcome, {udata.firstName}</h1>
          <h3>Balance: {udata.balance}</h3>
          <button
            style={{ border: "2px solid violet", padding: "10px" }}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
      <AllUser />
    </div>
  );
};

export default DashBoard;
