import React, { useState, useRef } from "react";
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { ViewWeekSharp } from "@mui/icons-material";

function HorizontalTab(props) {
    const numberOfVerses = [47, 72, 43, 42, 29, 47, 30, 28, 34, 42, 55, 20, 35, 27, 20, 24, 28, 78];
    const [verse, setVerse] = useState(props.verse);
    const [chapter, setChapter] = useState(props.chapter);
    const containerRef = useRef(null); // Reference for the scrollable container

    const customStyle = {
        fontWeight: "700",
    };

    const scrollContainer = (direction) => {
        const container = containerRef.current;
        const scrollAmount = window.innerWidth * 0.75; // Amount to scroll in pixels
        if (container) {
            container.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth", // Smooth scrolling effect
            });
        }
    };

    const changeVerse = (v) => {
        setVerse(Number(v));
        props.changeVerse(Number(v));
    };

    const verses = Array.from({ length: numberOfVerses[chapter - 1] }, (_, i) => (
        <div
            className="verse-number"
            key={i + 1}
            style={verse === i + 1 ? customStyle : {}}
            onClick={() => changeVerse(i + 1)}
        >
            <p>Shlok {i + 1}</p>
        </div>
    ));

    return (
        <div className="horizontal-tab">
            <ChevronLeftRoundedIcon
                className="left-navigator"
                onClick={() => scrollContainer("left")}
            />
            <div className="horizontal-container" ref={containerRef}>
                {verses}
            </div>
            <ChevronRightRoundedIcon
                className="right-navigator"
                onClick={() => scrollContainer("right")}
            />
        </div>
    );
}

export default HorizontalTab;
