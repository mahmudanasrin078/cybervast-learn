import React, { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";

import Container from "../components/common/Container";

import LessonSidebar from "../components/Lesson/LessonSidebar";

import coursesData from "../data/courses.json";

import toast from "react-hot-toast";

import {
  saveCompletedLesson,
  isLessonCompleted,
  isModuleUnlocked,
} from "../storage/progressStorage";

import { Navigate } from "react-router-dom";

import { getLessonNote, saveLessonNote } from "../storage/lessonNotesStorage";

import { updateStreak } from "../storage/streakStorage";

const LessonPlayer = () => {
  const { slug, lessonId } = useParams();

  // ----- founded course ------
  const course = coursesData.courses.find((item) => item.slug === slug);

  if (!course) {
    return (
      <Container>
        <h1 className="py-20 text-center text-3xl">Course Not Found</h1>
      </Container>
    );
  }

  // -------module theke current lesson ------

  let currentLesson = null;

  course.modules.forEach((module) => {
    const lesson = module.lessons.find((item) => item.id === lessonId);

    if (lesson) {
      currentLesson = lesson;
    }
  });

  if (!currentLesson) {
    return (
      <Container>
        <h1 className="py-20 text-center text-3xl">Lesson Not Found</h1>
      </Container>
    );
  }

  // Current Module Index

  const currentModuleIndex = course.modules.findIndex((module) =>
    module.lessons.some((lesson) => lesson.id === currentLesson.id),
  );

  // Route Guard

  const unlocked = isModuleUnlocked(course, currentModuleIndex);

  if (!unlocked) {
    toast.error(
      "Complete the previous module and pass its quiz to unlock this lesson.",
    );

    return <Navigate to={`/courses/${course.slug}`} replace />;
  }
  // ---Lesson complete----

  const [completed, setCompleted] = useState(
    isLessonCompleted(course.slug, currentLesson.id),
  );

  // Active Tab

  const [activeTab, setActiveTab] = useState("overview");

  // Notes

  const [note, setNote] = useState(getLessonNote(course.slug, lessonId));

  // Save Status

  const [saved, setSaved] = useState(true);

  useEffect(() => {
    setCompleted(isLessonCompleted(course.slug, currentLesson.id));
  }, [course.slug, currentLesson.id]);

  // Load Note when Lesson Changes

  useEffect(() => {
    setNote(getLessonNote(course.slug, lessonId));
  }, [course.slug, lessonId]);

  // Autosave Notes

  useEffect(() => {
    setSaved(false);

    const timer = setTimeout(() => {
      saveLessonNote(course.slug, lessonId, note);

      setSaved(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [note, course.slug, lessonId]);

  // -----Lesson Complete Function----

  const handleCompleteLesson = () => {
    if (completed) {
      toast("Lesson already completed");
      return;
    }
    saveCompletedLesson(course.slug, currentLesson.id);

    updateStreak();

    setCompleted(true);
    
    toast.success("Lesson Completed!");
  };

  const allLessons = course.modules.flatMap((module) => module.lessons);

  const currentIndex = allLessons.findIndex((lesson) => lesson.id === lessonId);

  const previousLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;

  const nextLesson =
    currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  // Check Next Module Lock

  let nextLessonLocked = false;

  if (nextLesson) {
    const nextModuleIndex = course.modules.findIndex((module) =>
      module.lessons.some((lesson) => lesson.id === nextLesson.id),
    );

    nextLessonLocked = !isModuleUnlocked(course, nextModuleIndex);
  }

  return (
    <Container>
      <section className="py-16">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Sidebar */}

          <div className="lg:col-span-4">
            <LessonSidebar course={course} currentLessonId={currentLesson.id} />
          </div>

          {/* Lesson Content */}

          <div className="lg:col-span-8">
            {/* Course Name */}
            <p className="text-violet-500">{course.title}</p>

            {/* Lesson Title */}
            <h1 className="mt-4 text-5xl font-bold">{currentLesson.title}</h1>

            {/* Duration */}
            <p className="mt-5 text-gray-400">
              Duration : {currentLesson.minutes} Minutes
            </p>

            {/* Lesson Body */}
            {/* <article className="mt-10 rounded-xl bg-[#17171d] p-8 leading-8">
              {currentLesson.body}
            </article>

            {/* ------------Resources------- */}

            {/* <div className="mt-10 rounded-xl border border-gray-800 bg-[#17171d] p-6">
              <h2 className="text-2xl font-bold mb-5">Resources</h2>

              <div className="space-y-3">
                {currentLesson.resources.map((resource, index) => (
                  <a
                    key={index}
                    href={resource.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-lg bg-[#22222b] px-5 py-4 hover:bg-violet-700 transition"
                  >
                    {resource.label}
                  </a>
                ))}
              </div>
            </div>  */}

            {/* Tabs */}

            <div className="mt-10">
              {/* Tab Buttons */}

              <div className="flex flex-wrap gap-3 border-b border-gray-800 pb-4">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`rounded-lg px-5 py-2 transition ${
                    activeTab === "overview" ? "bg-violet-600" : "bg-[#22222b]"
                  }`}
                >
                  Overview
                </button>

                <button
                  onClick={() => setActiveTab("resources")}
                  className={`rounded-lg px-5 py-2 transition ${
                    activeTab === "resources" ? "bg-violet-600" : "bg-[#22222b]"
                  }`}
                >
                  Resources
                </button>

                <button
                  onClick={() => setActiveTab("notes")}
                  className={`rounded-lg px-5 py-2 transition ${
                    activeTab === "notes" ? "bg-violet-600" : "bg-[#22222b]"
                  }`}
                >
                  Notes
                </button>
              </div>

              {/* Overview */}

              {activeTab === "overview" && (
                <article className="mt-8 rounded-xl bg-[#17171d] p-8 leading-8">
                  {currentLesson.body}
                </article>
              )}

              {/* Resources */}

              {activeTab === "resources" && (
                <div className="mt-8 rounded-xl border border-gray-800 bg-[#17171d] p-6">
                  <div className="space-y-3">
                    {currentLesson.resources.map((resource, index) => (
                      <a
                        key={index}
                        href={resource.url}
                        target="_blank"
                        rel="noreferrer"
                        className="block rounded-lg bg-[#22222b] px-5 py-4 hover:bg-violet-700 transition"
                      >
                        {resource.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}

              {activeTab === "notes" && (
                <div className="mt-8 rounded-xl border border-gray-800 bg-[#17171d] p-6">
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={10}
                    placeholder="Write your lesson notes..."
                    className="w-full rounded-lg border border-gray-700 bg-[#22222b] p-4 outline-none focus:border-violet-500"
                  />

                  <p className="mt-4 text-sm text-gray-400">
                    {saved ? "✅ Saved" : "Saving..."}
                  </p>
                </div>
              )}
            </div>

            {/*  Complete Lesson Button */}

            <div className="mt-10">
              <button
                onClick={handleCompleteLesson}
                disabled={completed}
                className={`rounded-lg px-6 py-3 font-semibold transition ${
                  completed
                    ? "bg-green-600 cursor-not-allowed"
                    : "bg-violet-600 hover:bg-violet-700"
                }`}
              >
                {completed ? "✓ Completed" : "Mark as Complete"}
              </button>
            </div>
            {/* --------Navigation--------*/}

            <div className="mt-10 flex justify-between">
              {previousLesson ? (
                <Link
                  to={`/courses/${slug}/lessons/${previousLesson.id}`}
                  className="rounded-lg bg-gray-700 px-6 py-3 hover:bg-gray-600 transition"
                >
                  ← Previous
                </Link>
              ) : (
                <div></div>
              )}

              {nextLesson ? (
                nextLessonLocked ? (
                  <button
                    disabled
                    title="Complete previous module and pass its quiz first."
                    className="cursor-not-allowed rounded-lg bg-gray-700 px-6 py-3 opacity-50"
                  >
                    🔒 Next
                  </button>
                ) : (
                  <Link
                    to={`/courses/${slug}/lessons/${nextLesson.id}`}
                    className="rounded-lg bg-violet-600 px-6 py-3 hover:bg-violet-700 transition"
                  >
                    Next →
                  </Link>
                )
              ) : (
                <button
                  disabled
                  className="cursor-not-allowed rounded-lg bg-gray-700 px-6 py-3 opacity-50"
                >
                  End of Course
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default LessonPlayer;
