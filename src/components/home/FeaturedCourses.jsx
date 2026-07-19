import React from "react";
import { Link } from "react-router-dom";

import coursesData from "../../data/courses.json";

import CourseCard from "../course/CourseCard";

import Container from "../common/Container";

const FeaturedCourses = () => {
  const featuredCourses = coursesData.courses.slice(0, 3);

  return (
    <section className="py-20">
      <Container>
        <div className="text-center">
          <h2 className="text-4xl font-bold">Featured Courses</h2>

          <p className="mt-4 text-gray-400">
            Start learning with our most popular programs.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featuredCourses.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/courses"
            className="rounded-lg bg-violet-600 px-8 py-3 hover:bg-violet-700 transition"
          >
            View All Courses
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default FeaturedCourses;
