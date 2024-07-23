// AddProblemPage.js
import React, { useState } from "react";
import Navbar from "./Navbar";
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
      <Navbar isAuthenticated={false} backgroundcolor={false} />
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
              className="block p-2 border border-gray-300 mb-4 w-full bg-slate-100 font-sans text-black rounded-lg"
              placeholder="Add Problem Name"
              value={problem_name}
              onChange={(e) => setProblemName(e.target.value)}
            />
            <textarea
              name="problem_desc"
              id="problem_desc"
              className="block p-2 border border-gray-300 mb-4 w-full h-36 pl-5 bg-slate-100 font-sans text-black rounded-lg"
              placeholder="Add Problem Statement"
              value={problem_desc}
              onChange={(e) => setProblemDesc(e.target.value)}
            ></textarea>
            <textarea
              name="input_format"
              id="input_format"
              className="block p-2 border border-gray-300 mb-4 w-full h-36 pl-5 bg-slate-100 font-sans text-black rounded-lg"
              placeholder="Add Input Format"
              value={input_format}
              onChange={handleInputChange}
            ></textarea>
            <textarea
              name="output_format"
              id="output_format"
              className="block p-2 border border-gray-300 mb-4 w-full h-36 pl-5 bg-slate-100 font-sans text-black rounded-lg"
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
                className="block p-2 border border-gray-300 mb-4 w-full bg-slate-100 font-sans text-black rounded-lg"
                placeholder={`Constraint ${index + 1}`}
                value={constraint}
                onChange={(e) => handleConstraintChange(index, e.target.value)}
              />
            ))}
            <div className="flex space-x-4 mt-8">
              <button
                onClick={handleAddConstraint}
                className="block w-full border-1 font-sans bg-green-400 text-black px-2 py-3 rounded-md transition duration-200 hover:rounded-full"
              >
                Add More Constraints
              </button>
              <button
                onClick={handleDeleteLastConstraint}
                className="block w-full border-1 font-sans bg-danger text-black px-2 py-3 rounded-md transition duration-200 hover:rounded-full"
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
