import React, { useEffect, useState } from "react";
import "../index.css";
import axios from "axios";
import ShowUserData from "./ShowUserData";

const AllUser = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/users/all"
        );
        setUsers(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);
  function isvalid(user) {
    // logic to filter user
    // console.log(user);
    if (filter == "") return 1;
    const f = user.firstName.toLowerCase();
    const l = user.lastName.toLowerCase();
    // console.log(f);
    const fil = filter.toLowerCase();
    if (f.includes(fil) || l.includes(fil)) return 1;
    return 0;
  }
  return (
    <>
      <form
        style={{
          width: "50vw",
          margin: "auto",
          marginTop: "10px",
          marginBottom: "20px",
        }}
        className="group relative "
      >
        <svg
          width="20"
          height="20"
          fill="currentColor"
          className="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          />
        </svg>
        <input
          className="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm"
          type="text"
          aria-label="Filter projects"
          placeholder="Find User..."
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
          }}
        />
      </form>
      <div style={{ width: "80vw", margin: "auto" }}>
        {users.map((user) =>
          isvalid(user) ? <ShowUserData user={user} key={user._id} /> : null
        )}
      </div>
    </>
  );
};

export default AllUser;
