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

  return (
    progress[courseSlug]?.completedLessons.includes(lessonId) || false
  );
};