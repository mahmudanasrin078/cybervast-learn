import React from "react";
import Container from "../common/Container";

const Statistics = () => {
  return (
    <section className="py-20 bg-[#111118]">
      <Container>
        <div className="grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">

          <div>
            <h2 className="text-5xl font-bold text-violet-500">8+</h2>
            <p className="mt-3 text-gray-400">Courses</p>
          </div>

          <div>
            <h2 className="text-5xl font-bold text-violet-500">100+</h2>
            <p className="mt-3 text-gray-400">Students</p>
          </div>

          <div>
            <h2 className="text-5xl font-bold text-violet-500">15+</h2>
            <p className="mt-3 text-gray-400">Mentors</p>
          </div>

          <div>
            <h2 className="text-5xl font-bold text-violet-500">95%</h2>
            <p className="mt-3 text-gray-400">Completion Rate</p>
          </div>

        </div>
      </Container>
    </section>
  );
};

export default Statistics;