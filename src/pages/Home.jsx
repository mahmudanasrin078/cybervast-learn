import React, { useEffect, useState } from "react";

import { getLearnerName } from "../storage/learnerStorage";
import WelcomeModal from "../components/common/WelcomeModal";
import FeaturedCourses from "../components/home/FeaturedCourses";
import WhyChooseUs from "../components/home/WhyChooseUs";
import LearningJourney from "../components/home/LearningJourney";
import Statistics from "../components/home/Statistics";
import Testimonials from "../components/home/Testimonials";
import CTASection from "../components/home/CTASection";
import Container from "../components/common/Container";

const Home = () => {
  //----Show Modal----
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const savedName = getLearnerName();

    if (!savedName) {
      setShowModal(true);
    }
  }, []);

  return (
    <>
      {/* Welcome modal */}
      {showModal && <WelcomeModal onClose={() => setShowModal(false)} />}

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

      <FeaturedCourses></FeaturedCourses>

      <WhyChooseUs></WhyChooseUs>

      {/* <LearningJourney></LearningJourney> */}

      <Statistics></Statistics>

      <Testimonials></Testimonials>

      <CTASection></CTASection>
    </>
  );
};

export default Home;
