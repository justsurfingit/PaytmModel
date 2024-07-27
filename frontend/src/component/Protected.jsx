import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userInfo } from "../Store/userInfo";

const Protected = ({ Component }) => {
  const navigate = useNavigate();
  const setUserDetails = useSetRecoilState(userInfo);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authStatus = Cookies.get("authStatus");
    const user = Cookies.get("userInfo");

    if (!authStatus || !user) {
      navigate("/"); // Redirect if not authenticated
    } else {
      setUserDetails(JSON.parse(user)); // Set user info in Recoil state
    }

    setLoading(false); // Set loading to false after processing
  }, []);

  if (loading) return <h1>Loading...</h1>;

  return <Component />;
};

export default Protected;
