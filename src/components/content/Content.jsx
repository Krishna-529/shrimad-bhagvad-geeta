import React,{useState} from "react";
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import Shlok from "./Shlok";

function Content(props){
    const numberOfVerses = [47, 72, 43, 42, 29, 47, 30, 28, 34, 42, 55, 20, 35, 27, 20, 24, 28, 78];
    const [chapter, setChapter] = useState(Number(props.chapter))
    const [verse, setVerse] = useState(Number(props.verse))
    function changeVerse(v){
        const ve = v;
        setVerse(ve);
        props.changeVerse(ve);
    }
    function moveRight(){
        changeVerse(verse+1)
    }
    function moveLeft(){
        changeVerse(verse-1)
    }
    function toShowLeft(){
        if(verse != 1){
            return(
                <div className="left-slide navigate" onClick={moveLeft}>
                    <ChevronLeftRoundedIcon className="navigate-button" />
                </div>
            )
        }
    }
    function toShowRight(){
        if(verse != numberOfVerses[chapter-1]){
            return(
                <div className="right-slide navigate" onClick={moveRight}>
                    <ChevronRightRoundedIcon className="navigate-button" />
                </div>
            )
        }
    }

    return(
        <div className="content">
            <div className="content-box">
                {toShowLeft()}
                <div className="inner-content">
                    <Shlok
                        chapter={chapter}
                        verse={verse}
                        sanskrit={props.sanskrit}
                        english={props.english}
                        hindi={props.hindi}
                    />
                </div>
                {toShowRight()}
            </div>
        </div>
    )
}

export default Content;