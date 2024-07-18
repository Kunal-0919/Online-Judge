import { useEffect, useState } from "react";
import Navbar from "../components/navbar.jsx";
import Cookies from "js-cookie"; // Import js-cookie library

const Problemset = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterTag, setFilterTag] = useState("");
  const [filterTopic, setFilterTopic] = useState("");
  const [search, setSearch] = useState("");
  const [isAdmin, setIsAdmin] = useState(false); // State to check admin status

  const fetchProblems = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_BASE_URL}/problem/problems`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch problems");
      }
      const data = await response.json();
      // Sort problems by created_at
      const sortedProblems = data.problems.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setProblems(sortedProblems);
    } catch (error) {
      setError("Error fetching problems");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProblems();
    // Check if the user is an admin
    const role = Cookies.get("role"); // Adjust based on how admin status is stored
    console.log("User Role from Cookie:", role); // Log the role
    const adminStatus = role === "admin";
    setIsAdmin(adminStatus);
    console.log("Is Admin:", adminStatus); // Log the admin status
  }, []);

  const handleDelete = async (problemId) => {
    if (window.confirm("Are you sure you want to delete this problem?")) {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_APP_API_BASE_URL
          }/problem/problems/${problemId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
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
        return "text-green-400 bg-green-800";
      case "medium":
        return "text-yellow-400 bg-yellow-800";
      case "hard":
        return "text-red-400 bg-red-800";
      default:
        return "text-zinc-300 bg-zinc-800";
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
    <div className="min-h-screen bg-zinc-900 text-zinc-100 p-4">
      <Navbar text="Problemset" />
      <h1 className="text-3xl font-bold mb-4">Problems Dashboard</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-400">{error}</p>
      ) : (
        <div>
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
          <table className="min-w-full bg-zinc-800 border border-zinc-700 rounded-lg">
            <thead>
              <tr className="bg-zinc-700 text-left">
                <th className="p-2 border-b">No.</th>
                <th className="p-2 border-b">Name</th>
                <th className="p-2 border-b">Tag</th>
                <th className="p-2 border-b">Topic Tags</th>
                <th className="p-2 border-b">Acceptance Percentage</th>
                {isAdmin && <th className="p-2 border-b">Actions</th>}{" "}
                {/* Show Actions column for admins */}
              </tr>
            </thead>
            <tbody>
              {filteredProblems.map((problem, index) => (
                <tr key={problem._id}>
                  <td className="p-2 border-b">{index + 1}</td>
                  <td className="p-2 border-b">{problem.problem_name}</td>
                  <td className={`p-2 border-b ${getTagColor(problem.tag)}`}>
                    {problem.tag}
                  </td>
                  <td className="p-2 border-b">
                    {problem.topic_tags.join(", ")}
                  </td>
                  <td className="p-2 border-b">
                    {getAcceptancePercentage(
                      problem.submission_count,
                      problem.acceptance_count
                    )}
                  </td>
                  {isAdmin && (
                    <td className="p-2 border-b">
                      <button
                        onClick={() => handleDelete(problem._id)}
                        className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                      >
                        Delete
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
  );
};

export default Problemset;
