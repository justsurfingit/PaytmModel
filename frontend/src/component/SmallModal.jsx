import { useRecoilState } from "recoil";
import { userInfo } from "../Store/userInfo";
import axios from "axios";
import { useState } from "react";

const SmallModal = ({ isOpen, onClose, user }) => {
  const [userOrigin, setUserOrigin] = useRecoilState(userInfo);
  const [Amount, setAmount] = useState("");
  const [success, setSuccess] = useState({});
  const [showdiv, setShowdiv] = useState(false);

  async function handleTransfer(e) {
    try {
      e.preventDefault();
      const val = await axios.post(
        "https://paytmmodeltest.onrender.com/api/v1/users/transfer",
        {
          toUser: user.id,
          fromUser: userOrigin.id,
          amount: parseInt(Amount),
        }
      );
      if (val.data.success) {
        const bal = await axios.post(
          "https://paytmmodeltest.onrender.com/api/v1/users/balance",
          {
            user: userOrigin.id,
          }
        );
        setUserOrigin((prevUserInfo) => ({
          ...prevUserInfo,
          balance: bal.data.balance,
        }));
        setShowdiv(true);
        setSuccess({ message: "Transaction successful!" });
      }
    } catch (e) {
      setShowdiv(true);
      setSuccess({ message: "Transaction Failed. Try again." });
    }
  }

  if (!isOpen) return null;

  return (
    <div
      id="small-modal"
      tabIndex="-1"
      className="fixed inset-0 z-50 flex items-center justify-center w-full p-4 bg-black bg-opacity-75"
    >
      <div className="relative w-full max-w-md mx-auto">
        <div className="relative bg-black text-white rounded-lg shadow-lg p-5">
          {/* Modal header */}
          <div className="flex items-center justify-between mb-4 border-b border-gray-600 pb-2">
            <h3 className="text-lg font-medium">
              Send Money to {user.firstName}
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-700 hover:text-white rounded-lg text-sm w-8 h-8 p-1.5 inline-flex items-center justify-center"
              onClick={onClose}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          {/* Modal body */}
          <div className="space-y-4">
            <p className="text-base leading-relaxed">
              Please enter the amount you want to send.
            </p>
            <div>
              <label htmlFor="amount" className="block text-sm font-medium">
                Amount
              </label>
              <input
                id="amount"
                type="number"
                value={Amount}
                onChange={(e) => setAmount(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-800 text-white"
                placeholder="Enter amount"
              />
            </div>
          </div>
          {/* Modal footer */}
          <div className="mt-4 flex items-center justify-end space-x-4">
            <button
              onClick={handleTransfer}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Confirm
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 text-white text-sm font-medium rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Cancel
            </button>
          </div>
          {showdiv && (
            <div
              className={`mt-4 text-center p-3 rounded-lg ${
                success.message === "Transaction successful!"
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            >
              {success.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SmallModal;
