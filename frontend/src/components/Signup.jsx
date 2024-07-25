import { useState } from "react";
import LogoComponent from "./LogoComponent";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

function Signup() {
  const [username, setUsername] = useState(""); // Added state for username
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSignup = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_BASE_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username, // Added username field
            firstname: firstName,
            lastname: lastName,
            email: email,
            password: password,
          }),
          credentials: "include",
        }
      );

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage(data.message);
        setUsername(""); // Clear username field
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      setError("Internal Server Error. Please try again later.");
    }
  };

  return (
    <>
      <Navbar backgroundcolor={false} />
      <div className="font-serif flex items-center justify-center min-h-screen bg-cover bg-center">
        <div className="relative z-10 w-full max-w-md mx-4 md:mx-auto p-8 transition duration-300 bg-white shadow-xl hover:shadow-black rounded-lg text-center hover:shadow-2xl">
          <div className="flex justify-center mb-1">
            <LogoComponent height="90px" width="90px" rounded={true} />
          </div>
          <h1 className="text-5xl text-black mb-4">AlgoChef</h1>
          <h2 className="text-4xl text-black mb-4">Create Account</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {successMessage && (
            <p className="text-green-500 mb-4">{successMessage}</p>
          )}
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            name="username"
            id="username"
            className="font-sans block p-2 border border-gray-300 rounded mb-4 w-full"
            placeholder="Username"
            required={true}
          />
          <div className="flex mb-4">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              name="firstname"
              id="firstname"
              className="font-sans block p-2 border border-gray-300 rounded mb-4 mr-2 w-full"
              placeholder="First Name"
              required={true}
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              name="lastname"
              id="lastname"
              className="font-sans block p-2 border border-gray-300 rounded mb-4 ml-2 w-full"
              placeholder="Last Name"
              required={true}
            />
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            id="email"
            className="font-sans block p-2 border border-gray-300 rounded mb-4 w-full"
            placeholder="Email"
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
          <button
            onClick={handleSignup}
            className="font-sans font-bold w-full bg-yellow-400 my-5 text-black border-2 border-black p-2 rounded-lg transition duration-200 hover:rounded-full ease-in-out hover:shadow-lg hover:shadow-black"
          >
            Create Account
          </button>

          <Link to="/login" className="underline text-black font-sans">
            Already have an account?
          </Link>
        </div>
      </div>
    </>
  );
}

export default Signup;
