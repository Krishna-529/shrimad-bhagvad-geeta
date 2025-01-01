import React,{useState} from "react";
import Search from "./Search";

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
            <div className="logo">Geeta</div>
            {/* <div className="about"><div>About</div></div>
            <Search /> */}
        </div>
    )
}

export default Header;