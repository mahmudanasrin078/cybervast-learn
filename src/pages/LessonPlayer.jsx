import React from "react";

import { Link, useParams } from "react-router-dom";

import Container from "../components/common/Container";

import coursesData from "../data/courses.json";

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

  // =====================================
  // সব Lesson এক Array-তে
  // =====================================

  const allLessons = course.modules.flatMap((module) => module.lessons);

  const currentIndex = allLessons.findIndex((lesson) => lesson.id === lessonId);

  const previousLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;

  const nextLesson =
    currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  return (
    <Container>
      <section className="py-16 max-w-4xl mx-auto">
        <p className="text-violet-500">{course.title}</p>

        <h1 className="mt-4 text-5xl font-bold">{currentLesson.title}</h1>

        <p className="mt-5 text-gray-400">
          Duration : {currentLesson.minutes} Minutes
        </p>

        <article className="mt-10 rounded-xl bg-[#17171d] p-8 leading-8">
          {currentLesson.body}
        </article>

        {/* ------------Resources------- */}

        <div className="mt-10 rounded-xl border border-gray-800 bg-[#17171d] p-6">
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

        {nextLesson && (
          <Link
            to={`/courses/${slug}/lessons/${nextLesson.id}`}
            className="rounded-lg bg-violet-600 px-6 py-3 hover:bg-violet-700 transition"
          >
            Next →
          </Link>
        )}
      </div>
      </section>

     
    </Container>
  );
};

export default LessonPlayer;
