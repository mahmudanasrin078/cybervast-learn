import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";

import Container from "../components/common/Container";
import LessonSidebar from "../components/Lesson/LessonSidebar";

import coursesData from "../data/courses.json";

import toast from "react-hot-toast";

import {
  saveCompletedLesson,
  isLessonCompleted,
  isModuleUnlocked,
  setActiveCourse,
} from "../storage/progressStorage";

import { getLessonNote, saveLessonNote } from "../storage/lessonNotesStorage";

import { updateStreak } from "../storage/streakStorage";

import { isEnrolled } from "../storage/enrollmentStorage";

const LessonPlayer = () => {
  const { slug, lessonId } = useParams();

  // Find Current Course

  const course = coursesData.courses.find((item) => item.slug === slug);

  // Set Current Course as Active Course

  useEffect(() => {
    if (course) {
      setActiveCourse(course.slug);
    }
  }, [course]);

  // Find Current Lesson

  const currentLesson = course
    ? course.modules
        .flatMap((module) => module.lessons)
        .find((lesson) => lesson.id === lessonId)
    : null;

  // Find Current Module Index

  const currentModuleIndex = course
    ? course.modules.findIndex((module) =>
        module.lessons.some((lesson) => lesson.id === lessonId),
      )
    : -1;

  // Enrollment Check

  const enrolled = course ? isEnrolled(course.slug) : false;

  // Module Unlock Check

  const unlocked =
    course && currentModuleIndex !== -1
      ? isModuleUnlocked(course, currentModuleIndex)
      : false;

  // State

  const [completed, setCompleted] = useState(false);

  const [activeTab, setActiveTab] = useState("overview");

  const [note, setNote] = useState("");

  const [saved, setSaved] = useState(true);

  // Load Lesson Completion Status

  useEffect(() => {
    if (course && currentLesson) {
      setCompleted(isLessonCompleted(course.slug, currentLesson.id));
    }
  }, [course, currentLesson]);

  // Load Lesson Note

  useEffect(() => {
    if (course && currentLesson) {
      setNote(getLessonNote(course.slug, currentLesson.id));
    }
  }, [course, currentLesson]);

  // Autosave Notes

  useEffect(() => {
    if (!course || !currentLesson) return;

    setSaved(false);

    const timer = setTimeout(() => {
      saveLessonNote(course.slug, currentLesson.id, note);

      setSaved(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [note, course, currentLesson]);

  // Handle Lesson Completion

  const handleCompleteLesson = () => {
    if (!course || !currentLesson) return;

    if (completed) {
      toast("Lesson already completed");
      return;
    }

    saveCompletedLesson(course.slug, currentLesson.id);

    updateStreak();

    setCompleted(true);

    toast.success("Lesson Completed!");
  };

  // Course Not Found

  if (!course) {
    return (
      <Container>
        <h1 className="py-20 text-center text-3xl">Course Not Found</h1>
      </Container>
    );
  }

  // Lesson Not Found

  if (!currentLesson) {
    return (
      <Container>
        <h1 className="py-20 text-center text-3xl">Lesson Not Found</h1>
      </Container>
    );
  }

  // Enrollment Route guard

  if (!enrolled) {
    return <Navigate to={`/courses/${course.slug}`} replace />;
  }

  // Module Route guard

  if (!unlocked) {
    return <Navigate to={`/courses/${course.slug}`} replace />;
  }

  // All Lessons

  const allLessons = course.modules.flatMap((module) => module.lessons);

  // Current Lesson Index

  const currentIndex = allLessons.findIndex((lesson) => lesson.id === lessonId);

  // Previous Lesson

  const previousLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;

  // Next Lesson

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

  // ui

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
                        className="block rounded-lg bg-[#22222b] px-5 py-4 transition hover:bg-violet-700"
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

            {/* Complete Lesson Button */}

            <div className="mt-10">
              <button
                onClick={handleCompleteLesson}
                disabled={completed}
                className={`rounded-lg px-6 py-3 font-semibold transition ${
                  completed
                    ? "cursor-not-allowed bg-green-600"
                    : "bg-violet-600 hover:bg-violet-700"
                }`}
              >
                {completed ? "✓ Completed" : "Mark as Complete"}
              </button>
            </div>

            {/* Navigation */}

            <div className="mt-10 flex justify-between">
              {/* Previous */}

              {previousLesson ? (
                <Link
                  to={`/courses/${slug}/lessons/${previousLesson.id}`}
                  className="rounded-lg bg-gray-700 px-6 py-3 transition hover:bg-gray-600"
                >
                  ← Previous
                </Link>
              ) : (
                <div />
              )}

              {/* Next */}

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
                    className="rounded-lg bg-violet-600 px-6 py-3 transition hover:bg-violet-700"
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
