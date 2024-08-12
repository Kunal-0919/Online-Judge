import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Signup from "./components/Signup";
import AddProblemPage from "./components/addProblem";
import Problemset from "./components/problemset";
import Dashboard from "./components/Dashboard";
import Userprofile from "./components/userProfile";
import ProblemDetail from "./components/ProblemDetail";
import Explore from "./components/Explore";
import Contest from "./components/Contest";
import ProtectedRoute from "./components/ProctectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<ProtectedRoute component={Dashboard} />} />
      <Route
        path="/addproblem"
        element={<ProtectedRoute component={AddProblemPage} />}
      />
      <Route
        path="/problemset"
        element={<ProtectedRoute component={Problemset} />}
      />
      <Route
        path="/profile"
        element={<ProtectedRoute component={Userprofile} />}
      />
      <Route path="/explore" element={<ProtectedRoute component={Explore} />} />
      <Route path="/contest" element={<ProtectedRoute component={Contest} />} />
      <Route
        path="/problem/:problemNameId"
        element={<ProtectedRoute component={ProblemDetail} />}
      />
    </Routes>
  );
}

export default App;
