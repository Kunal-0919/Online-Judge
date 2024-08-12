import React, { useState, useEffect } from "react";
import Navbar from "./Navbar.jsx";
import Loading from "./Loading.jsx"; // Import the Loading component
import UserInfo from "./UserInfo.jsx";
import Statscard from "./StatsCard.jsx"; // Import the Statscard component

const Userprofile = () => {
  const [user, setUser] = useState({});
  const [problemCount, setProblemCount] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_BASE_URL}/userprofile/profile`,
        {
          method: "GET",
          credentials: "include", // Include credentials (cookies) in the request
        }
      );

      if (!response.ok) {
        // Handle HTTP errors
        if (response.status === 401) {
          throw new Error("Unauthorized: No or invalid token");
        }
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data);
      setProblemCount(data.problemStats);
      setUser(data.user); // Update state with fetched user data
    } catch (error) {
      console.error("Error fetching user profile:", error.message);
      setError(error.message); // Set error state
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Navbar backgroundcolor={true} />
      <div className="min-h-screen bg-priblack text-white p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <UserInfo user={user} />
          </div>
          <div className="flex-shrink-0 ml-4">
            <Statscard
              problemsCount={user.problems_solved_count}
              submissionCount={user.submission_count}
              problemStats={problemCount}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Userprofile;
