import React from "react";
import Container from "../common/Container";
import coursesData from "../../data/courses.json";
import { Trophy } from "lucide-react";

const Statistics = () => {
  // Total Courses
  const totalCourses = coursesData.courses.length;

  // Total Lessons
  const totalLessons = coursesData.courses.reduce(
    (total, course) =>
      total +
      (course.modules?.reduce(
        (lessonTotal, module) => lessonTotal + (module.lessons?.length || 0),
        0,
      ) || 0),
    0,
  );

  // Total Quizzes
  const totalQuizzes = coursesData.courses.reduce(
    (total, course) =>
      total + (course.modules?.filter((module) => module.quiz).length || 0),
    0,
  );

  return (
    <section className="bg-[#111118] py-20">
      <Container>
        <div className="grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
          {/* Courses */}
          <div className="rounded-xl border border-gray-800 bg-[#17171d] p-8">
            <h2 className="text-5xl font-bold text-violet-500">
              {totalCourses}+
            </h2>
            <p className="mt-3 text-gray-400">Courses</p>
          </div>

          {/* Lessons */}
          <div className="rounded-xl border border-gray-800 bg-[#17171d] p-8">
            <h2 className="text-5xl font-bold text-violet-500">
              {totalLessons}+
            </h2>
            <p className="mt-3 text-gray-400">Lessons</p>
          </div>

          {/* Quizzes */}
          <div className="rounded-xl border border-gray-800 bg-[#17171d] p-8">
            <h2 className="text-5xl font-bold text-violet-500">
              {totalQuizzes}+
            </h2>
            <p className="mt-3 text-gray-400">Quizzes</p>
          </div>

          {/* Certificate */}
          <div className="rounded-xl border border-gray-800 bg-[#17171d] p-8">
            <div className="flex justify-center">
              <Trophy size={48} className="text-violet-500" />
            </div>
            <p className="mt-3 text-gray-400">Printable Certificate</p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Statistics;
