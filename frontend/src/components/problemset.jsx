import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate, useLocation } from "react-router-dom";
import Loading from "./Loading";

const Problemset = () => {
  const location = useLocation(); // Get current location
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterTag, setFilterTag] = useState("");
  const [filterTopic, setFilterTopic] = useState("");
  const [search, setSearch] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();

  const fetchProblems = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_BASE_URL}/problem/problems`,
        { method: "GET", credentials: "include" }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch problems");
      }
      const data = await response.json();
      setProblems(data.problems);
    } catch (error) {
      setError("Error fetching problems");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProblems();
    const token = Cookies.get("token");

    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Decode the token
        const adminStatus = decodedToken.role === "admin";
        setIsAdmin(adminStatus);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [location]); // Add location as a dependency

  const handleDelete = async (problemId) => {
    console.log(problemId);
    if (window.confirm("Are you sure you want to delete this problem?")) {
      try {
        console.log({});
        const response = await fetch(
          `${
            import.meta.env.VITE_APP_API_BASE_URL
          }/problem/delete/${problemId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to delete problem");
        }
        setProblems(problems.filter((problem) => problem._id !== problemId));
      } catch (error) {
        setError("Error deleting problem");
      }
    }
  };

  const handleProblemClick = (id, problemName) => {
    console.log(id);
    const formattedName = problemName.toLowerCase().replace(/ /g, "-");
    navigate(`/problem/${formattedName}-${id}`);
  };

  const filteredProblems = problems.filter((problem) => {
    const matchesTag = filterTag ? problem.tag === filterTag : true;
    const matchesTopic = filterTopic
      ? problem.topic_tags.includes(filterTopic)
      : true;
    const matchesSearch = search
      ? problem.problem_name.toLowerCase().includes(search.toLowerCase()) ||
        (problems.indexOf(problem) + 1).toString().includes(search)
      : true;
    return matchesTag && matchesTopic && matchesSearch;
  });

  const getTagColor = (tag) => {
    switch (tag) {
      case "easy":
        return "text-green-400";
      case "medium":
        return "text-yellow-400";
      case "hard":
        return "text-red-400";
      default:
        return "text-zinc-300";
    }
  };

  const getAcceptancePercentage = (submissionCount, acceptanceCount) => {
    if (submissionCount === 0) return "N/A";
    return ((acceptanceCount / submissionCount) * 100).toFixed(2) + "%";
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  return (
    <>
      <Navbar backgroundcolor={true} />
      <div className="min-h-screen bg-priblack text-white p-4">
        <h1 className="text-3xl font-bold mb-4">Problems Dashboard</h1>
        {loading ? (
          <Loading />
        ) : error ? (
          <p className="text-red-400">{error}</p>
        ) : (
          <div className="p-12">
            <div className="mb-4 flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <label className="mr-2">Search:</label>
                <input
                  type="text"
                  className="p-2 border border-zinc-700 bg-zinc-800 text-zinc-100 rounded w-full"
                  placeholder="Search by name or number..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <div className="flex-1 min-w-[200px]">
                <label className="mr-2">Filter by Tag:</label>
                <select
                  className="p-2 border border-zinc-700 bg-zinc-800 text-zinc-100 rounded w-full"
                  value={filterTag}
                  onChange={(e) => setFilterTag(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              <div className="flex-1 min-w-[200px]">
                <label className="mr-2">Filter by Topic:</label>
                <select
                  className="p-2 border border-zinc-700 bg-zinc-800 text-zinc-100 rounded w-full"
                  value={filterTopic}
                  onChange={(e) => setFilterTopic(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="Array">Array</option>
                  <option value="String">String</option>
                  <option value="Hash Table">Hash Table</option>
                </select>
              </div>
            </div>
            <table className="min-w-full bg-zinc-800 border-none rounded-lg">
              <thead>
                <tr className="bg-priblack text-left border-b-2 border-zinc-800 md-2">
                  <th className="p-2" id="number">
                    No.
                  </th>
                  <th className="p-2" id="problem_name">
                    Name
                  </th>
                  <th className="p-2" id="tag">
                    Tag
                  </th>
                  <th className="p-2" id="topic_tags">
                    Topic Tags
                  </th>
                  <th className="p-2" id="acceptance_percentage">
                    Acceptance Percentage
                  </th>
                  {isAdmin && <th className="p-2">Actions</th>}
                </tr>
              </thead>
              <tbody>
                {filteredProblems.map((problem, index) => (
                  <tr
                    key={problem._id}
                    id={problem._id}
                    // onClick={() =>
                    //   handleProblemClick(problem._id, problem.problem_name)
                    // }
                    className={
                      index % 2 === 0
                        ? "bg-priblack hover:cursor-pointer text-slate-400"
                        : "terblack hover:cursor-pointer text-slate-400"
                    }
                  >
                    <td
                      className="p-3"
                      onClick={() =>
                        handleProblemClick(problem._id, problem.problem_name)
                      }
                    >
                      {index + 1}
                    </td>
                    <td
                      className="p-3 hover:text-white"
                      onClick={() =>
                        handleProblemClick(problem._id, problem.problem_name)
                      }
                    >
                      {problem.problem_name}
                    </td>
                    <td
                      className="p-1"
                      onClick={() =>
                        handleProblemClick(problem._id, problem.problem_name)
                      }
                    >
                      <p className={`${getTagColor(problem.tag)} p-1`}>
                        {problem.tag}
                      </p>
                    </td>
                    <td
                      className="p-3"
                      onClick={() =>
                        handleProblemClick(problem._id, problem.problem_name)
                      }
                    >
                      {problem.topic_tags.join(", ")}
                    </td>
                    <td
                      className="p-3"
                      onClick={() =>
                        handleProblemClick(problem._id, problem.problem_name)
                      }
                    >
                      {getAcceptancePercentage(
                        problem.submission_count,
                        problem.accepted_count
                      )}
                    </td>
                    {isAdmin && (
                      <td className="p-3">
                        <button
                          onClick={() => {
                            handleDelete(problem._id);
                          }}
                          className="rounded-full bg-opacity-80 hover:opacity-50"
                        >
                          <DeleteIcon />
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default Problemset;
