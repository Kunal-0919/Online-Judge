import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import Loading from "./Loading";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-funky.css"; //Example style, you can use another
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DataObjectIcon from "@mui/icons-material/DataObject";

const ProblemDetail = () => {
  const [problem, setProblem] = useState(null);
  const [lang, setLang] = useState("cpp");
  const [code, setCode] = useState(`#include <iostream>
using namespace std;
int main() {
    cout << "Hello World!" << endl;
    return 0;
}
`);
  const [bottomView, setBottomView] = useState("input");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [verdict, setVerdict] = useState("");

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
    setBottomView("output");
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
          className="bg-secblack m-3 text-white rounded-2xl border-2 border-zinc-700 shadow-md shadow-zinc-700 text-sm p-9 flex-1 overflow-auto"
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
              <p className="my-5 mx-2 text-lg">{problem.problem_desc}</p>
              <hr className="border-zinc-600 my-5" />
              <h1 className="text-2xl font-bold my-4">Input Format</h1>
              <p className="text-lg">{problem.input_format}</p>
              <h1 className="text-2xl font-bold my-4">Output Format</h1>
              <p className="text-lg">{problem.output_format}</p>
              <hr className="border-zinc-600 my-5" />
              <h1 className="text-2xl font-bold">Example Cases</h1>
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
              <hr className="border-zinc-600 my-5" />
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
            <Loading />
            //
          )}
        </div>
        <div className="right-container flex-1 flex flex-col">
          <div className="top-section bg-sxecblack h-1/2 text-white m-3 rounded-2xl border-2 border-zinc-700 shadow-sm shadow-zinc-700 p-4 overflow-auto">
            <h1 className="text-xl m-1 font-mono text-green-500">
              <span className="mx-2">
                <DataObjectIcon />
              </span>
              Code
            </h1>
            <select
              name="Select Language"
              className="p-2 border my-4 border-zinc-700 bg-zinc-800 text-zinc-100 rounded w-full"
              onChange={(e) => {
                setLang(e.target.value);
                const l = e.target.value;
                if (l === "cpp") {
                  setCode(`#include <iostream>
using namespace std;
int main() {
    cout << "Hello World!" << endl;
    return 0;
}
`);
                } else if (l === "py") {
                  setCode(`print("Hello")`);
                } else if (l === "js") {
                  setCode(`console.log("Hello");`);
                }
              }}
            >
              <option value="cpp">C++</option>
              <option value="py">Python</option>
              <option value="js">Javascript</option>
            </select>
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
          <div className="bottom-section bg-secblack h-1/2 text-white m-3 rounded-2xl border-2 border-zinc-700 shadow-sm pb-80 shadow-zinc-700 p-4 overflow-auto">
            <div className="flex justify-evenly">
              <button
                className={`px-6 py-2 rounded-lg ${
                  bottomView === "input" ? "bg-zinc-600" : "text-lctxt"
                }`}
                onClick={(e) => {
                  setBottomView("input");
                  e.preventDefault;
                }}
              >
                Input
              </button>
              <button
                className={`px-6 py-2 rounded-lg ${
                  bottomView === "output" ? "bg-zinc-600" : "text-lctxt"
                }`}
                onClick={() => setBottomView("output")}
              >
                Output
              </button>
              <button
                className={`px-6 py-2 rounded-lg ${
                  bottomView === "verdict" ? "bg-zinc-600" : "text-lctxt"
                }`}
                onClick={() => setBottomView("verdict")}
              >
                Verdict
              </button>
            </div>
            <div className="w-full flex justify-center m-4">
              {bottomView === "input" && (
                <textarea
                  name=""
                  id=""
                  value={input}
                  className="w-4/5 h-64 p-3 bg-zinc-900"
                  onChange={(e) => {
                    setInput(e.target.value);
                    e.preventDefault;
                  }}
                ></textarea>
              )}
              {bottomView === "output" && (
                <textarea
                  name=""
                  id=""
                  value={output.output}
                  className="w-4/5 h-64 bg-zinc-900 p-3"
                ></textarea>
              )}
              {bottomView === "verdict" && (
                <textarea
                  name=""
                  id=""
                  className="w-4/5 h-64 bg-zinc-900 p-3"
                ></textarea>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProblemDetail;
