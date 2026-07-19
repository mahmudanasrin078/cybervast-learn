import React from "react";
import Container from "../common/Container";
import { ShieldCheck, Laptop, Users, Award } from "lucide-react";

const features = [
  {
    icon: <Laptop size={40} className="text-violet-500" />,
    title: "Hands-on Learning",
    description:
      "Practice with real-world projects and industry-focused assignments.",
  },
  {
    icon: <ShieldCheck size={40} className="text-violet-500" />,
    title: "Industry Standard",
    description:
      "Follow modern technologies and best development practices.",
  },
  {
    icon: <Users size={40} className="text-violet-500" />,
    title: "Expert Mentors",
    description:
      "Learn from experienced software engineers and instructors.",
  },
  {
    icon: <Award size={40} className="text-violet-500" />,
    title: "Certificate",
    description:
      "Earn a certificate after successfully completing the course.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-[#111118]">
      <Container>
        <div className="text-center">
          <h2 className="text-4xl font-bold">Why Choose CyberVast Learn?</h2>

          <p className="mt-4 text-gray-400">
            Learn practical skills that prepare you for the real world.
          </p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((item, index) => (
            <div
              key={index}
              className="rounded-xl bg-[#17171d] p-8 text-center border border-gray-800 hover:border-violet-500 transition"
            >
              <div className="flex justify-center">{item.icon}</div>

              <h3 className="mt-6 text-xl font-bold">{item.title}</h3>

              <p className="mt-4 text-gray-400">{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default WhyChooseUs;