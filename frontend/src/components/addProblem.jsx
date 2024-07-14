// AddProblemPage.js
import React, { useState } from "react";
import Navbar from "./navbar";
import BottomNavAddProblem from "./BottomNavAddProblem";

function AddProblemPage() {
  const [problem_name, setProblemName] = useState("");
  const [problem_desc, setProblemDesc] = useState("");
  const [input_format, setInputFormat] = useState("");
  const [output_format, setOutputFormat] = useState("");
  const [constraints, setConstraints] = useState([""]);

  const handleAddConstraint = () => {
    if (
      constraints.length === 0 ||
      constraints[constraints.length - 1].trim() !== ""
    ) {
      setConstraints([...constraints, ""]);
    }
  };

  const handleDeleteLastConstraint = () => {
    if (constraints.length > 1) {
      setConstraints(constraints.slice(0, -1));
    }
  };

  const handleConstraintChange = (index, value) => {
    const newConstraints = [...constraints];
    newConstraints[index] = value;
    setConstraints(newConstraints);
  };

  const handleInputChange = (e) => {
    setInputFormat(e.target.value);
  };

  const handleOutputChange = (e) => {
    setOutputFormat(e.target.value);
  };

  const handleReset = () => {
    setProblemName("");
    setProblemDesc("");
    setInputFormat("");
    setOutputFormat("");
    setConstraints([""]);
  };

  const handleSubmit = () => {
    // Handle submit functionality here
    // For now, it does nothing
  };

  return (
    <>
      <Navbar text="Add Problem" />
      <div className="font-mono pt-16 relative min-h-screen pb-36">
        <div className="flex flex-col md:flex-row w-full">
          <div className="w-full md:w-1/2 p-8 bg-primary shadow-xl rounded-lg text-center mx-4 mt-4 md:mt-0 h-auto">
            <h1 className="text-3xl font-sans font-bold text-black mb-4 text-center">
              Add Problem Description
            </h1>
            <input
              type="text"
              name="input_name"
              id="input_name"
              className="block p-2 border border-gray-300 rounded mb-4 w-full"
              placeholder="Add Input Name"
              value={problem_name}
              onChange={(e) => setProblemName(e.target.value)}
            />
            <textarea
              name="problem_desc"
              id="problem_desc"
              className="block p-2 border border-gray-300 rounded mb-4 w-full h-36"
              placeholder="Add Problem Statement"
              value={problem_desc}
              onChange={(e) => setProblemDesc(e.target.value)}
            ></textarea>
            <textarea
              name="input_format"
              id="input_format"
              className="block p-2 border border-gray-300 rounded mb-4 w-full h-36"
              placeholder="Add Input Format"
              value={input_format}
              onChange={handleInputChange}
            ></textarea>
            <textarea
              name="output_format"
              id="output_format"
              className="block p-2 border border-gray-300 rounded mb-4 w-full h-36"
              placeholder="Add Output Format"
              value={output_format}
              onChange={handleOutputChange}
            ></textarea>
          </div>
          <div className="w-full md:w-1/2 p-8 bg-primary shadow-xl rounded-lg text-center mx-4 mt-4 md:mt-0 h-auto">
            <h1 className="text-3xl font-sans font-bold text-black mb-4 text-center">
              Add Constraints
            </h1>
            {constraints.map((constraint, index) => (
              <input
                key={index}
                type="text"
                className="block p-2 border border-gray-300 rounded mb-4 w-full"
                placeholder={`Constraint ${index + 1}`}
                value={constraint}
                onChange={(e) => handleConstraintChange(index, e.target.value)}
              />
            ))}
            <div className="flex space-x-4 mt-8">
              <button
                onClick={handleAddConstraint}
                className="block w-full border-2 border-black font-sans bg-green-500 text-black p-2 rounded-xl transition duration-200 hover:shadow-lg hover:shadow-black"
              >
                Add More Constraints
              </button>
              <button
                onClick={handleDeleteLastConstraint}
                className="block w-full border-2 border-black font-sans bg-red-500 text-black p-2 rounded-xl transition duration-200 hover:shadow-lg hover:shadow-black"
              >
                Delete Last Constraint
              </button>
            </div>
          </div>
        </div>
        <BottomNavAddProblem onReset={handleReset} onSubmit={handleSubmit} />
      </div>
    </>
  );
}

export default AddProblemPage;
