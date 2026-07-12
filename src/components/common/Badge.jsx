import React from 'react';

const Badge = ({children}) => {
    return (
        <div>
             <span className="px-3 py-1 text-xs rounded-full bg-violet-900 text-violet-300 uppercase">
      {children}
    </span>
        </div>
    );
};

export default Badge;