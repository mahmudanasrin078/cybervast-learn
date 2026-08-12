import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import toast from "react-hot-toast";

import { useApp } from "../context/AppContext";

import { isEnrolled, saveEnrollment } from "../storage/enrollmentStorage";

import coursesData from "../data/courses.json";

import Container from "../components/common/Container";
import SkeletonLoader from "../components/common/SkeletonLoader";

const CourseDetails = () => {
  const navigate = useNavigate();

  const { dispatch } = useApp();

  const { slug } = useParams();

  // Loading state
  const [loading, setLoading] = useState(true);

  const [enrolled, setEnrolled] = useState(false);

  const [openModule, setOpenModule] = useState(null);

  //  ------------Found the Courses ------------
  const course = coursesData.courses.find((item) => item.slug === slug);

  // ---------Loading effect-----------
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 400);

    // Component unmount then timer clear
    return () => clearTimeout(timer);
  }, []);

  //  ----------Enrollment check--------
  useEffect(() => {
    if (course) {
      setEnrolled(isEnrolled(course.slug));
    }
  }, [slug, course]);

  //   -------------- Enroll function---------------
  const handleEnroll = () => {
    // Already enrolled then show toast
    if (enrolled) {
      toast("Already Enrolled");
      return;
    }

    // LocalStorage enrollment save
    saveEnrollment(course.slug);

    // UI state update
    setEnrolled(true);

    // Global AppContext update
    dispatch({
      type: "ENROLL_COURSE",
      payload: course.slug,
    });

    // Success message
    toast.success("Successfully Enrolled!");
  };

  // -------------Continue Learning---------
  const handleContinueLearning = () => {
    // Course module
    const firstModule = course.modules[0];

    // -------------module lesson----------
    const firstLesson = firstModule.lessons[0];

    //-------first lesson navigate --------
    navigate(`/courses/${course.slug}/lessons/${firstLesson.id}`);
  };

  // -----------Course not found --------------
  if (!course) {
    return (
      <Container>
        <div className="py-24 text-center">
          <h1 className="text-4xl font-bold">Course Not Found</h1>
        </div>
      </Container>
    );
  }

  // ---------Loading  Skeleton ------------
  if (loading) {
    return (
      <Container>
        <section className="py-20">
          <SkeletonLoader count={1} />
        </section>
      </Container>
    );
  }

  // ------------Main UI----------
  return (
    <Container>
      {/* ------------Hero Section------------- */}

      <section className="py-16">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* -------------Left Content------------ */}

          <div>
            {/*------------ Category------------ */}

            <span className="inline-block rounded-full bg-violet-600/20 px-4 py-1 text-sm text-violet-400">
              {course.category}
            </span>

            {/*------- Course Title------------ */}

            <h1 className="mt-5 text-4xl font-bold lg:text-5xl">
              {course.title}
            </h1>

            {/* ----------Course Description-------- */}

            <p className="mt-5 leading-8 text-gray-400">{course.blurb}</p>

            {/*---------------- Course Information----------- */}

            <div className="mt-8 flex flex-wrap gap-4">
              {/* Duration */}

              <div className="rounded-lg bg-[#17171d] px-5 py-3">
                <p className="text-sm text-gray-400">Duration</p>

                <h3 className="font-semibold">
                  {course.durationMonths} Months
                </h3>
              </div>

              {/* Instructor */}

              <div className="rounded-lg bg-[#17171d] px-5 py-3">
                <p className="text-sm text-gray-400">Instructor</p>

                <h3 className="font-semibold">{course.instructor.name}</h3>
              </div>
            </div>

            {/* --------------Enroll and Continue Button------------- */}

            {!enrolled ? (
              <button
                onClick={handleEnroll}
                className="mt-8 rounded-lg bg-violet-600 px-8 py-3 font-semibold transition hover:bg-violet-700"
              >
                Enroll Now
              </button>
            ) : (
              <button
                onClick={handleContinueLearning}
                className="mt-8 rounded-lg bg-green-600 px-8 py-3 font-semibold transition hover:bg-green-700"
              >
                Continue Learning
              </button>
            )}
          </div>

          {/* ----------Instructor Card---------- */}

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

      {/* --------What You'll Learn---------- */}

      <section className="pb-16">
        <h2 className="mb-8 text-3xl font-bold">What You'll Learn</h2>

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

      {/* --------------Course Modules------------ */}

      <section className="pb-20">
        <h2 className="mb-8 text-3xl font-bold">Course Modules</h2>

        {/* --------------User not Enrolled-------------- */}

        {!enrolled ? (
          <div className="rounded-2xl border border-dashed border-gray-700 bg-[#17171d] p-10 text-center">
            <div className="text-6xl">🔒</div>

            <h3 className="mt-6 text-2xl font-bold">
              Enroll to Unlock Course Content
            </h3>

            <p className="mt-4 text-gray-400">
              Please enroll in this course to access lessons and quizzes.
            </p>

            <button
              onClick={handleEnroll}
              className="mt-8 rounded-lg bg-violet-600 px-8 py-3 font-semibold transition hover:bg-violet-700"
            >
              Enroll Now
            </button>
          </div>
        ) : (
          //------------ User Enrolled--------------

          <div className="space-y-4">
            {course.modules.map((module) => (
              <div
                key={module.id}
                className="overflow-hidden rounded-xl border border-gray-800"
              >
                {/*-------------- Module Header -------------*/}

                <button
                  onClick={() =>
                    setOpenModule(openModule === module.id ? null : module.id)
                  }
                  className="flex w-full items-center justify-between bg-[#17171d] px-6 py-5"
                >
                  <h3 className="text-xl font-semibold">{module.title}</h3>

                  <span className="text-2xl">
                    {openModule === module.id ? "−" : "+"}
                  </span>
                </button>

                {/* -----------Lesson----------- */}

                {openModule === module.id && (
                  <div className="bg-[#111116]">
                    {module.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className="border-t border-gray-800 px-6 py-5"
                      >
                        <Link
                          to={`/courses/${course.slug}/lessons/${lesson.id}`}
                          className="font-medium text-violet-400 hover:text-violet-300"
                        >
                          {lesson.title}
                        </Link>

                        <p className="mt-2 text-sm text-gray-400">
                          Duration: {lesson.minutes} Minutes
                        </p>
                      </div>
                    ))}

                    {/*--------- Quiz ------------- */}

                    {/* <div className="border-t border-gray-800 p-6">
                      <Link
                        to={`/courses/${course.slug}/quiz/${module.id}`}
                        className="inline-block rounded-lg bg-violet-600 px-6 py-3 transition hover:bg-violet-700"
                      >
                        Start Quiz
                      </Link>
                    </div> */}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </Container>
  );
};

export default CourseDetails;
