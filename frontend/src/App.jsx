import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import AddProblemPage from "./components/AddProblem.jsx";
import Problemset from "./components/Problemset.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Userprofile from "./components/UserProfile.jsx";
import ProblemDetail from "./components/ProblemDetail.jsx";
import Explore from "./components/Explore.jsx";
import Contest from "./components/Contest.jsx";
import ProtectedRoute from "./components/ProctectedRoute.jsx";

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
