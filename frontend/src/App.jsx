import { Routes, Route, Link } from "react-router-dom";
import Login from "./components/login";
import Signup from "./components/Signup";
import AddProblemPage from "./components/addProblem";
import Problemset from "./components/problemset";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/addproblem" element={<AddProblemPage />} />
        <Route path="/problemset" element={<Problemset />} />
      </Routes>
    </>
  );
}

export default App;
