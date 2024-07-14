import React from "react";

function BottomNavAddProblem({ onReset, onSubmit }) {
  return (
    <div
      className={
        "fixed bottom-0 left-0 right-0 bg-primary border-t border-gray-300 p-3 flex justify-end"
      }
    >
      <button
        onClick={onReset}
        className="bg-danger font-sans text-black px-12 py-3 transition duration-200  hover:rounded-full rounded-lg shadow-sm hover:shadow-lg"
      >
        Reset
      </button>
      <button
        onClick={onSubmit}
        className="bg-yellow-500 font-sans ml-6 text-black px-12 py-3 transition duration-200  hover:rounded-full rounded-lg shadow-sm hover:shadow-lg"
      >
        Submit
      </button>
    </div>
  );
}

export default BottomNavAddProblem;
