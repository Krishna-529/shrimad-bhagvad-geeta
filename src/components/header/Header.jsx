import React,{useState} from "react";
import Search from "./Search";
import About from "./About";
import Dropdown from "./Dropdown";

function Header(props){
    const [darkmode, setDarkmode] = useState(props.darkmode);
    const [english, setEnglish] = useState(props.english);
    const [hindi, setHindi] = useState(props.hindi);
    const [sanskrit, setSanskrit] = useState(props.sanskrit);

    function changeChapter(c) {props.changeChapter(c);}
    function changeVerse(v) {props.changeVerse(v);}
    function toggleTheme() {props.toggleTheme();}
    function toggleEnglish() {props.toggleEnglish();}
    function toggleSanskrit() {props.toggleSanskrit();}
    function toggleHindi() {props.toggleHindi();}

    return(
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
    )
}

export default Header;