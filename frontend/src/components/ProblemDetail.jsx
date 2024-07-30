import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-funky.css"; //Example style, you can use another
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ProblemDetail = () => {
  const [problem, setProblem] = useState(null);
  const [lang, setLang] = useState("cpp");
  const [code, setCode] = useState(`
#include <iostream>
using namespace std;
int main() {
    cout << "Hello World!";
    return 0;
}
`);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const { problemNameId } = useParams();
  const problem_id = problemNameId.split("-").pop();

  const problemRef = useRef(null);

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

  const handleRun = async () => {
    const apiurl = `${import.meta.env.VITE_APP_API_BASE_URL}/runcode/run`;
    const res = await fetch(apiurl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        code,
        lang,
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.message || "Login failed");
      return;
    }

    const data = await res.json();
    setOutput(data);
    console.log(data);
  };

  useEffect(() => {
    fetchProblem();
  }, [problem_id]);

  const getColor = () => {
    if (problem.tag === "easy") return "text-green-400";
    else if (problem.tag === "medium") return "text-yellow-400";
    else return "text-red-400";
  };

  return (
    <>
      <div className="flex flex-1 bg-priblack items-center justify-between p-3">
        <Link to="/problemset" className="text-lctxt">
          <ArrowBackIcon /> Problems
        </Link>
        <div className="flex space-x-2">
          <button
            onClick={handleRun}
            className="text-lctxt bg-secblack px-5 py-2 rounded-l-2xl transition duration-500 hover:shadow-sm m-1 hover:shadow-zinc-600 hover:bg-zinc-600"
          >
            <PlayArrowIcon />
            Run
          </button>
          <button className="text-green-500 bg-secblack px-5 py-2 rounded-r-2xl transition duration-500 hover:shadow-sm m-1 hover:shadow-zinc-600 hover:bg-zinc-600">
            <ArrowUpwardIcon />
            Submit
          </button>
        </div>
      </div>
      <div className="flex flex-1 h-screen bg-priblack">
        <div
          className="bg-secblack m-3 text-white rounded-2xl border-2 border-zinc-600 text-sm p-4 flex-1 overflow-auto"
          ref={problemRef}
        >
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
                            <span className="text-lctxt">{example.input}</span>
                          </p>
                          <p className="m-2">
                            <strong>Output:</strong>{" "}
                            <span className="text-lctxt">{example.output}</span>
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
                            <span className="text-lctxt bg-zinc-600 rounded p-1 m-3">
                              {constraint}
                            </span>
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
          <div className="top-section bg-secblack text-white m-3 rounded-2xl border-2 border-zinc-600 p-4 overflow-auto">
            <h1 className="text-xl font-mono text-yellow-500">Code</h1>
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) => highlight(code, languages.js)}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12,
                outline: "none",
                border: "none",
                backgroundColor: "#282828",
                overflowY: "auto",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProblemDetail;
