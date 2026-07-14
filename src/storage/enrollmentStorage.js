const STORAGE_KEY = "cybervast_enrollments";

// Enrollment 
export const getEnrollments = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

// Enrollment Save
export const saveEnrollment = (courseSlug) => {
  const enrollments = getEnrollments();

  if (!enrollments.includes(courseSlug)) {
    enrollments.push(courseSlug);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(enrollments)
    );
  }

  
};

// Enrolled check 
export const isEnrolled = (courseSlug) => {
  const enrollments = getEnrollments();

  return enrollments.includes(courseSlug);
};