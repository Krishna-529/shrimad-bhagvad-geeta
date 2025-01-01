import React,{useEffect, useState} from "react";
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

function HorizontalTab(props){
    const numberOfVerses = [47, 72, 43, 42, 29, 47, 30, 28, 34, 42, 55, 20, 35, 27, 20, 24, 28, 78];
    const [verse, setVerse] = useState(props.verse);
    const verses = [];
    const [chapter, setChapter] = useState(props.chapter);
    const customStyle = {
        fontWeight: "700",
    };
    function changeVerse(v){
    v = Number(v);
    setVerse(v);
    props.changeVerse(v);
    } 

    for(let i=1; i<=numberOfVerses[chapter-1]; i++){
        verses.push(
            <div className="verse-number" key={i} style={verse == i ? customStyle : {}}  onClick={() => changeVerse(i)}>
                <p>Shlok {i}</p>
            </div>
        )
    }

    return(
        <div className="horizontal-tab">
            <ChevronLeftRoundedIcon className="left-navigator" />
            <div className="horizontal-container">
                {verses}
            </div>
            <ChevronRightRoundedIcon className="right-navigator" />
        </div>
    )
}

export default HorizontalTab;