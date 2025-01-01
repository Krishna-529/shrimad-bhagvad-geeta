import React, { useState } from "react";
import axios from 'axios';

function Shlok(props){
    const [chapter, setChapter] = useState(Number(props.chapter))
    const [verse, setVerse] = useState(Number(props.verse))

    async function getShlok(chapter, verse) {
        const ch = String(chapter);
        const sl = String(verse);
        try {
            const response = await axios.get('https://vedicscriptures.github.io/slok/'+ch+'/'+sl);
            console.log(response.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
    } 
    return(
        <div className="shlok">
            {/* {getShlok} */}
        </div>
    )
}

export default Shlok;