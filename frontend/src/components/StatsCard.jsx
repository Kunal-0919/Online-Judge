import React from "react";

const Statscard = ({ problemsCount, submissionCount, problemStats }) => {
  // Calculate the total number of problems
  const totalProblems =
    problemStats.hardCount + problemStats.mediumCount + problemStats.easyCount;

  // Calculate the percentage of problems solved
  const percentageSolved = totalProblems
    ? (problemsCount / totalProblems) * 100
    : 0;

  // Calculate stroke-dasharray for the SVG ring
  const radius = 55; // Radius of the ring
  const strokeWidth = 8; // Width of the ring
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (percentageSolved / 100) * circumference;

  return (
    <div className="bg-secblack text-lctxt p-10 rounded-lg shadow-lg max-w-xs mx-auto m-5">
      <h2 className="text-xl font-bold mb-4 text-center">Statistics</h2>
      <p className="mb-8 text-center">
        <strong className="text-lg">Submission Count:</strong>{" "}
        {submissionCount || 0}
      </p>
      <div className="relative flex items-center justify-center">
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          className="absolute"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="#2D2D2D" // Darker background circle color
            strokeWidth={strokeWidth}
            fill="none"
          />
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="#4caf50" // Green color for the filled part
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            fill="none"
            style={{ transition: "stroke-dashoffset 0.5s ease" }}
          />
        </svg>
        <div className="relative z-10 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-5xl font-bold text-white">{problemsCount}</h2>
            <span className="text-xl text-white">/ {totalProblems}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statscard;
