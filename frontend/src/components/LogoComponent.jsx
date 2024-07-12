// LogoComponent.js
import React from "react";
import PropTypes from "prop-types";
import AlgoChefLogo from "../public/algochefLogo.png";

const LogoComponent = ({ height, width, rounded }) => {
  const className = rounded ? "rounded-full" : "";

  return (
    <img
      src={AlgoChefLogo}
      alt="AlgoChef Logo"
      style={{ height, width }}
      className={className}
    />
  );
};

LogoComponent.propTypes = {
  height: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  rounded: PropTypes.bool.isRequired,
};

export default LogoComponent;
