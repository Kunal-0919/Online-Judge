import React, { useState, useEffect } from "react";

const Navbar = ({ text }) => {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed shadow-sm shadow-slate-300 rounded-md bg-primary top-0 left-0 w-full transition-transform duration-300 z-20 ${
        scrolled ? "transform translate-y-1 shadow-md bg-white" : ""
      }`}
    >
      <div className="container mx-auto py-4 px-6">
        <h1 className="text-xl font-bold">{text}</h1>
      </div>
    </nav>
  );
};

export default Navbar;
