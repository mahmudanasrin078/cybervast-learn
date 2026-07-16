import React from "react";

const StatsCard = ({ title, value }) => {
  return (
    <div className="rounded-2xl bg-[#17171d] p-6 border border-gray-800">

      <p className="text-gray-400">
        {title}
      </p>

      <h2 className="mt-3 text-4xl font-bold text-violet-500">
        {value}
      </h2>

    </div>
  );
};

export default StatsCard;