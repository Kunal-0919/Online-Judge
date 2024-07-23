import React from "react";

function BottomNavAddProblem({ onReset, onSubmit }) {
  return (
    <div
      className={
        "fixed bottom-0 left-0 right-0 bg-priblack border-t border-zinc-700 p-3 flex justify-end"
      }
    >
      <button
        onClick={onReset}
        className="bg-danger font-sans border-2 border-white text-white px-12 py-3 transition duration-200  hover:rounded-full rounded-lg shadow-sm hover:shadow-2xl hover:shadow-black"
      >
        Reset
      </button>
      <button
        onClick={onSubmit}
        className="bg-yellow-500 font-sans ml-6 text-white px-12 py-3 transition duration-200  hover:rounded-full rounded-lg shadow-sm hover:shadow-2xl hover:shadow-black"
      >
        Submit
      </button>
    </div>
  );
}

export default BottomNavAddProblem;
