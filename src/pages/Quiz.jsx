import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

import Container from "../components/common/Container";

import coursesData from "../data/courses.json";

import { saveQuizScore } from "../storage/progressStorage";
import { hasCompletedCourse } from "../storage/progressStorage";

import toast from "react-hot-toast";

const Quiz = () => {
  const { slug, moduleId } = useParams();

  //--------Fined present course-----
  const course = coursesData.courses.find((course) => course.slug === slug);

  if (!course) {
    return (
      <Container>
        <h1 className="py-20 text-center text-4xl">Course Not Found</h1>
      </Container>
    );
  }

  const certificateUnlocked = hasCompletedCourse(course);

  //-------Present Module------

  const module = course.modules.find((item) => String(item.id) === moduleId);

  if (!module) {
    return (
      <Container>
        <h1 className="py-20 text-center text-4xl">Module Not Found</h1>
      </Container>
    );
  }

  // All Question

  const questions = module.quiz.questions;

  // Current Question Index

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  //-----All Answer saved---

  const [answers, setAnswers] = useState({});

  // Quiz Result

  const [showResult, setShowResult] = useState(false);

  const [score, setScore] = useState(0);

  // Current Question

  const currentQuestion = questions[currentQuestionIndex];

  // Next Question function

  const handleNext = () => {
    if (answers[currentQuestion.id] === undefined) {
      toast.error("Please select an answer first.");
      return;
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Previous Question

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  //--------- Submit Quiz ---------
  const handleSubmitQuiz = () => {
    if (Object.keys(answers).length !== questions.length) {
      toast.error("Please answer all questions before submitting.");
      return;
    }

    let correctAnswers = 0;

    questions.forEach((question) => {
      if (answers[question.id] === question.answerIndex) {
        correctAnswers++;
      }
    });

    // Percentage Score
    const percentage = Math.round((correctAnswers / questions.length) * 100);

    setScore(percentage);

    // Score Save Local Storage e
    saveQuizScore(course.slug, module.id, percentage);

    setShowResult(true);
  };

  if (showResult) {
    return (
      <Container>
        <section className="max-w-3xl mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">Quiz Completed</h1>

          <p className="mt-8 text-3xl text-violet-500 font-semibold">
            Your Score : {score}%
          </p>

          {/* ----- pass-----*/}

          {score >= 80 ? (
            <>
              <h2 className="mt-8 text-3xl font-bold text-green-500">
                Congratulations!
              </h2>

              <p className="mt-4 text-gray-400">You passed this quiz.</p>

              <p className="mt-2 text-gray-400">
                Your certificate has been unlocked.
              </p>
              {/* Action Buttons */}
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link
                  to="/dashboard"
                  className="rounded-lg bg-violet-600 px-8 py-3 font-medium hover:bg-violet-700 transition"
                >
                  Go to Dashboard
                </Link>

                {certificateUnlocked ? (
                  <Link
                    to={`/certificate/${course.slug}`}
                    className="rounded-lg bg-violet-600 px-6 py-3 hover:bg-violet-700 transition"
                  >
                    View Certificate
                  </Link>
                ) : (
                  <button
                    disabled
                    className="rounded-lg bg-gray-700 px-6 py-3 cursor-not-allowed opacity-60"
                  >
                    Certificate Locked
                  </button>
                )}
              </div>
            </>
          ) : (
            <>
              {/* --------Fail ------- */}
              <h2 className="mt-8 text-3xl font-bold text-red-500">
                ❌ You Failed
              </h2>

              <p className="mt-4 text-gray-400">
                You need at least 80% to pass this quiz.
              </p>

              {/* Retake button when learner are failed */}

              <button
                onClick={() => {
                  setAnswers({});
                  setCurrentQuestionIndex(0);
                  setScore(0);
                  setShowResult(false);
                }}
                className="mt-8 rounded-lg bg-violet-600 px-8 py-3 hover:bg-violet-700 transition"
              >
                Retake Quiz
              </button>
            </>
          )}
        </section>
      </Container>
    );
  }

  return (
    <Container>
      <section className="max-w-4xl mx-auto px-4 py-12 md:py-16">
        {/* Header */}

        <div className="mb-10">
          <p className="text-violet-500 font-medium">{course.title}</p>

          <h1 className="mt-3 text-4xl md:text-5xl font-bold">
            {module.title} Quiz
          </h1>

          <div className="mt-8 h-3 w-full rounded-full bg-[#23232c]">
            <div
              className="h-3 rounded-full bg-violet-600 transition-all duration-300"
              style={{
                width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        {/* Question */}

        <div className="rounded-2xl bg-[#17171d] p-6 md:p-8">
          <p className="text-sm text-gray-400">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>

          <h2 className="mt-4 text-2xl font-bold">{currentQuestion.prompt}</h2>

          {/* Options */}

          <div className="mt-8 space-y-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() =>
                  setAnswers({
                    ...answers,
                    [currentQuestion.id]: index,
                  })
                }
                className={`w-full rounded-xl border p-4 text-left transition

  ${
    answers[currentQuestion.id] === index
      ? "border-violet-500 bg-violet-700"
      : "border-gray-700 bg-[#22222b] hover:border-violet-500 hover:bg-[#2d2d38]"
  }
`}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Navigation Button  */}

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="rounded-lg bg-gray-700 px-6 py-3 disabled:opacity-40"
            >
              Previous
            </button>

            {currentQuestionIndex === questions.length - 1 ? (
              <button
                onClick={handleSubmitQuiz}
                className="rounded-lg bg-green-600 px-6 py-3 hover:bg-green-700"
              >
                Submit Quiz
              </button>
            ) : (
              <button
                onClick={handleNext}

                className="rounded-lg bg-violet-600 px-6 py-3 hover:bg-violet-700"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </section>
    </Container>
  );
};

export default Quiz;
