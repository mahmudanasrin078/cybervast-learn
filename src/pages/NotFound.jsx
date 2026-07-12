import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
         <div className="min-h-screen flex flex-col justify-center items-center gap-4">

      <h1 className="text-7xl font-bold">
        404
      </h1>

      <p>
        Page Not Found
      </p>

      <Link
        to="/"
        className="bg-violet-600 px-6 py-2 rounded"
      >
        Go Home
      </Link>

    </div>
    );
};

export default NotFound;