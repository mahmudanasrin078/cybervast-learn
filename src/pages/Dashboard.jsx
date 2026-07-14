import React from "react";

import { Link } from "react-router-dom";

import Container from "../components/common/Container";

import { useApp } from "../context/AppContext";

import coursesData from "../data/courses.json";

import { getEnrollments } from "../storage/enrollmentStorage";

const Dashboard = () => {
  const { state } = useApp();

  const enrollments = getEnrollments();

  const enrolledCourses = coursesData.courses.filter((course) =>
    enrollments.includes(course.slug),
  );

  return (
    <Container>
      <section className="py-16">
        {/* Dashboard Header */}

        <h1 className="text-4xl font-bold">
          Welcome Back,
          <span className="text-violet-500"> {state.learnerName}</span>
        
        </h1>

        <p className="mt-3 text-gray-400">
          You have enrolled in {enrolledCourses.length} course(s).
        </p>

        {/* Empty State */}

        {enrolledCourses.length === 0 ? (
          <div className="mt-10 rounded-xl border border-dashed border-gray-700 p-10 text-center">
            <h2 className="text-2xl font-semibold">No Courses Enrolled Yet</h2>

            <p className="mt-3 text-gray-400">
              Browse our courses and start your learning journey.
            </p>

            <Link
              to="/courses"
              className="mt-6 inline-block rounded-lg bg-violet-600 px-6 py-3 hover:bg-violet-700 transition"
            >
              Browse Courses
            </Link>
          </div>
        ) : (
          // Enrolled Course Cards
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {enrolledCourses.map((course) => (
              <div
                key={course.slug}
                className="rounded-xl border border-gray-800 bg-[#17171d] p-6"
              >
                <span className="rounded-full bg-violet-600/20 px-3 py-1 text-sm text-violet-400">
                  {course.category}
                </span>

                <h2 className="mt-4 text-2xl font-bold">{course.title}</h2>

                <p className="mt-3 text-gray-400">{course.blurb}</p>

                <div className="mt-6 flex items-center justify-between">
                  <span className="text-sm text-gray-400">
                    {course.durationMonths} Months
                  </span>

                  <Link
                    to={`/courses/${course.slug}`}
                    className="rounded-lg bg-violet-600 px-5 py-2 hover:bg-violet-700 transition"
                  >
                    Continue Learning
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </Container>
  );
};

export default Dashboard;
