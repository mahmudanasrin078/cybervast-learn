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
