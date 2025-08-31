import React, { useState } from "react";

function Chapters(props) {
  const [chapter, setChapter] = useState(props.chapter);

  function changeChapter(c) {
    setChapter(c);
    props.changeChapter(c);
  }

  const customStyle = { fontWeight: "700" };

  const chapterList = [];
  for (let i = 1; i <= 18; i++) {
    chapterList.push(
      <div
        className={
          chapter === i
            ? "current-chapter chapter-class"
            : "chapter-number chapter-class"
        }
        style={chapter === i ? customStyle : {}}
        onClick={() => changeChapter(i)}
        key={i}
      >
        Chapter {i}
      </div>
    );
  }

  return (
    <div className="chapter-container">{chapterList}</div>
  )
}

export default Chapters;
