import { Routes, Route, Link } from "react-router-dom";
import Login from "./components/login";
import Signup from "./components/Signup";
import AddProblemPage from "./components/addProblem";
import Problemset from "./components/problemset";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Userprofile from "./components/userProfile";
import ProblemDetail from "./components/ProblemDetail";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/addproblem" element={<AddProblemPage />} />
        <Route path="/problemset" element={<Problemset />} />
        <Route path="/profile" element={<Userprofile />} />
        <Route path="/problem/:problemNameId" element={<ProblemDetail />} />
      </Routes>
    </>
  );
}

export default App;
