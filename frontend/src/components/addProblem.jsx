import React, { useState } from "react";
import Navbar from "./Navbar";
import BottomNavAddProblem from "./BottomNavAddProblem";

function AddProblemPage() {
  const [problem_name, setProblemName] = useState("");
  const [problem_desc, setProblemDesc] = useState("");
  const [input_format, setInputFormat] = useState("");
  const [output_format, setOutputFormat] = useState("");
  const [constraints, setConstraints] = useState([""]);
  const [numberOfExampleTC, setNumberOfExampleTC] = useState(1);
  const [example_cases, setExampleCases] = useState([
    { input: "", output: "" },
  ]);
  const [numberOfHiddenTC, setNumberOfHiddenTC] = useState(4);
  const [hidden_cases, setHiddenCases] = useState([{ input: "", output: "" }]);
  const [tag, setTag] = useState("");

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

  const handleNumberChange = (e) => {
    const value = Math.max(1, Math.min(4, parseInt(e.target.value, 10) || 1));
    setNumberOfExampleTC(value);
    setExampleCases(
      Array.from(
        { length: value },
        (_, i) => example_cases[i] || { input: "", output: "" }
      )
    );
  };

  const handleExampleCaseChange = (index, field, value) => {
    const newExampleCases = [...example_cases];
    newExampleCases[index] = { ...newExampleCases[index], [field]: value };
    setExampleCases(newExampleCases);
  };

  const handleNumberOfHiddenTCChange = (e) => {
    const value = Math.max(1, Math.min(20, parseInt(e.target.value, 10) || 4));
    setNumberOfHiddenTC(value);
    setHiddenCases(
      Array.from(
        { length: value },
        (_, i) => hidden_cases[i] || { input: "", output: "" }
      )
    );
  };

  const handleHiddenCaseChange = (index, field, value) => {
    const newHiddenCases = [...hidden_cases];
    newHiddenCases[index] = { ...newHiddenCases[index], [field]: value };
    setHiddenCases(newHiddenCases);
  };

  const handleReset = () => {
    setProblemName("");
    setProblemDesc("");
    setInputFormat("");
    setOutputFormat("");
    setConstraints([""]);
    setNumberOfExampleTC(1);
    setExampleCases([{ input: "", output: "" }]);
    setNumberOfHiddenTC(1);
    setHiddenCases([{ input: "", output: "" }]);
  };

  const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;
  const handleSubmit = async () => {
    console.log("Hidden cases before submission:", hidden_cases); // Debugging

    try {
      const res = await fetch(`${apiUrl}/problem/addproblem`, {
        method: "POST",
        body: JSON.stringify({
          problem_name,
          problem_desc,
          input_format,
          output_format,
          constraints,
          example_cases,
          tag: tag[0],
          hidden_cases,
        }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!res.ok) {
        alert("An error occurred while adding the problem. Please try again.");
      } else {
        const data = await res.json();
        console.log("Problem added successfully:", data);
      }
    } catch (error) {
      console.error("Error adding problem:", error);
      alert("An error occurred while adding the problem. Please try again.");
    }
  };

  const getColorOfTag = () => {
    if (tag[0] === "easy") {
      return "text-green-400";
    } else if (tag[0] === "medium") {
      return "text-yellow-400";
    } else if (tag == "hard") {
      return "text-red-400";
    }
    return "text-lctxt";
  };

  return (
    <>
      <Navbar backgroundcolor={true} />
      <div className="font-mono bg-priblack pt-16 relative min-h-screen p-20">
        <div className="flex mb-12 flex-col md:flex-row w-full">
          <div className="w-1/2 md:w-1/2 p-8 bg-secblack shadow-xl rounded-lg text-center mx-4 mt-4 md:mt-0 h-auto">
            <label htmlFor="" className="font-sans text-white mx-3 text-lg">
              Add Problem Tag
            </label>
            <select
              className={`font-sans bg-secblack ${getColorOfTag()} border-zinc-700 border-2 p-2 rounded-md`}
              onChange={(e) => setTag([e.target.value])}
            >
              <option value="lctxt">-- Select Tag --</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            <h1 className="text-3xl mt-2 font-sans font-bold text-white mb-4 text-center">
              Add Problem Description
            </h1>
            <input
              type="text"
              name="input_name"
              id="input_name"
              className="block p-2 border border-zinc-700 bg-zinc-800 text-zinc-100 mb-4 w-full font-sans  rounded-lg"
              placeholder="Add Problem Name"
              value={problem_name}
              onChange={(e) => setProblemName(e.target.value)}
            />
            <textarea
              name="problem_desc"
              id="problem_desc"
              style={{ resize: "none" }}
              className="block p-2 border border-zinc-700 bg-zinc-800 text-zinc-100 mb-4 w-full h-36 pl-5 font-sans  rounded-lg"
              placeholder="Add Problem Statement"
              value={problem_desc}
              onChange={(e) => setProblemDesc(e.target.value)}
            ></textarea>
            <textarea
              name="input_format"
              id="input_format"
              style={{ resize: "none" }}
              className="block p-2 border border-zinc-700 bg-zinc-800 text-zinc-100 mb-4 w-full h-36 pl-5 font-sans  rounded-lg"
              placeholder="Add Input Format"
              value={input_format}
              onChange={handleInputChange}
            ></textarea>
            <textarea
              name="output_format"
              id="output_format"
              style={{ resize: "none" }}
              className="block p-2 border border-zinc-700 bg-zinc-800 text-zinc-100 mb-4 w-full h-36 pl-5 font-sans  rounded-lg"
              placeholder="Add Output Format"
              value={output_format}
              onChange={handleOutputChange}
            ></textarea>
          </div>
          <div className="w-1/2 md:w-1/2 p-8 bg-secblack shadow-xl rounded-lg text-center mx-4 mt-4 md:mt-0 h-auto">
            <h1 className="text-3xl font-sans font-bold text-white mb-4 text-center">
              Add Constraints
            </h1>
            {constraints.map((constraint, index) => (
              <input
                key={index}
                type="text"
                className="block p-2 border border-zinc-700 bg-zinc-800 text-zinc-100 mb-4 w-full font-sans  rounded-lg"
                placeholder={`Constraint ${index + 1}`}
                value={constraint}
                onChange={(e) => handleConstraintChange(index, e.target.value)}
              />
            ))}
            <span className="flex space-x-4 mt-8">
              <button
                onClick={handleAddConstraint}
                className="block w-full border-1 font-sans bg-green-400  px-2 py-3 rounded-md transition duration-200 hover:rounded-full hover:shadow-2xl hover:shadow-black"
              >
                Add More Constraints
              </button>
              <button
                onClick={handleDeleteLastConstraint}
                className="block w-full border-2 border-white text-white font-sans bg-danger px-2 py-3 rounded-md transition duration-200 hover:rounded-full hover:shadow-2xl hover:shadow-black"
              >
                Delete Last Constraint{" "}
              </button>
            </span>
            <div className="my-4">
              <h1 className="text-3xl font-sans font-bold text-white mb-4 text-center">
                Add Example Cases
              </h1>
              <input
                type="number"
                value={numberOfExampleTC}
                onChange={handleNumberChange}
                className="block p-2 border border-zinc-700 bg-zinc-800 text-zinc-100 mb-4 pl-5 font-sans rounded-lg"
                min={1}
                max={4}
              />
              {example_cases.map((example, index) => (
                <div key={index} className="mb-4">
                  <textarea
                    className="block p-2 border border-zinc-700 bg-zinc-800 text-zinc-100 w-full h-20 pl-5 font-sans rounded-lg"
                    placeholder={`Example Case ${index + 1} Input`}
                    value={example.input}
                    style={{ resize: "none" }}
                    onChange={(e) =>
                      handleExampleCaseChange(index, "input", e.target.value)
                    }
                  ></textarea>
                  <textarea
                    className="block p-2 border border-zinc-700 bg-zinc-800 text-zinc-100 w-full h-20 pl-5 font-sans rounded-lg"
                    placeholder={`Example Case ${index + 1} Output`}
                    style={{ resize: "none" }}
                    value={example.output}
                    onChange={(e) =>
                      handleExampleCaseChange(index, "output", e.target.value)
                    }
                  ></textarea>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-auto  p-5 bg-secblack shadow-xl rounded-lg text-center mx-4 md:mt-0 h-1/3">
          {/* section for adding hidden cases */}
          <h1 className="text-3xl font-sans font-bold text-white my-4 text-center">
            Add Hidden Test Cases
          </h1>

          <input
            type="number"
            placeholder="Add Number of Testcases"
            value={numberOfHiddenTC}
            onChange={handleNumberOfHiddenTCChange}
            className="block p-2 m-5 border border-zinc-700 bg-zinc-800 text-zinc-100 mb-4 pl-5 font-sans rounded-lg"
            min={4}
            max={20}
          />
          {hidden_cases.map((hidden, index) => (
            <div key={index} className="mb-9">
              <textarea
                className="block p-2 w-full border border-zinc-700 bg-zinc-800 text-zinc-100 h-20 pl-5 font-sans rounded-lg"
                placeholder={`Hidden Case ${index + 1} Input`}
                value={hidden.input}
                style={{ resize: "none" }}
                onChange={(e) =>
                  handleHiddenCaseChange(index, "input", e.target.value)
                }
              ></textarea>
              <textarea
                className="block p-2 w-full border border-zinc-700 bg-zinc-800 text-zinc-100 h-20 pl-5 font-sans rounded-lg"
                placeholder={`Hidden Case ${index + 1} Output`}
                value={hidden.output}
                style={{ resize: "none" }}
                onChange={(e) =>
                  handleHiddenCaseChange(index, "output", e.target.value)
                }
              ></textarea>
            </div>
          ))}
        </div>
        <BottomNavAddProblem onReset={handleReset} onSubmit={handleSubmit} />
      </div>
    </>
  );
}

export default AddProblemPage;
