import React from "react";
import { Link } from "react-router-dom";

const ContinueLearningCard = ({ course }) => {
  if (!course) return null;

  return (
    <div className="rounded-2xl border border-gray-800 bg-[#17171d] p-6">

      <h2 className="text-2xl font-bold">
        Continue Learning
      </h2>

      <h3 className="mt-6 text-xl font-semibold">
        {course.title}
      </h3>

      <p className="mt-3 text-gray-400">
        {course.blurb}
      </p>

      <Link
        to={`/courses/${course.slug}`}
        className="mt-6 inline-block rounded-lg bg-violet-600 px-6 py-3 hover:bg-violet-700 transition"
      >
        Resume Course
      </Link>

    </div>
  );
};

export default ContinueLearningCard;