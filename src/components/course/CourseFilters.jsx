import React from "react";
import { Search } from "lucide-react";

const CourseFilters = ({
  search,
  setSearch,
  category,
  setCategory,
  duration,
  setDuration,
}) => {
  return (
    <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        
      {/* Search Box */}
      <div className="relative w-full lg:w-96">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />

        <input
          type="text"
          placeholder="Search Course..."
          value={search}

          /*----State Update----*/
          onChange={(e) => setSearch(e.target.value)}

          className="w-full rounded-lg border border-gray-700 bg-[#141419] py-3 pl-10 pr-4 outline-none focus:border-violet-600"
        />
      </div>

     {/* -----Category-------- */}

      <select
        value={category}

        /* set Category Change */

        onChange={(e) => setCategory(e.target.value)}

        className="rounded-lg border border-gray-700 bg-[#141419] px-4 py-3"
      >
        <option value="All">All Category</option>

        <option value="Security">Security</option>

        <option value="Development">Development</option>

        <option value="Data">Data</option>

        <option value="AI">AI</option>

        <option value="Design">Design</option>

        <option value="Marketing">Marketing</option>

        <option value="Management">Management</option>

        <option value="Business">Business</option>
      </select>

      {/*set Duration */}
      <select
        value={duration}

        onChange={(e) => setDuration(e.target.value)}

        className="rounded-lg border border-gray-700 bg-[#141419] px-4 py-3"
      >
        <option value="All">All Duration</option>

        <option value="2">2 Months</option>

        <option value="3">3 Months</option>
      </select>
    </div>
  );
};

export default CourseFilters;
