import LogoComponent from "./LogoComponent";
import { useEffect, useState } from "react";
function CreateProblemModerator() {
  const [problemName, setProblemName] = useState("");
  const [problemDesc, setProblemDesc] = useState("");
  const [addTC, setAddTC] = useState(false);

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-primary">
        <div className="bg-secondary shadow-lg shadow-black rounded-xl px-24 py-10 w-10/12">
          <h1 className="text-3xl text-white text-center font-extrabold">
            Problem Setting
          </h1>
          <input
            type="text"
            name="problem-name"
            id="problem-name"
            // value={problemName}
            className="block m-2 p-2 border border-gray-300 rounded mb-4 w-full"
            placeholder="Problem name"
          />
          <textarea
            type="text"
            name="problem-description"
            id="problem-description"
            // value={problemDesc}

            className="block m-2 p-2 border border-gray-300 rounded mb-4 w-full h-80"
            placeholder="Problem Descritpion"
          />
          <button className="bg-green-400 mx-4 text-black p-2 rounded-lg transition duration-200 shadow-md shadow-black ease-in-out hover:shadow-black hover:text-white hover:bg-black hover:border-2 hover:border-black font-extrabold">
            Add Problem
          </button>
          <button className="bg-red-500 mx-4 text-black p-2 rounded-lg transition duration-200 shadow-md shadow-black ease-in-out hover:shadow-black hover:text-white hover:bg-black hover:border-2 hover:border-black font-extrabold">
            Delete Problem
          </button>
        </div>

        {/* we need to create a form for it */}
        {/* Problem Name */}
        {/* Problem Description */}
        {/* Test Case */}
        {/*{/* TC */}
        {/* Add Test Case string format */}
        {/* And also what do we need first we need to model the values */}
        {/* Constraints */}
      </div>
    </>
  );
}

export default CreateProblemModerator;
