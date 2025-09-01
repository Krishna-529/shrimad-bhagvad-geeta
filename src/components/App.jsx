import React, { useState, useEffect } from "react";
import Header from "./header/Header";
import HorizontalTab from "./horizontalTab/HorizontalTab";
import VerticalTab from "./verticalTab/VerticalTab";
import Content from "./content/Content";
import Footer from "./footer/Footer";

function App(props) {
    // Get stored settings or use defaults
    const getStoredSettings = () => {
        const stored = localStorage.getItem('gitaSettings');
        if (stored) {
            return JSON.parse(stored);
        }
        return {
            darkmode: props.initialDarkmode || false,
            english: props.initialEnglish !== undefined ? props.initialEnglish : true,
            hindi: props.initialHindi !== undefined ? props.initialHindi : true,
            sanskrit: props.initialSanskrit !== undefined ? props.initialSanskrit : true
        };
    };

    const storedSettings = getStoredSettings();

    // State management
    const [tabOpen, setTabOpen] = useState(true);
    const [chapter, setChapter] = useState(Number(props.chapter));
    const [verse, setVerse] = useState(Number(props.verse));
    const [darkmode, setDarkmode] = useState(storedSettings.darkmode);
    const [english, setEnglish] = useState(storedSettings.english);
    const [hindi, setHindi] = useState(storedSettings.hindi);
    const [sanskrit, setSanskrit] = useState(storedSettings.sanskrit);
    const [customKey1, setCustomKey1] = useState(chapter + "/" + verse);
    const [customKey2, setCustomKey2] = useState(chapter + "-" + verse);

    const numberOfVerses = [47, 72, 43, 42, 29, 47, 30, 28, 34, 42, 55, 20, 35, 27, 20, 24, 28, 78];

    // Save settings to localStorage whenever they change
    useEffect(() => {
        const settingsData = {
            darkmode,
            english,
            hindi,
            sanskrit
        };
        localStorage.setItem('gitaSettings', JSON.stringify(settingsData));
    }, [darkmode, english, hindi, sanskrit]);

    // Apply dark mode class to document body
    useEffect(() => {
        if (darkmode) {
            document.body.classList.add('dark');
            document.documentElement.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
            document.documentElement.classList.remove('dark');
        }
    }, [darkmode]);

    function changeKey(chapter, verse) {
        setCustomKey1(chapter + "/" + verse);
        setCustomKey2(chapter + "-" + verse);
        localStorage.setItem('chapterAndVerse', JSON.stringify({ chapter: chapter, verse: verse }));
    }

    function changeChapter(c) {
        let chap = Number(c);
        if (chap > 0 && chap < 19 && chap != chapter) {
            setChapter(chap);
            setVerse(1);
            changeKey(chap, 1); // Fixed: should be 1, not verse
        }
    }

    function changeVerse(v) {
        let vers = Number(v);
        if (vers != verse && vers > 0 && vers <= numberOfVerses[chapter - 1]) {
            setVerse(vers);
            changeKey(chapter, vers);
        }
    }

    function toggleTheme() {
        setDarkmode(prevDarkmode => !prevDarkmode);
    }

    function toggleEnglish() {
        // Prevent turning off if it's the only language enabled
        if (!english && !hindi && !sanskrit) return;
        setEnglish(prevEnglish => !prevEnglish);
    }

    function toggleSanskrit() {
        // Prevent turning off if it's the only language enabled
        if (!sanskrit && !hindi && !english) return;
        setSanskrit(prevSanskrit => !prevSanskrit);
    }

    function toggleHindi() {
        // Prevent turning off if it's the only language enabled
        if (!hindi && !english && !sanskrit) return;
        setHindi(prevHindi => !prevHindi);
    }

    function toggleTabOpen() {
        setTabOpen(!tabOpen);
    }

    let themeClass;
    if (darkmode) themeClass = "dark";
    else themeClass = "light";

    return (
        <div className={`app ${themeClass}`}>
            <Header
                changeChapter={changeChapter}
                changeVerse={changeVerse}
                darkmode={darkmode}
                toggleTheme={toggleTheme}
                sanskrit={sanskrit}
                english={english}
                hindi={hindi}
                toggleEnglish={toggleEnglish}
                toggleHindi={toggleHindi}
                toggleSanskrit={toggleSanskrit}
                numberOfVerses={numberOfVerses}
                chapter={chapter}
                verse={verse}
            />
            <HorizontalTab
                key={customKey1}
                chapter={chapter}
                verse={verse}
                changeVerse={changeVerse}
                numberOfVerses={numberOfVerses}
            />
            <div className="container">
                <Content
                    key={`${chapter}/${verse}`}
                    chapter={chapter}
                    verse={verse}
                    changeVerse={changeVerse}
                    sanskrit={sanskrit}
                    english={english}
                    hindi={hindi}
                />
            </div>
            <VerticalTab
                key={customKey2}
                chapter={chapter}
                tabOpen={tabOpen}
                toggleTabOpen={toggleTabOpen}
                setTabOpen={setTabOpen}
                changeChapter={changeChapter}
            />
            <Footer />
        </div>
    );
}

export default App;