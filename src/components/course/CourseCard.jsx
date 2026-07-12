import React from "react";
import { Clock } from "lucide-react";
import { Link } from "react-router-dom";

import Badge from "../common/Badge";
import Button from "../common/Button";

const CourseCard = ({ course }) => {
  return (
    <div className="bg-[#141419] rounded-xl p-6 border border-gray-800 hover:border-violet-600 transition">
      <Badge>{course.category}</Badge>

      <h3 className="text-2xl font-bold text-white mt-5">{course.title}</h3>

      <p className="text-gray-400 mt-3">{course.blurb}</p>

      <div className="flex items-center gap-2 mt-5 text-gray-300">
        <Clock size={18} />
        {course.durationMonths} Months
      </div>

      <Link to={`/courses/${course.slug}`}>
        <Button className="mt-6 w-full">View Details</Button>
      </Link>
    </div>
  );
};

export default CourseCard;
