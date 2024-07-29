import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import "./resizeable.css";

const ProblemDetail = () => {
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState(`
#include <iostream>

int main() {
    cout << "Hello World!";
    return 0;
}
`);

  const { problemNameId } = useParams();
  const problem_id = problemNameId.split("-").pop();

  const problemRef = useRef(null);
  const topSectionRef = useRef(null);
  const bottomSectionRef = useRef(null);

  const fetchProblem = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_APP_API_BASE_URL}/problem/${problem_id}`,
        { method: "GET", credentials: "include" }
      );
      const data = await res.json();
      setProblem(data.problem);
    } catch (error) {
      console.error("Error fetching problem:", error);
    }
  };

  useEffect(() => {
    fetchProblem();
  }, [problem_id]);

  const getColor = () => {
    if (problem.tag === "easy") return "text-green-400";
    else if (problem.tag === "medium") return "text-yellow-400";
    else return "text-red-400";
  };

  useEffect(() => {
    const handleMouseDown = (event, ref) => {
      event.preventDefault();
      const initialY = event.clientY;
      const initialHeight = ref.current.getBoundingClientRect().height;
      const handleMouseMove = (event) => {
        const newHeight = initialHeight + (initialY - event.clientY);
        ref.current.style.height = `${newHeight}px`;
      };
      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

    const addResizer = (ref, resizerClass) => {
      if (ref.current) {
        const resizer = ref.current.querySelector(resizerClass);
        if (resizer) {
          resizer.addEventListener("mousedown", (event) =>
            handleMouseDown(event, ref)
          );
        }
      }
    };

    addResizer(topSectionRef, ".top-resizer");
    addResizer(bottomSectionRef, ".bottom-resizer");

    return () => {
      const removeResizer = (ref, resizerClass) => {
        if (ref.current) {
          const resizer = ref.current.querySelector(resizerClass);
          if (resizer) {
            resizer.removeEventListener("mousedown", (event) =>
              handleMouseDown(event, ref)
            );
          }
        }
      };
      removeResizer(topSectionRef, ".top-resizer");
      removeResizer(bottomSectionRef, ".bottom-resizer");
    };
  }, []);

  return (
    <>
      <div className="flex flex-1 h-screen">
        <div
          className="resizable bg-secblack text-white text-sm p-4 flex-1 overflow-auto"
          ref={problemRef}
        >
          <div className="resizer cursor-col-resize w-2 bg-gray-500 absolute right-0 top-0 h-full"></div>
          {problem ? (
            <>
              <h1 className="text-3xl font-bold mb-4">
                {problem.problem_name}
              </h1>
              <div className="mb-4">
                <span
                  className={`mb-2 ${getColor()} bg-zinc-700 rounded-full p-2`}
                >
                  {problem.tag}
                </span>
              </div>
              <p className="mb-2 font-xl">{problem.problem_desc}</p>
              <hr className="border-zinc-600 my-3" />
              <h1 className="text-lg font-bold my-4">Input Format</h1>
              <p>{problem.input_format}</p>
              <h1 className="text-lg font-bold my-4">Output Format</h1>
              <p>{problem.output_format}</p>
              <hr className="border-zinc-600 my-3" />
              <h1 className="text-lg font-bold">Example Cases</h1>
              <div>
                {problem.example_cases.length > 0 ? (
                  <ul className="list- font-mono">
                    {problem.example_cases.map((example, index) => (
                      <li key={index} className="my-10">
                        <strong>Example {index + 1}:</strong>
                        <div className="ml-2">
                          <p className="m-2">
                            <strong>Input:</strong>{" "}
                            <span className="lctxt">{example.input}</span>
                          </p>
                          <p className="m-2">
                            <strong>Output:</strong>{" "}
                            <span className="lctxt">{example.output}</span>
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No example cases provided.</p>
                )}
              </div>
              <hr className="border-zinc-600 my-3" />
              <h1 className="text-lg font-bold">Constraints</h1>
              <div>
                {problem.constraints.length > 0 ? (
                  <ul className="list-disc mx-3 font-mono">
                    {problem.constraints.map((constraint, index) => (
                      <li key={index}>
                        <div className="ml-2">
                          <p className="m-2">
                            <span className="lctxt">{constraint}</span>
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No constraints provided.</p>
                )}
              </div>
            </>
          ) : (
            <p>Loading problem details...</p>
          )}
        </div>
        <div className="right-container flex-1 flex flex-col">
          <div
            className="top-section bg-secblack text-white p-4 overflow-auto relative"
            ref={topSectionRef}
          >
            <div className="top-resizer cursor-row-resize w-full h-2 bg-gray-500 absolute bottom-0 left-0"></div>
            <h1 className="text-xl">Code</h1>
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) => highlight(code, languages.js)}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 15,
                outline: "none",
                border: "none",
                backgroundColor: "#282828",
                height: "calc(100% - 40px)", // Adjust height to leave space for resizer
                overflowY: "auto",
              }}
            />
          </div>
          <div className="bottom-section bg-secblack text-white p-4 overflow-auto">
            {/* Bottom section content goes here */}
            <p>Bottom section</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProblemDetail;
