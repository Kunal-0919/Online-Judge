import { Routes, Route, Link } from "react-router-dom";
import Login from "./components/login";
import Signup from "./components/Signup";
function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
