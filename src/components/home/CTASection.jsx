import React from "react";
import { Link } from "react-router-dom";
import Container from "../common/Container";

const CTASection = () => {
  return (
    <section className="py-20">
      <Container>
        <div className="rounded-3xl bg-violet-600 p-10 text-center">
          <h2 className="text-4xl font-bold">Ready To Start Learning?</h2>

          <p className="mt-5">
            Join CyberVast Learn today and build your future.
          </p>

          <Link
            to="/courses"
            className="mt-8 inline-block rounded-lg bg-white px-8 py-3 font-semibold text-violet-700 hover:bg-gray-200 transition"
          >
            Explore Courses
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default CTASection;
