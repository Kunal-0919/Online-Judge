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
        className="bg-white font-sans text-black px-7 py-1 transition duration-200 hover:shadow-2xl hover:rounded-full rounded-lg border-black border-2"
      >
        Reset
      </button>
      <button
        onClick={onSubmit}
        className="bg-yellow-500 font-sans ml-6 text-black px-7 py-1 transition duration-200 hover:shadow-2xl hover:rounded-full rounded-lg border-black border-2"
      >
        Submit
      </button>
    </div>
  );
}

export default BottomNavAddProblem;
