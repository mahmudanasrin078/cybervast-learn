// import React from 'react';
// import { Outlet } from 'react-router-dom';

// import Navbar from "../components/layout/Navbar";
// import Footer from "../components/layout/Footer";

// const MainLayout = () => {
//     return (
//          <div className="min-h-screen  bg-[#0A0A0C] text-white flex flex-col">
//       <Navbar />

//       <main className="flex-1 ">
//         <Outlet></Outlet>
//       </main>

//       <Footer />
//     </div>
//     );
// };

// export default MainLayout;

import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import { useApp } from "../context/AppContext";
import { getLearnerName } from "../storage/learnerStorage";

const MainLayout = () => {
  
  const { dispatch } = useApp();

  
  useEffect(() => {
    const savedName = getLearnerName();

    if (savedName) {
      dispatch({
        type: "SET_LEARNER_NAME",
        payload: savedName,
      });
    }
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-white flex flex-col">
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
