import React from "react";

import Container from "../components/common/Container";

import WelcomeCard from "../components/dashboard/WelcomeCard";
import StatsCard from "../components/dashboard/StatsCard";

import { getEnrollments } from "../storage/enrollmentStorage";

import ContinueLearningCard from "../components/dashboard/ContinueLearningCard";

import coursesData from "../data/courses.json";

import EnrolledCourses from "../components/dashboard/EnrolledCourses";
import ProgressCard from "../components/dashboard/ProgressCard";

import CourseProgressCard from "../components/dashboard/CourseProgressCard";

import RecentQuizScores from "../components/dashboard/RecentQuizScores";

import {
  getCompletedLessonsCount,
  getAverageQuizScore,
  getOverallProgress,
  getCourseProgress,
  getActiveCourse,
} from "../storage/progressStorage";

import { getCurrentStreak } from "../storage/streakStorage";

const Dashboard = () => {
  const completedLessons = getCompletedLessonsCount();

  const enrolledCourses = getEnrollments();

  const averageQuiz = getAverageQuizScore();

  const overallProgress = getOverallProgress();

  const streak = getCurrentStreak();

  // Continue Learning
  // Get the course the learner is currently working on
  const activeCourseSlug = getActiveCourse();

  // First try to show the active course
  const activeCourse = coursesData.courses.find(
    (course) =>
      course.slug === activeCourseSlug && enrolledCourses.includes(course.slug),
  );

  // If no active course exists,
  // fallback to the first enrolled course.
  const continueCourse =
    activeCourse ||
    coursesData.courses.find((course) => enrolledCourses.includes(course.slug));

  // Enrolled Courses

  const enrolledCourseData = coursesData.courses.filter((course) =>
    enrolledCourses.includes(course.slug),
  );

  return (
    <Container>
      <section className="py-16">
        {/* Welcome card */}
        <WelcomeCard />

        {/* Stats */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          <StatsCard title="Enrolled Courses" value={enrolledCourses.length} />

          <StatsCard title="Completed Lessons" value={completedLessons} />

          <StatsCard title="Quiz Average" value={`${averageQuiz}%`} />

          <StatsCard
            title="Learning Streak"
            value={`${streak} Day${streak !== 1 ? "s" : ""}`}
          />
        </div>

        {/* Continue Learning */}
        <div className="mt-10">
          <ContinueLearningCard course={continueCourse} />
        </div>

        {/* Enrolled Courses */}
        <div className="mt-10">
          <EnrolledCourses courses={enrolledCourseData} />
        </div>

        {/* Overall Progress */}
        <ProgressCard progress={overallProgress} />

        {/* Course Progress */}
        <div className="mt-10">
          <h2 className="mb-6 text-3xl font-bold">Course Progress</h2>

          <div className="grid gap-6 md:grid-cols-2">
            {enrolledCourseData.map((course) => (
              <CourseProgressCard
                key={course.slug}
                course={course}
                progress={getCourseProgress(course)}
              />
            ))}
          </div>
        </div>

        {/* Recent Quiz Scores */}
        <div className="mt-10">
          <RecentQuizScores />
        </div>
      </section>
    </Container>
  );
};

export default Dashboard;
