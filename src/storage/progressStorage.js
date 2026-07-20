const STORAGE_KEY = "cybervast_progress";

//---Progress ----
export const getProgress = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
};

// Lesson complete save ---
export const saveCompletedLesson = (courseSlug, lessonId) => {
  const progress = getProgress();

  if (!progress[courseSlug]) {
    progress[courseSlug] = {
      completedLessons: [],
    };
  }

  if (!progress[courseSlug].completedLessons.includes(lessonId)) {
    progress[courseSlug].completedLessons.push(lessonId);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
};

// --------Lesson complete check--------
export const isLessonCompleted = (courseSlug, lessonId) => {
  const progress = getProgress();

  return progress[courseSlug]?.completedLessons.includes(lessonId) || false;
};

// ----------Quiz Score Save----------

export const saveQuizScore = (courseSlug, moduleId, score) => {
  const progress = getProgress();

  if (!progress[courseSlug]) {
    progress[courseSlug] = {
      completedLessons: [],
      quizScores: {},
    };
  }

  // ---------Quiz Scores  create ----------
  if (!progress[courseSlug].quizScores) {
    progress[courseSlug].quizScores = {};
  }

  progress[courseSlug].quizScores[moduleId] = score;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
};

//-------- Quiz Score Read --------

export const getQuizScore = (courseSlug, moduleId) => {
  const progress = getProgress();

  return progress[courseSlug]?.quizScores?.[moduleId] || 0;
};

// ------Total Completed Lessons-----

export const getCompletedLessonsCount = () => {
  const progress = getProgress();

  let total = 0;

  Object.values(progress).forEach((course) => {
    if (course.completedLessons) {
      total += course.completedLessons.length;
    }
  });

  return total;
};

//-------- Average Quiz Score ---------

export const getAverageQuizScore = () => {
  const progress = getProgress();

  let total = 0;

  let count = 0;

  Object.values(progress).forEach((course) => {
    if (course.quizScores) {
      Object.values(course.quizScores).forEach((score) => {
        total += score;

        count++;
      });
    }
  });

  if (count === 0) return 0;

  return Math.round(total / count);
};

// Overall Progress Percentage

export const getOverallProgress = () => {
  const progress = getProgress();

  let completedLessons = 0;

  Object.values(progress).forEach((course) => {
    if (course.completedLessons) {
      completedLessons += course.completedLessons.length;
    }
  });

  // lesson
  const totalLessons = 24;

  return Math.round((completedLessons / totalLessons) * 100);
};

//

export const hasCompletedCourse = (course) => {
  const progress = getProgress();

  const courseProgress = progress[course.slug];

  if (!courseProgress) return false;

  // All Lesson
  const totalLessons = course.modules.reduce(
    (total, module) => total + module.lessons.length,
    0,
  );

  const completedLessons = courseProgress.completedLessons?.length || 0;

  const allLessonsCompleted = completedLessons === totalLessons;

  // All Quiz Passed

  const allQuizPassed = course.modules.every((module) => {
    const score = courseProgress.quizScores?.[module.id] || 0;

    return score >= 80;
  });

  return allLessonsCompleted && allQuizPassed;
};

// Course Progress Percentage

export const getCourseProgress = (course) => {
  const progress = getProgress();

  const courseProgress = progress[course.slug];

  if (!courseProgress) return 0;

  // Total Lessons
  const totalLessons = course.modules.reduce(
    (total, module) => total + module.lessons.length,
    0,
  );

  // Completed Lessons
  const completedLessons = courseProgress.completedLessons?.length || 0;

  return Math.floor((completedLessons / totalLessons) * 100);
};

// Check Module Unlock

export const isModuleUnlocked = (course, moduleIndex) => {
  // First Module all time Unlock
  if (moduleIndex === 0) {
    return true;
  }

  const progress = getProgress();

  const previousModule = course.modules[moduleIndex - 1];

  const courseProgress = progress[course.slug];

  if (!courseProgress) return false;

  // Previous Module Lessons

  const previousLessonIds = previousModule.lessons.map((lesson) => lesson.id);

  const completedLessons = courseProgress.completedLessons || [];

  const lessonsCompleted = previousLessonIds.every((lessonId) =>
    completedLessons.includes(lessonId),
  );

  // Previous Quiz

  const quizScore = courseProgress.quizScores?.[previousModule.id] || 0;

  const quizPassed = quizScore >= 80;

  return lessonsCompleted && quizPassed;
};