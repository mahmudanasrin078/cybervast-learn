import React from "react";

import coursesData from "../../data/courses.json";

import { getProgress } from "../../storage/progressStorage";

const RecentQuizScores = () => {
  // Progress data collect in local storage 
  const progress = getProgress();

  // All Quiz Score Storage
  const quizScores = [];

  // All Course Loop
  Object.keys(progress).forEach((courseSlug) => {
    const course = coursesData.courses.find(
      (item) => item.slug === courseSlug
    );

    if (!course) return;

    //Have a quiz score
    if (progress[courseSlug].quizScores) {
      Object.entries(progress[courseSlug].quizScores).forEach(
        ([moduleId, score]) => {
          // Module founded
          const module = course.modules.find(
            (item) => String(item.id) === String(moduleId)
          );

          quizScores.push({
            courseTitle: course.title,
            moduleTitle: module?.title || "Module",
            score,
          });
        }
      );
    }
  });

  return (
    <div className="rounded-2xl border border-gray-800 bg-[#17171d] p-6">
      <h2 className="text-2xl font-bold">
        Recent Quiz Scores
      </h2>

      {/* when quiz incomplete */}
      {quizScores.length === 0 ? (
        <p className="mt-6 text-gray-400">
          No quiz completed yet.
        </p>
      ) : (
        <div className="mt-6 space-y-4">
          {quizScores.map((quiz, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg bg-[#22222b] p-4"
            >
              <div>
                <h3 className="font-semibold">
                  {quiz.courseTitle}
                </h3>

                <p className="text-sm text-gray-400">
                  {quiz.moduleTitle}
                </p>
              </div>

              <span className="rounded-lg bg-violet-600 px-4 py-2 font-bold">
                {quiz.score}%
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentQuizScores;