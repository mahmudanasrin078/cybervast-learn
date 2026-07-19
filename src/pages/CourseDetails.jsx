import React, { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";

import toast from "react-hot-toast";

import { useApp } from "../context/AppContext";

import { saveEnrollment } from "../storage/enrollmentStorage";

import coursesData from "../data/courses.json";

import Container from "../components/common/Container";

import { isEnrolled } from "../storage/enrollmentStorage";
import SkeletonLoader from "../components/common/SkeletonLoader";

const CourseDetails = () => {
   const [loading, setLoading] = useState(true);
  const { dispatch } = useApp();
  const { slug } = useParams();
  // -----------
 useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, []);
  const course = coursesData.courses.find((item) => item.slug === slug);

  const enrolled = isEnrolled(course.slug);

  const [openModule, setOpenModule] = useState(null);

  const handleEnroll = () => {
    if (enrolled) {
      toast("Already Enrolled");
      return;
    }

    saveEnrollment(course.slug);

    dispatch({
      type: "ENROLL_COURSE",
      payload: course.slug,
    });

    toast.success("Successfully Enrolled!");
  };

  if (!course) {
    return (
      <Container>
        <div className="py-24 text-center">
          <h1 className="text-4xl font-bold">Course Not Found</h1>
        </div>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container>
        <section className="py-20">
          <SkeletonLoader count={1} />
        </section>
      </Container>
    );
  }


  return (
    <Container>
      {/* ----- Hero section------ */}
      <section className="py-16">
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          {/* -------- Left content---------- */}
          <div>
            {/* Category */}
            <span className="inline-block rounded-full bg-violet-600/20 px-4 py-1 text-sm text-violet-400">
              {course.category}
            </span>

            {/* Course Title */}
            <h1 className="mt-5 text-4xl lg:text-5xl font-bold">
              {course.title}
            </h1>

            {/* Description */}
            <p className="mt-5 text-gray-400 leading-8">{course.blurb}</p>

            {/* Course Information */}
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="rounded-lg bg-[#17171d] px-5 py-3">
                <p className="text-sm text-gray-400">Duration</p>

                <h3 className="font-semibold">
                  {course.durationMonths} Months
                </h3>
              </div>

              <div className="rounded-lg bg-[#17171d] px-5 py-3">
                <p className="text-sm text-gray-400">Instructor</p>

                <h3 className="font-semibold">{course.instructor.name}</h3>
              </div>
            </div>

            {/* Button */}

            <button
              onClick={handleEnroll}
              disabled={enrolled}
              className={`mt-8 rounded-lg px-8 py-3 font-semibold transition
    ${
      enrolled
        ? "bg-green-600 cursor-not-allowed"
        : "bg-violet-600 hover:bg-violet-700"
    }`}
            >
              {enrolled ? "✓ Enrolled" : "Enroll Now"}
            </button>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-[#17171d] p-8">
            <h2 className="text-2xl font-bold">Instructor</h2>

            <div className="mt-6">
              <h3 className="text-xl font-semibold">
                {course.instructor.name}
              </h3>

              <p className="mt-2 text-gray-400">{course.instructor.title}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16">
        <h2 className="text-3xl font-bold mb-8">What You'll Learn</h2>

        <div className="grid gap-5 md:grid-cols-2">
          {course.outcomes.map((item, index) => (
            <div
              key={index}
              className="rounded-lg border border-gray-800 bg-[#17171d] p-5"
            >
              ✅ {item}
            </div>
          ))}
        </div>
      </section>

      {/* ------ Course modules------- */}
      <section className="pb-20">
        <h2 className="text-3xl font-bold mb-8">Course Modules</h2>

        <div className="space-y-4">
          {course.modules.map((module) => (
            <div
              key={module.id}
              className="rounded-xl border border-gray-800 overflow-hidden"
            >
              {/* Module Header */}
              <button
                onClick={() =>
                  setOpenModule(openModule === module.id ? null : module.id)
                }
                className="w-full flex items-center justify-between bg-[#17171d] px-6 py-5"
              >
                <h3 className="text-xl font-semibold">{module.title}</h3>

                <span className="text-2xl">
                  {openModule === module.id ? "−" : "+"}
                </span>
              </button>

              {/* Module Body */}

              {openModule === module.id && (
                <div className="bg-[#111116]">
                  {module.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="border-t border-gray-800 px-6 py-5"
                    >
                      <Link
                        to={`/courses/${course.slug}/lessons/${lesson.id}`}
                        className="font-medium text-violet-400 hover:text-violet-300 transition"
                      >
                        {lesson.title}
                      </Link>

                      <p className="mt-2 text-sm text-gray-400">
                        Duration : {lesson.minutes} Minutes
                      </p>
                    </div>
                  ))}

                  {/* Quiz Button */}

                  <div className="border-t border-gray-800 p-6">
                    <Link
                      to={`/courses/${course.slug}/quiz/${module.id}`}
                      className="inline-block rounded-lg bg-violet-600 px-6 py-3 font-medium hover:bg-violet-700 transition"
                    >
                      Start Quiz
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
};

export default CourseDetails;
