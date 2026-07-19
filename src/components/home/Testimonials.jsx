import React from "react";
import Container from "../common/Container";

const Testimonials = () => {
  return (
    <section className="py-20">
      <Container>

        <div className="text-center">
          <h2 className="text-4xl font-bold">
            What Our Students Say
          </h2>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">

          <div className="rounded-xl bg-[#17171d] p-8">
            <p>"Excellent learning experience."</p>
            <h4 className="mt-6 font-bold">Ahmed</h4>
          </div>

          <div className="rounded-xl bg-[#17171d] p-8">
            <p>"Loved the practical projects."</p>
            <h4 className="mt-6 font-bold">Sarah</h4>
          </div>

          <div className="rounded-xl bg-[#17171d] p-8">
            <p>"Highly recommended platform."</p>
            <h4 className="mt-6 font-bold">John</h4>
          </div>

        </div>

      </Container>
    </section>
  );
};

export default Testimonials;