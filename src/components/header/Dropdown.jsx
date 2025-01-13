import React,{ useState, useEffect, useRef }  from "react";
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';


function Dropdown(props) {
  const [darkmode, setDarkmode] = useState(props.darkmode);
  const [english, setEnglish] = useState(props.english);
  const [hindi, setHindi] = useState(props.hindi);
  const [sanskrit, setSanskrit] = useState(props.sanskrit);
  function toggleTheme() {props.toggleTheme();}
  function toggleEnglish() {props.toggleEnglish();}
  function toggleSanskrit() {props.toggleSanskrit();}
  function toggleHindi() {props.toggleHindi();}
  const [isOpen, setIsOpen] = React.useState(false);
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

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <button
        aria-label="Setting"
        className="dropdown-toggle-button"
        onClick={handleDropdownToggle}
        aria-expanded={isOpen}
      >
        <SettingsRoundedIcon sx={{ fontSize: 'clamp(15px, 1.25vw, 32px)'}} />
      </button>
      <ul className={`dropdown-menu ${isOpen ? "show" : ""}`}>
        <li>
          <span>Theme - Dark Mode</span>
          <label className="toggle-switch">
            <input
              id="theme-checkbox"
              type="checkbox"
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
            checked={english}
            onChange={() => {
              if(!(hindi || sanskrit))  return;
              setEnglish(!english);
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
            checked={hindi}
            onChange={() => {
              if(!(english || sanskrit)) return;
              setHindi(!hindi);
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
            checked={sanskrit}
            onChange={() => {
              if(!(hindi || english)) return;
              setSanskrit(!sanskrit);
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

export default Dropdown;
