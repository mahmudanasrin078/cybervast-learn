import React from "react";

import Container from "../components/common/Container";

import WelcomeCard from "../components/dashboard/WelcomeCard";
import StatsCard from "../components/dashboard/StatsCard";

import { getEnrollments } from "../storage/enrollmentStorage";

import ContinueLearningCard from "../components/dashboard/ContinueLearningCard";

import coursesData from "../data/courses.json";

import EnrolledCourses from "../components/dashboard/EnrolledCourses";
import ProgressCard from "../components/dashboard/ProgressCard";
import RecentQuizScores from "../components/dashboard/RecentQuizScores";
import {
  getCompletedLessonsCount,
  getAverageQuizScore,
  getOverallProgress,
} from "../storage/progressStorage";

const Dashboard = () => {
  const completedLessons = getCompletedLessonsCount();

  const enrolledCourses = getEnrollments();

  const averageQuiz = getAverageQuizScore();

  const overallProgress = getOverallProgress();

  //  Enrolled continue course
  const continueCourse = coursesData.courses.find((course) =>
    enrolledCourses.includes(course.slug),
  );

  //
  const enrolledCourseData = coursesData.courses.filter((course) =>
    enrolledCourses.includes(course.slug),
  );

  return (
    <Container>
      <section className="py-16">
        {/* Welcome card */}
        <WelcomeCard />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Stats card */}
          <StatsCard title="Enrolled Courses" value={enrolledCourses.length} />

          <StatsCard title="Completed Lessons" value={completedLessons} />

          <StatsCard title="Quiz Average" value={`${averageQuiz}%`} />
        </div>

        {/* Continue learning card */}

        <div className="mt-10">
          <ContinueLearningCard course={continueCourse} />
        </div>

        {/* Enrolled courses */}

        <div className="mt-10">
          <EnrolledCourses courses={enrolledCourseData} />
        </div>

        {/* Progress card */}

        <ProgressCard progress={overallProgress} />

        {/* Recent quiz scores */}

        <div className="mt-10">
          <RecentQuizScores />
        </div>
      </section>
    </Container>
  );
};

export default Dashboard;
