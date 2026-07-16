import React from "react";
import { useApp } from "../../context/AppContext";

const WelcomeCard = () => {
  const { state } = useApp();

  return (
    <div className="rounded-2xl bg-gradient-to-r from-violet-700 to-purple-600 p-8 text-white">
      <h2 className="text-3xl font-bold">Welcome Back,</h2>

      <h1 className="mt-3 text-4xl font-bold">
        {state.learnerName || "Learner"}
      </h1>

      <p className="mt-4 text-violet-100">
        Continue learning and complete your courses.
      </p>
    </div>
  );
};

export default WelcomeCard;
