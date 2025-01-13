import React, { useState, useEffect } from "react";
import axios from "axios";

function Shlok(props) {
    const [chapter, setChapter] = useState(Number(props.chapter));
    const [verse, setVerse] = useState(Number(props.verse));
    const [english, setEnglish] = useState(props.english);
    const [hindi, setHindi] = useState(props.hindi);
    const [sanskrit, setSanskrit] = useState(props.sanskrit);
    const [sanskritShlok, setSanskritShlok] = useState("");
    const [englishShlok, setEnglishShlok] = useState("");
    const [hindiShlok, setHindiShlok] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchShlok() {
            const ch = String(chapter);
            const sl = String(verse);

            try {
                const response = await axios.get(
                    `https://vedicscriptures.github.io/slok/${ch}/${sl}`
                );
                const obj = response.data;
                console.log(obj);
                

                setSanskritShlok(obj.slok || "No Sanskrit text available.");
                setEnglishShlok(obj.prabhu?.et || "No English translation available.");
                setHindiShlok(obj.rams?.ht || "No Hindi translation available.");
                setError(null);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("There is some problem with the internet or data fetching.");
            }
        }

        fetchShlok();
    }, [chapter, verse, english, hindi, sanskrit]);

    return (
        <div className="shlok">
            {error ? (
                <div className="error inner-content-div">{error}</div>
            ) : (
                <div className="inner-content-div">
                    {props.sanskrit && <div className="devnagiri sanskrit">{sanskritShlok}</div>}
                    {props.english && <div className="english">{englishShlok}</div>}
                    {props.hindi && <div className="devnagiri hindi">{hindiShlok}</div>}
                </div>
            )}
        </div>
    );
}

export default Shlok;
