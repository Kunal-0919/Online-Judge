import React from "react";

const StatsCard = ({ problemsCount, submissionCount }) => {
  return (
    <div className="bg-secblack text-lctxt p-6 rounded-lg shadow-md max-w-xs m-5">
      <h2 className="text-xl font-bold mb-4">Statistics</h2>
      <p className="mb-2">
        <strong>Problems Count:</strong> {problemsCount || 0}
      </p>
      <p className="mb-2">
        <strong>Submission Count:</strong> {submissionCount || 0}
      </p>
    </div>
  );
};

export default StatsCard;
