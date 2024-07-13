import { useState } from "react";
import LogoComponent from "./LogoComponent";
import Img from "../public/backgroundImg.jpg";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSignup = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_BASE_URL}/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstname: firstName,
            lastname: lastName,
            email: email,
            password: password,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage(data.message);
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
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url("/backgroundImg.jpg")` }}
    >
      <div className="relative z-10 w-full max-w-md mx-4 md:mx-auto p-8 bg-white shadow-lg rounded-lg text-center">
        <div className="flex justify-center mb-1">
          <LogoComponent height="100px" width="100px" rounded={true} />
        </div>
        <h1 className="text-5xl text-black font-bold mb-4">Algo Chef</h1>
        <h2 className="text-4xl text-black font-bold mb-4">Create Account</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {successMessage && (
          <p className="text-green-500 mb-4">{successMessage}</p>
        )}
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          name="userFirstName"
          id="userFirstName"
          className="block p-2 border border-gray-300 rounded mb-4 w-full"
          placeholder="First Name"
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          name="userLastName"
          id="userLastName"
          className="block p-2 border border-gray-300 rounded mb-4 w-full"
          placeholder="Last Name"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="userEmail"
          id="userEmail"
          className="block p-2 border border-gray-300 rounded mb-4 w-full"
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="userPass"
          id="userPass"
          className="block p-2 border border-gray-300 rounded mb-4 w-full"
          placeholder="Password"
        />

        <button
          onClick={handleSignup}
          className="w-full bg-black text-white p-2 rounded-lg transition duration-1000 ease-in-out hover:bg-white hover:text-black border-2 border-black font-extrabold hover:rounded-full"
        >
          Create Account
        </button>
      </div>
    </div>
  );
}

export default Signup;
