import { useRecoilValue, useRecoilState } from "recoil";
import { userInfo } from "../Store/userInfo";
import axios from "axios";
import { useState } from "react";

const SmallModal = ({ isOpen, onClose, user }) => {
  const [userOrigin, setUserOrigin] = useRecoilState(userInfo);
  const [Amount, setAmount] = useState("");
  async function handleTransfer(e) {
    // console.log("woow");
    e.preventDefault();
    const val = await axios.post(
      "http://localhost:3000/api/v1/users/transfer",
      {
        toUser: user.id,
        fromUser: userOrigin.id,
        amount: parseInt(Amount),
      }
      // also update the user value
    );
    console.log(val);
    if (val.data.success) {
      const bal = await axios.post(
        "http://localhost:3000/api/v1/users/balance",
        {
          user: userOrigin.id,
        }
      );
      //want to fetch the real time balance
      setUserOrigin((prevUserInfo) => ({
        ...prevUserInfo,
        balance: bal.data.balance,
      }));
    }
  }

  console.log(userOrigin);
  if (!isOpen) return null;
  // console.log(userInfo);

  return (
    <div
      id="small-modal"
      tabIndex="-1"
      className="fixed inset-0 z-50 flex items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto"
    >
      <div className="relative w-full max-w-md max-h-full mx-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Send Money to, {user.firstName}
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={onClose}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* Modal body */}
          <div className="p-4 md:p-5 space-y-4">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Please enter the amount you want to send and the recipient's
              details.
            </p>
            <div>
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Amount
              </label>
              <input
                id="amount"
                type="number"
                value={Amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
                className=" p-2 mt-5 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 sm:text-sm dark:bg-gray-800 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Enter amount"
              />
            </div>
          </div>
          {/* Modal footer */}
          <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
              onClick={handleTransfer}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Confirm
            </button>
            <button
              onClick={onClose}
              type="button"
              className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SmallModal;
