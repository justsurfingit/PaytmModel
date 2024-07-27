import React, { useState } from "react";
import SmallModal from "./SmallModal";

const ShowUserData = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div
      className="bg-violet-800"
      style={{
        display: "flex",
        justifyContent: "space-between",
        margin: "10px",
        border: "1px solid black",
        alignItems: "center",
        borderRadius: "7px",
        padding: "12px",
        color: "white",
      }}
    >
      <div className="text-xl">
        {user.firstName}&nbsp; &nbsp;{user.lastName}
      </div>

      <button
        style={{
          backgroundColor: "black",
          color: "white",
          padding: "10px",
          borderRadius: "5px",
        }}
        onClick={() => {
          setIsModalOpen(!isModalOpen);
        }}
      >
        Send Money
      </button>
      <SmallModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default ShowUserData;
