import React from "react";

const Button = ({ children, className = "", ...props }) => {
  return (
    <div>
      <button
        className={`bg-violet-600 hover:bg-violet-700 transition text-white px-5 py-2 rounded-lg ${className}`}
        {...props}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
