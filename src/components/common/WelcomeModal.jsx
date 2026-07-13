import React, { useState } from "react";
import toast from "react-hot-toast";
import { saveLearnerName } from "../../storage/learnerStorage";
import { useApp } from "../../context/AppContext";

function WelcomeModal({ onClose }) {
  // input state
  const [name, setName] = useState("");

  //   -----------
  const { dispatch } = useApp();

  // Continue Button click
  const handleContinue = () => {
    // ------Input are empty --------
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    // localStorage e Save
    saveLearnerName(name);

    // Context Update
    dispatch({
      type: "SET_LEARNER_NAME",
      payload: name,
    });

    // Success Message
    toast.success("Welcome to CyberVast Learn!");

    // Modal close
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#141419] rounded-xl p-8 w-[420px]">
        <h2 className="text-3xl font-bold mb-3">Welcome</h2>

        <p className="text-gray-400 mb-6">Enter your name to continue</p>
        {/* Input */}
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-700 rounded-lg bg-[#1D1D24] px-4 py-3 outline-none focus:border-violet-600"
        />
        {/* Button */}
        <button
          onClick={handleContinue}
          className="mt-6 w-full bg-violet-600 hover:bg-violet-700 py-3 rounded-lg"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default WelcomeModal;
