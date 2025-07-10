import React from "react";
import "./NavBar.css";
import { STRINGS } from "../utilis/string";
import { handleSearchInputChange } from "../utilis/functions"; // ✅ import it

interface NavbarProps {
  isModalOpen: boolean;
  onSearchChange: (search: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ isModalOpen, onSearchChange }) => {
  if (isModalOpen) return null;

  return (
    <nav className="top-navbar">
      <div className="navbar-left">
        <h2>{STRINGS.APP_TITLE}</h2>
      </div>

      <div className="navbar-right">
        <div className="search-wrapper">
          <input
            type="text"
            placeholder={STRINGS.SEARCH_PLACEHOLDER}
            className="search-input"
            onChange={(e) => handleSearchInputChange(e, onSearchChange)} // ✅ uses centralized handler
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
