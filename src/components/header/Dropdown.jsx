import React, { useState, useEffect, useRef } from "react";
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';

function Dropdown(props) {
  // Use props directly instead of local state
  const { darkmode, english, hindi, sanskrit, toggleTheme, toggleEnglish, toggleHindi, toggleSanskrit } = props;
  
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Debug log to check if props are being received correctly
  console.log('Dropdown props:', { darkmode, english, hindi, sanskrit });

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <button
        className="dropdown-toggle-button"
        onClick={handleDropdownToggle}
        aria-expanded={isOpen}
      >
        <SettingsRoundedIcon sx={{ fontSize: 'clamp(15px, 1.25vw, 32px)' }} />
      </button>
      <ul className={`dropdown-menu ${isOpen ? "show" : ""}`}>
        <li>
          <span>Theme - Dark Mode</span>
          <label className="toggle-switch">
            <input
              id="theme-checkbox"
              type="checkbox"
              checked={Boolean(darkmode)}
              onChange={toggleTheme}
              aria-label="Toggle dark mode"
            />
            <span className="slider-checkbox"></span>
          </label>
        </li>
        <li>
          <span>Language - English</span>
          <label className="toggle-switch">
            <input
              id="english-checkbox"
              type="checkbox"
              checked={Boolean(english)}
              onChange={() => {
                if (!(hindi || sanskrit)) return;
                toggleEnglish();
              }}
              aria-label="Toggle English"
            />
            <span className="slider-checkbox"></span>
          </label>
        </li>
        <li>
          <span>Language - Hindi</span>
          <label className="toggle-switch">
            <input
              id="hindi-checkbox"
              type="checkbox"
              checked={Boolean(hindi)}
              onChange={() => {
                if (!(english || sanskrit)) return;
                toggleHindi();
              }}
              aria-label="Toggle Hindi"
            />
            <span className="slider-checkbox"></span>
          </label>
        </li>
        <li>
          <span>Language - Sanskrit</span>
          <label className="toggle-switch">
            <input
              id="sanskrit-checkbox"
              type="checkbox"
              checked={Boolean(sanskrit)}
              onChange={() => {
                if (!(hindi || english)) return;
                toggleSanskrit();
              }}
              aria-label="Toggle Sanskrit"
            />
            <span className="slider-checkbox"></span>
          </label>
        </li>
      </ul>
    </div>
  );
}

// export default Dropdown;

export default Dropdown;