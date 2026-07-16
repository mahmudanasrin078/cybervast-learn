import { useMemo, useState } from "react";

import coursesData from "../data/courses.json";

import Container from "../components/common/Container";

import SectionTitle from "../components/common/SectionTitle";

import CourseCard from "../components/course/CourseCard";

import CourseFilters from "../components/course/CourseFilters";

const Courses = () => {
  const { courses } = coursesData;

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");

  const [duration, setDuration] = useState("All");

  // ---------
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      //---search match---

      const searchMatch =
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.blurb.toLowerCase().includes(search.toLowerCase());

      //----Category match-----

      const categoryMatch = category === "All" || course.category === category;

      //  --- duration match-----
      const durationMatch =
        duration === "All" || course.durationMonths === Number(duration);

      return searchMatch && categoryMatch && durationMatch;
    });
  }, [courses, search, category, duration]);

  return (
    <Container>
      <div className="py-16">
        <SectionTitle
          title="Explore Courses"
          subtitle="Choose your learning path with CyberVast Learn."
        />

        {/* filter course, category,and duration */}
        <CourseFilters
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          duration={duration}
          setDuration={setDuration}
        />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* if course founded */}
          {filteredCourses.length === 0 ? (
            <div className="col-span-full py-20 text-center">
              <h2 className="text-3xl font-bold text-white">No Course Found</h2>

              <p className="mt-3 text-gray-400">Try another keyword.</p>
            </div>
          ) : (
            //   Course Filter
            filteredCourses.map((course) => (
              <CourseCard key={course.slug} course={course} />
            ))
          )}
        </div>
      </div>
    </Container>
  );
};

export default Courses;
