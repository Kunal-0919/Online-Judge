import { useState } from "react";
import LogoComponent from "./LogoComponent";
import { Link } from "react-router-dom";

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
    <div
      className="flex items-center justify-center min-h-screen bg-primary font-serif"
      style={{
        backgroundImage: `url('https://images.unsplash.com/flagged/photo-1593005510329-8a4035a7238f?ixlib=rb-4.0.3')`,
      }}
    >
      <div className="relative z-10 w-full max-w-md mx-4 md:mx-auto p-8 transition duration-300 bg-primary shadow-xl rounded-lg text-center hover:shadow-2xl">
        <div className="flex justify-center mb-1">
          <LogoComponent height="80px" width="80px" rounded={true} />
        </div>
        <h1 className="text-5xl text-black mb-4 text-center">AlgoChef</h1>
        <h2 className="text-4xl text-black mb-4 text-center">Login</h2>
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
          className="font-sans block p-2 border border-gray-300 rounded mb-4 w-full"
          placeholder="Email"
          required={true}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="userPass"
          id="userPass"
          className="font-sans block p-2 border border-gray-300 rounded mb-4 w-full"
          placeholder="Password"
          required={true}
        />
        <div className="flex flex-row">
          <button
            onClick={handleLogin}
            className="font-sans font-bold w-full border-2 p-2 bg-yellow-400 border-black text-black rounded-lg transition duration-200 hover:rounded-full ease-in-out m-3 hover:shadow-lg hover:shadow-black"
          >
            Login
          </button>

          <button
            // onClick={}
            className="font-sans font-bold w-full border-2 p-2 border-black text-black rounded-lg transition duration-200 hover:rounded-full ease-out m-3 hover:shadow-lg hover:shadow-black"
          >
            Forgot Password
          </button>
        </div>
        <div className="flex justify-center mt-4">
          <Link to="/signup" className="text-center underline text-blue-600">
            Don't have an account? Register Here.
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
