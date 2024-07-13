import { useState } from "react";
import LogoComponent from "./LogoComponent";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const apiUrl = import.meta.env.REACT_APP_API_BASE_URL;

  const handleLogin = async () => {
    try {
      const response = await fetch(`http://localhost:8000/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message);
        // Optionally, you might want to store the token in localStorage or sessionStorage for future requests
        // localStorage.setItem("token", data.token);
        setEmail("");
        setPassword("");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Internal Server Error. Please try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative z-10 w-full max-w-md mx-4 md:mx-auto p-8 bg-gray-100 shadow-lg rounded-lg font-sans">
        <div className="flex justify-center mb-1">
          <LogoComponent height="80px" width="80px" rounded={true} />
        </div>
        <h1 className="text-5xl text-black mb-4 text-center font-extrabold">
          AlgoChef
        </h1>
        <h2 className="text-4xl text-black font-extrabold mb-4 text-center">
          Login
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {successMessage && (
          <p className="text-green-500 mb-4">{successMessage}</p>
        )}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="userEmail"
          id="userEmail"
          className="block p-2 border border-gray-300 rounded mb-4 w-full font-extrabold"
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="userPass"
          id="userPass"
          className="block p-2 border border-gray-300 rounded mb-4 w-full font-extrabold"
          placeholder="Password"
        />
        <div className="flex flex-row">
          <button
            onClick={handleLogin}
            className="w-full border-2 bg-black border-black font-extrabold text-white p-2 rounded-lg transition duration-1000 ease-in-out m-3 hover:rounded-full"
          >
            Login
          </button>
          <button
            // onClick={}
            className="w-full border-2 border-black font-extrabold text-black p-2 rounded-lg transition duration-1000 ease-in-out m-3 hover:rounded-full"
          >
            Forgot Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
