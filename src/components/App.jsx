import React,{useState} from "react";
import Header from "./header/Header";
import HorizontalTab from "./horizontalTab/HorizontalTab";
import VerticalTab from "./verticalTab/VerticalTab";
import Content from "./content/Content";
import Footer from "./footer/Footer";

function App(props){
    const [tabOpen, setTabOpen] = useState(true);
    const [chapter, setChapter] = useState(Number(props.chapter));
    const [verse, setVerse] = useState(Number(props.verse));
    const [darkmode, setDarkmode] = useState(false);
    const [english, setEnglish] = useState(true);
    const [hindi, setHindi] = useState(true);
    const [sanskrit, setSanskrit] = useState(true);
    const [customKey1, setCustomKey1] = useState(chapter+"/"+verse)
    const [customKey2, setCustomKey2] = useState(chapter+"-"+verse)
    function changeKey(chapter, verse){
        setCustomKey1(chapter+"/"+verse)
        setCustomKey2(chapter+"-"+verse)
        localStorage.setItem('chapterAndVerse', JSON.stringify({ chapter: chapter, verse: verse }))
    }

    const numberOfVerses = [47, 72, 43, 42, 29, 47, 30, 28, 34, 42, 55, 20, 35, 27, 20, 24, 28, 78];

    function changeChapter(c){
        let chap = Number(c);
        if(chap>0 && chap<19 && chap!=chapter){
            setChapter(chap);
            setVerse(1);
            changeKey(chap, verse);
        }
    }

    function changeVerse(v){
        let vers = Number(v);
        if(vers!=verse){
            setVerse(vers);
            changeKey(chapter, vers);
        }
    }

    function toggleTheme()
    {
        setDarkmode(!darkmode);
    }

    function toggleEnglish(){
        setEnglish(!english);
    }

    function toggleSanskrit(){
        setSanskrit(!sanskrit);
    }

    function toggleHindi(){
        setHindi(!hindi);
    }

    function toggleTabOpen(){
        setTabOpen(!tabOpen);
    }

    let themeClass;
    if(darkmode)    themeClass = "dark";
    else    themeClass = "light";

    return(
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
            />
        <HorizontalTab 
                key={customKey1}
                chapter={chapter} 
                verse={verse}
                changeVerse={changeVerse}
            />
        <div className="container">
            <VerticalTab
                key={customKey2}
                chapter={chapter}
                tabOpen={tabOpen}
                toggleTabOpen={toggleTabOpen}
                setTabOpen={setTabOpen}
                changeChapter={changeChapter}
            />
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
        <Footer />
    </div>
    )
}

export default App;