import React from "react";
import Container from "../common/Container";

const steps = [
  "Browse Courses",
  "Enroll",
  "Complete Lessons",
  "Take Quiz",
  "Get Certificate",
];

const LearningJourney = () => {
  return (
    <section className="py-20">
      <Container>
        <div className="text-center">
          <h2 className="text-4xl font-bold">
            Your Learning Journey
          </h2>

          <p className="mt-4 text-gray-400">
            Complete your course in five simple steps.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-800 bg-[#17171d] p-8 text-center"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-violet-600 font-bold">
                {index + 1}
              </div>

              <h3 className="mt-6 font-semibold">{step}</h3>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default LearningJourney;