import React, { useEffect, useState } from "react";
import { useApp } from "../context/AppContext";
import { getLearnerName } from "../storage/learnerStorage";
import WelcomeModal from "../components/common/WelcomeModal";

const Home = () => {
  //----Show Modal----
  const [showModal, setShowModal] = useState(false);

  //------ Context----
  const { dispatch } = useApp();

  useEffect(() => {
    // local Storage e name
    const savedName = getLearnerName();

    if (savedName) {
      // when name is found.then context update
      dispatch({
        type: "SET_LEARNER_NAME",
        payload: savedName,
      });
    } else {
      //when name is not found then show modal
      setShowModal(true);
    }
  }, [dispatch]);

  return (
    <>
      {/* Welcome modal */}
      {showModal && <WelcomeModal onClose={() => setShowModal(false)} />}

      {/* <div className="py-20 text-center">
        <h1 className="text-5xl font-bold">Welcome to CyberVast Learn</h1>

        <p className="mt-4 text-gray-400">Learn Today. Lead Tomorrow.</p>
      </div> */}

      {/* Hero Section */}

      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl font-bold">
          Learn Today.
          <span className="text-violet-500"> Lead Tomorrow.</span>
        </h1>
        <p className="mt-6 text-gray-400">
          CyberVast Learn helps you master practical skills through structured
          learning.
        </p>
      </section>
    </>
  );
};

export default Home;
