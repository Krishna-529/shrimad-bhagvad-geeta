import React from "react";
import Search from "./Search";
import About from "./About";
import Dropdown from "./Dropdown";

function Header(props) {
    // Remove local state - use props directly
    const { 
        darkmode, 
        english, 
        hindi, 
        sanskrit,
        changeChapter,
        changeVerse,
        toggleTheme,
        toggleEnglish,
        toggleHindi,
        toggleSanskrit
    } = props;

    return (
        <div className="header">
            <div className="logo"><div>Geeta</div></div>
            <About />
            <Search 
                changeChapter={changeChapter}
                changeVerse={changeVerse}
            />
            <Dropdown
                hindi={hindi}
                english={english}
                sanskrit={sanskrit}
                darkmode={darkmode}
                toggleTheme={toggleTheme}
                toggleEnglish={toggleEnglish}
                toggleHindi={toggleHindi}
                toggleSanskrit={toggleSanskrit}
            />
        </div>        
    );
}

export default Header;