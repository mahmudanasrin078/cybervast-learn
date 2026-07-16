import React from "react";

const ProgressCard = ({ progress }) => {
  return (
    <div className="rounded-2xl border border-gray-800 bg-[#17171d] p-6">

      <h2 className="text-2xl font-bold">
        Overall Progress
      </h2>

      <div className="mt-6 h-4 rounded-full bg-[#2a2a35]">

        <div
          className="h-4 rounded-full bg-violet-600"
          style={{
            width: `${progress}%`,
          }}
        ></div>

      </div>

      <p className="mt-4 text-lg">
        {progress}% Completed
      </p>

    </div>
  );
};

export default ProgressCard;