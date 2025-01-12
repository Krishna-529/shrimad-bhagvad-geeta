import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";

const storedData = localStorage.getItem('chapterAndVerse');
const defaultData = { chapter: 1, verse: 1 };

const data = storedData ? JSON.parse(storedData) : defaultData;
const chapter = data.chapter;
const verse = data.verse;

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <div>
    <App chapter={chapter} verse={verse} />
  </div>
);
