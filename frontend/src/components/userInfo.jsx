import React from "react";
import EmailIcon from "@mui/icons-material/Email";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";

const UserInfo = ({ user }) => {
  return (
    <div className="bg-secblack text-lctxt p-6 rounded-lg shadow-md max-w-xs m-5">
      {user.email && (
        <>
          <h2 className="text-xl font-bold text-white my-4">
            {user.firstname} {user.lastname}
          </h2>
          {user.bio ? (
            <p className="mb-2">{user.bio}</p>
          ) : (
            <p className="hidden">N/A</p>
          )}
          {/* <button
            className="bg-green-500 bg-opacity-20 h-9 mb-5 w-full text-green-600 rounded transition duration-500 hover:bg-opacity-30"
            onClick={() => {
              // route to the page that will help us edit the user Info, we'll only pass the values like
              //  github and nothing more like problem count and more
            }}
          >
            Edit Profile
          </button> */}
          {user.email && (
            <p className="mb-4">
              <span className="mr-2">
                <EmailIcon />
              </span>
              {user.email}
            </p>
          )}
          {user.role && (
            <p className="mb-4">
              <span className="mr-2">
                <AdminPanelSettingsIcon />
              </span>
              {user.role}
            </p>
          )}
          {user.organization ? (
            <p className="mb-4">
              <span className="mr-2">
                <CorporateFareIcon />
              </span>
              {user.organization || <span className="hidden">N/A</span>}
            </p>
          ) : (
            <span className="hidden">N/A</span>
          )}
          <p className="mb-4">
            {user.github ? (
              <a href={user.github} target="_blank" rel="noopener noreferrer">
                <span className="mr-2">
                  <GitHubIcon />
                </span>
                Github
              </a>
            ) : (
              <span className="hidden">N/A</span>
            )}
          </p>
          <p className="mb-4">
            {user.linkedin ? (
              <a href={user.linkedin} target="_blank" rel="noopener noreferrer">
                <span className="mr-2">
                  <LinkedInIcon />
                </span>
                LinkedIn
              </a>
            ) : (
              <span className="hidden">N/A</span>
            )}
          </p>
        </>
      )}
    </div>
  );
};

export default UserInfo;
