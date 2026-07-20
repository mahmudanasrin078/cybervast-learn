import React from "react";
import { useParams, Link } from "react-router-dom";

import Container from "../components/common/Container";

import coursesData from "../data/courses.json";

import { getQuizScore } from "../storage/progressStorage";

import { hasCompletedCourse } from "../storage/progressStorage";
import { getLearnerName } from "../storage/learnerStorage";

const Certificate = () => {
  const { slug } = useParams();

  // Present course founded
  const course = coursesData.courses.find((item) => item.slug === slug);

  // Course
  if (!course) {
    return (
      <Container>
        <div className="py-20 text-center">
          <h1 className="text-4xl font-bold">Course Not Found</h1>
        </div>
      </Container>
    );
  }

  // -------------
  const unlocked = hasCompletedCourse(course);

  if (!unlocked) {
    return (
      <Container>
        <section className="max-w-3xl mx-auto py-20 text-center">
          <h1 className="text-5xl font-bold">🔒 Certificate Locked</h1>

          <p className="mt-6 text-gray-400">
            Complete all lessons and pass every module quiz with at least 80% to
            unlock your certificate.
          </p>
        </section>
      </Container>
    );
  }

  // Learner Name
  const learnerName = getLearnerName();

  // Fast Module
  const firstModule = course.modules[0];

  // Quiz Score
  const score = getQuizScore(course.slug, firstModule.id);

  // Unlock Logic
  const isUnlocked = score >= 80;

  // Completion Date
  const completionDate = new Date().toLocaleDateString();

  // Print Function
  const handlePrint = () => {
    window.print();
  };

  return (
    <Container>
      <section className="py-12 md:py-20">
        {/*------ Locked -----*/}

        {!isUnlocked ? (
          <div className="mx-auto max-w-3xl rounded-2xl border border-red-600 bg-[#17171d] p-10 text-center">
            <h1 className="text-4xl font-bold text-red-500">
              Certificate Locked
            </h1>

            <p className="mt-6 text-gray-400">
              Complete the quiz with at least
              <span className="font-bold text-white"> 80%</span> to unlock your
              certificate.
            </p>

            <Link
              to={`/courses/${course.slug}/quiz/${firstModule.id}`}
              className="mt-8 inline-block rounded-lg bg-violet-600 px-6 py-3 hover:bg-violet-700 transition"
            >
              Go To Quiz
            </Link>
          </div>
        ) : (
          //-------- Certificate ---------

          <div className="certificate-print mx-auto max-w-5xl rounded-3xl border-4 border-violet-600 bg-white p-8 text-center text-black shadow-2xl md:p-16">
            <p className="text-lg tracking-[8px] uppercase text-gray-600 mt-4">
              Certificate
            </p>

            <h1 className="mt-4 text-4xl font-bold md:text-6xl">
              Certificate of Completion
            </h1>

            <p className="mt-10 text-lg">
              This Certificate is Proudly Presented To
            </p>

            <h2 className="mt-6 text-4xl font-bold text-violet-700 md:text-6xl">
              {learnerName}
            </h2>

            <p className="mt-10 text-lg">For Successfully Completing</p>

            <h3 className="mt-4 text-3xl font-bold">{course.title}</h3>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <div>
                <p className="text-gray-500">Completion Date</p>

                <h4 className="mt-2 text-xl font-semibold">{completionDate}</h4>
              </div>

              <div>
                <p className="text-gray-500">Quiz Score</p>

                <h4 className="mt-2 text-xl font-semibold">{score}%</h4>
              </div>
            </div>

            {/* Buttons */}

            <div className="mt-14 flex flex-col justify-center gap-4 sm:flex-row">
              <button
                onClick={handlePrint}
                className="rounded-lg bg-violet-600 px-8 py-3 text-white hover:bg-violet-700 transition"
              >
                Print Certificate
              </button>

              <button
                onClick={handlePrint}
                className="rounded-lg border border-violet-600 px-8 py-3 text-violet-700 hover:bg-violet-100 transition"
              >
                Download PDF
              </button>
            </div>
          </div>
        )}
      </section>
    </Container>
  );
};

export default Certificate;
