import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Navbar from "./Navbar";
import LogoComponent from "./LogoComponent";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
        credentials: "include",
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || "Login failed");
        return;
      }

      const data = await response.json();
      setSuccessMessage(data.message);
      setEmail("");
      setPassword("");
      navigate("/"); // Redirect to the dashboard after successful login
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Internal Server Error. Please try again later.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-white font-serif">
        <div className="relative z-10 w-full max-w-md mx-4 md:mx-auto p-8 transition duration-300 bg-primary shadow-xl rounded-lg text-center hover:shadow-2xl hover:shadow-black">
          <div className="flex justify-center mb-1">
            <LogoComponent height="90px" width="90px" rounded={true} />
          </div>
          <h1 className="text-5xl text-black mb-4 text-center">AlgoChef</h1>
          <h2 className="text-4xl text-black mb-4 text-center">Login</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {successMessage && (
            <p className="text-green-500 mb-4">{successMessage}</p>
          )}
          <input
            type="string"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            id="email"
            className="font-sans block p-2 border border-gray-300 rounded mb-4 w-full"
            placeholder="Username or Email"
            required={true}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            id="password"
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
    </>
  );
}

export default Login;
