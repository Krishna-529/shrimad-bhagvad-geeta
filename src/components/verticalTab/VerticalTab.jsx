import React,{useState} from "react";
import Slider from "./Slider";
import Chapters from "./Chapters";
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

function VerticalTab(props){
    const [chapter, setChapter] = useState(props.chapter);
    const [tabOpen, setTabOpen] = useState(props.tabOpen);
    function changeChapter(c){
        setChapter(c);
        props.changeChapter(c);
    }
    function toggleTabOpen(){
        const curStatus = tabOpen;
        setTabOpen(!curStatus);
        props.setTabOpen(!curStatus)
    }
    function showChaptersList(){
        if(tabOpen){
            return(
                <Chapters 
                    chapter={chapter}
                    changeChapter={changeChapter}
                />
            )
        }
    }

    const  customStyleTabClosed= {flex: "0 0 48px"}
    const customClass = "slider-open-" + String(tabOpen);
    const customStyleTabOpen  = {flex: "0 0 188px"}

    return(
        <div className={`vertical-tab ${customClass}`} >
            {showChaptersList()}
            <Slider />
            <div className={`slider-button`} onClick={toggleTabOpen}>
                {props.tabOpen ? <ChevronLeftRoundedIcon /> : <ChevronRightRoundedIcon />}
            </div>
        </div>
    )
}

export default VerticalTab;