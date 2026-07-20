import React from "react";
import { Link } from "react-router-dom";

import { isLessonCompleted } from "../../storage/progressStorage";
import { isModuleUnlocked } from "../../storage/progressStorage";

const LessonSidebar = ({ course, currentLessonId }) => {
  return (
    <aside className="rounded-2xl border border-gray-800 bg-[#17171d] p-6">
      <h2 className="mb-6 text-2xl font-bold">Course Content</h2>

      {/* Modules */}

      <div className="space-y-6">
        {course.modules.map((module, moduleIndex) => {
          const unlocked = isModuleUnlocked(course, moduleIndex);

          return (
            <div key={module.id}>
              {/* Module Title */}

              <h3
                className={`mb-3 font-semibold ${
                  unlocked ? "text-white" : "text-gray-500"
                }`}
              >
                {unlocked ? "📘" : "🔒"} {module.title}
              </h3>

              {/* Lessons */}

              <div className="space-y-2">
                {module.lessons.map((lesson) => {
                  const completed = isLessonCompleted(course.slug, lesson.id);

                  const active = lesson.id === currentLessonId;

                  if (!unlocked) {
                    return (
                      <div
                        key={lesson.id}
                        aria-disabled="true"
                        title="Complete previous module and pass its quiz first."
                        className="cursor-not-allowed rounded-lg bg-[#22222b] px-4 py-3 text-gray-500"
                      >
                        🔒 {lesson.title}
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={lesson.id}
                      to={`/courses/${course.slug}/lessons/${lesson.id}`}
                      className={`block rounded-lg px-4 py-3 transition

                      ${
                        active
                          ? "bg-violet-600 text-white"
                          : "bg-[#22222b] hover:bg-violet-700"
                      }`}
                    >
                      {completed ? "✅" : "📖"} {lesson.title}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export default LessonSidebar;
