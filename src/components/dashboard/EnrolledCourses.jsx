import React from "react";
import { Link } from "react-router-dom";

const EnrolledCourses = ({ courses }) => {
  return (
    <div className="rounded-2xl border border-gray-800 bg-[#17171d] p-6">

      <h2 className="text-2xl font-bold">
        Enrolled Courses
      </h2>

      <div className="mt-6 space-y-4">

        {courses.map((course) => (

          <div
            key={course.slug}
            className="flex items-center justify-between rounded-lg bg-[#22222b] p-4"
          >

            <div>

              <h3 className="font-semibold">
                {course.title}
              </h3>

              <p className="text-sm text-gray-400">
                {course.category}
              </p>

            </div>

            <Link
              to={`/courses/${course.slug}`}
              className="rounded-lg bg-violet-600 px-4 py-2 hover:bg-violet-700"
            >
              Open
            </Link>

          </div>

        ))}

      </div>

    </div>
  );
};

export default EnrolledCourses;