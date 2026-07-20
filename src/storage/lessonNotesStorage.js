const STORAGE_KEY = "cybervast_lesson_notes";

// Read Notes
export const getLessonNote = (courseSlug, lessonId) => {
  const notes = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

  return notes[`${courseSlug}-${lessonId}`] || "";
};

// Save Notes
export const saveLessonNote = (courseSlug, lessonId, note) => {
  const notes = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

  notes[`${courseSlug}-${lessonId}`] = note;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
};
