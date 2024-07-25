// UserInfo.jsx
import React from "react";

const UserInfo = ({ user, className }) => {
  return (
    <div
      className={`bg-secblack m-5 text-lctxt p-6 rounded-lg shadow-md max-w-xs ${className}`}
    >
      {/* User Info Display */}
      <h2 className="text-xl font-bold mb-2">{user.firstname}</h2>
      <h2 className="mb-3">{user.username}</h2>
      <p className="mb-2">{user.bio || "N/A"}</p>
      <p className="mb-2">{user.email}</p>
      <p className="mb-2">{user.role}</p>
      <p className="mb-2">{user.gender || "N/A"}</p>
      <p className="mb-2">
        {user.birthday ? new Date(user.birthday).toLocaleDateString() : "N/A"}
      </p>
      <p className="mb-2">
        <strong>Organization:</strong> {user.organization || "N/A"}
      </p>
      <p className="mb-2">
        {user.github ? (
          <a href={user.github} target="_blank" rel="noopener noreferrer">
            Github
          </a>
        ) : (
          "N/A"
        )}
      </p>
      <p className="mb-2">
        {user.linkedin ? (
          <a href={user.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        ) : (
          "N/A"
        )}
      </p>
      <p className="mb-2">
        <strong>Submission Count:</strong> {user.submission_count || 0}
      </p>
      <p className="mb-2">
        <strong>Problems Solved Count:</strong>{" "}
        {user.problems_solved_count || 0}
      </p>
    </div>
  );
};

export default UserInfo;
