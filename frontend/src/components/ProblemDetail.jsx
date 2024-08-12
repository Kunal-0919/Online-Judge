import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import Loading from "./Loading";
import Editor from "@monaco-editor/react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DataObjectIcon from "@mui/icons-material/DataObject";

const ProblemDetail = () => {
  const [problem, setProblem] = useState(null);
  const [lang, setLang] = useState("cpp");
  const [code, setCode] = useState(`#include <bits/stdc++.h>
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
  const [verdictMessage, setVerdictMessage] = useState("");
  const [loading, setLoading] = useState(false);
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
      console.log(data);
      setProblem(data.problem);
    } catch (error) {
      console.error("Error fetching problem:", error);
      alert(error);
    }
  };
  const handleSubmit = async () => {
    if (loading) return;

    setVerdict("");
    setVerdictMessage("");
    setBottomView("verdict");
    setLoading(true); // Set loading to true when the submission starts
    const apiurl = `${import.meta.env.VITE_APP_API_BASE_URL}/runcode/submit`;
    const res = await fetch(apiurl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        code,
        lang,
        problem_id,
      }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.message || "Login failed");
      alert(data.message);
      return;
    }

    const data = await res.json();
    setVerdict(data.verdict);
    setVerdictMessage(data.message);
  };

  const handleRun = async () => {
    if (loading) return;
    setOutput("");
    setBottomView("output");
    setLoading(true);
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
        input,
      }),
    });

    setLoading(false); // Set loading to false when the run ends

    if (!res.ok) {
      const data = await res.json();
      setError(data.message || "Login failed");
      alert(data.message);
      return;
    }

    const data = await res.json();
    setOutput(data.output);
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

  const getverdictColor = () => {
    if (verdict === "Accepted") return "text-green-500";
    else if (verdict === "Wrong Answer") return "text-red-400";
    else return "text-yellow-500";
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
            disabled={loading}
            className="text-lctxt bg-secblack px-5 py-2 rounded-l-2xl transition duration-500 hover:shadow-sm hover:shadow-zinc-600 hover:bg-zinc-600"
          >
            <PlayArrowIcon />
            Run
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`text-green-500 bg-secblack px-5 py-2 rounded-r-2xl transition duration-500 hover:shadow-sm hover:shadow-zinc-600 hover:bg-zinc-600 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <ArrowUpwardIcon />
            Submit
          </button>
        </div>
      </div>
      <div className="flex flex-1 h-screen bg-priblack">
        <div className="bg-secblack m-3 shadow-lg shadow-black text-zinc-200 rounded-2xl text-sm p-9 flex-1 overflow-auto">
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
                  <div>
                    {problem.example_cases.map((example, index) => (
                      <div key={index} className="my-10">
                        <strong>Example {index + 1}:</strong>
                        <div className="ml-2">
                          <p className="m-2">
                            <strong>Input:</strong>
                            <textarea
                              value={example.input}
                              disabled={true}
                              style={{ resize: "none" }}
                              className="w-full h-24 bg-zinc-900 text-red-300 p-3 mt-2 rounded"
                            />
                          </p>
                          <p className="m-2">
                            <strong>Output:</strong>
                            <textarea
                              value={example.output}
                              disabled={true}
                              style={{ resize: "none" }}
                              className="w-full h-24 bg-zinc-900 p-3 mt-2 rounded text-green-500"
                            />
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
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
                            <span className="text-zinc-100 bg-zinc-700 rounded p-1 m-3">
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
          )}
        </div>
        <div className="right-container flex-1 flex flex-col">
          <div className="top-section bg-secblack h-1/2 text-white m-3 rounded-2xl shadow-2xl shadow-black p-4 overflow-auto">
            <h1 className="text-md m-1 font-mono text-green-500">
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
}`);
                } else if (l === "py") {
                  setCode(`print("Hello")`);
                } else if (l === "rs") {
                  setCode(`fn main() {
    println!("Hello World!");
}
`);
                }
              }}
            >
              <option value="cpp">C++</option>
              <option value="py">Python</option>
              <option value="rs">Rust</option>
            </select>
            <Editor
              height="70vh"
              language={lang}
              value={code}
              onChange={(value) => setCode(value)}
              options={{
                fontSize: 14,
                automaticLayout: true,
                theme: "vs-dark",
              }}
            />
          </div>
          <div className="bottom-section bg-secblack h-1/2 text-white m-3 rounded-2xl shadow-2xl pb-80 shadow-black p-4 overflow-auto">
            <div className="flex justify-evenly">
              <button
                className={`px-6 py-2 rounded-lg ${
                  bottomView === "input" ? "bg-zinc-600" : "text-lctxt"
                }`}
                onClick={(e) => {
                  setBottomView("input");
                  e.preventDefault();
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
                  style={{ resize: "none" }}
                  value={input}
                  className="w-4/5 h-56 bg-zinc-900 p-3"
                  onChange={(e) => {
                    setInput(e.target.value);
                    e.preventDefault();
                  }}
                ></textarea>
              )}
              {bottomView === "output" && (
                <textarea
                  name=""
                  id=""
                  value={output}
                  disabled={true}
                  style={{ resize: "none" }}
                  className="w-4/5 h-56 bg-zinc-900 p-3"
                ></textarea>
              )}
              {bottomView === "verdict" && (
                <div
                  className={`w-4/5 h-56 bg-zinc-900 p-3 ${getverdictColor()} text-3xl overflow-y-auto`}
                  style={{ resize: "none" }}
                >
                  <p className="font-bold">{verdict}</p>
                  <p className="text-lg">{verdictMessage}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProblemDetail;
