import React from "react";

const CourseProgressCard = ({ course, progress }) => {
  return (
    <div className="rounded-2xl border border-gray-800 bg-[#17171d] p-6">

      {/* Header */}

      <div className="flex items-start justify-between">

        <div>

          <h3 className="text-xl font-bold">
            {course.title}
          </h3>

          <p className="mt-1 text-sm text-gray-400">
            {course.category}
          </p>

        </div>

        <span className="rounded-full bg-violet-600/20 px-3 py-1 text-sm font-semibold text-violet-400">
          {progress}%
        </span>

      </div>

      {/* Progress Bar */}

      <div className="mt-6 h-3 overflow-hidden rounded-full bg-gray-700">

        <div
          className="h-full rounded-full bg-violet-600 transition-all duration-500"
          style={{
            width: `${progress}%`,
          }}
        />

      </div>

      {/* Footer */}

      <div className="mt-4 flex items-center justify-between">

        <span className="text-sm text-gray-400">
          Progress
        </span>

        <span className="text-sm font-medium text-violet-400">
          {progress}% Completed
        </span>

      </div>

    </div>
  );
};

export default CourseProgressCard;