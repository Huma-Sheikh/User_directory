import React from "react";
import "./NavBar.css";

interface NavbarProps {
  isModalOpen: boolean;
  onSearchChange: (search: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ isModalOpen, onSearchChange }) => {
  if (isModalOpen) return null;

  return (
    <nav className="top-navbar">
      <div className="navbar-left">
        <h2>🧾User Directory</h2>
      </div>

      <div className="navbar-right">
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Search by Role"
            className="search-input"
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
