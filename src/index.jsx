import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";

// Get stored chapter and verse data
const storedChapterAndVerse = localStorage.getItem('chapterAndVerse');
const defaultChapterAndVerse = { chapter: 1, verse: 1 };
const chapterAndVerseData = storedChapterAndVerse ? JSON.parse(storedChapterAndVerse) : defaultChapterAndVerse;

// Get stored settings data
const storedSettings = localStorage.getItem('gitaSettings');
const defaultSettings = {
  darkmode: true,
  english: true,
  hindi: true,
  sanskrit: true
};
const settingsData = storedSettings ? JSON.parse(storedSettings) : defaultSettings;

// Extract data
const { chapter, verse } = chapterAndVerseData;
const { darkmode, english, hindi, sanskrit } = settingsData;

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <div>
    <App 
      chapter={chapter} 
      verse={verse}
      initialDarkmode={darkmode}
      initialEnglish={english}
      initialHindi={hindi}
      initialSanskrit={sanskrit}
    />
  </div>
);
