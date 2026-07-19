import React from "react";
import Skeleton from "react-loading-skeleton";

const SkeletonLoader = ({ count = 6 }) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="rounded-2xl border border-gray-800 bg-[#17171d] p-6"
        >
          <Skeleton height={20} width={90} />

          <Skeleton height={35} className="mt-5" />

          <Skeleton count={3} className="mt-4" />

          <Skeleton height={42} width={140} className="mt-8" />
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
