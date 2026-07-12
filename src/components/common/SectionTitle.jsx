import React from "react";

const SectionTitle = ({ title, subtitle }) => {
  return (
    <div className="mb-10 text-center">
      <h2 className="text-4xl font-bold text-white">{title}</h2>

      {subtitle && (
        <p className="mt-3 text-gray-400 max-w-2xl mx-auto">{subtitle}</p>
      )}
    </div>
  );
};

export default SectionTitle;
