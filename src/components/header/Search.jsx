import React, { useState, useEffect } from 'react';

const numberOfVerses = [47, 72, 43, 42, 29, 47, 30, 28, 34, 42, 55, 20, 35, 27, 20, 24, 28, 78];

function Search({ changeChapter, changeVerse }) {
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedVerse, setSelectedVerse] = useState(null);
  const [maxVerse, setMaxVerse] = useState(0);

  useEffect(() => {
    if (selectedChapter !== null) {
      setMaxVerse(numberOfVerses[selectedChapter - 1]);
      setSelectedVerse(null);
    }
  }, [selectedChapter]);

  const handleSearch = () => {
    if (selectedChapter !== null && selectedVerse !== null) {
      changeChapter(selectedChapter);
      changeVerse(selectedVerse);
      setSelectedChapter(null);
      setSelectedVerse(null);
      setMaxVerse(0);
    }
  };

  return (
    <div className="search-container">
      <select
        className="search-select"
        aria-label="Select chapter"
        onChange={(e) => setSelectedChapter(Number(e.target.value))}
        value={selectedChapter === null ? '' : selectedChapter}
      >
        <option value="">Select Chapter</option>
        {Array.from({ length: 18 }, (_, i) => i + 1).map((chapter) => (
          <option key={chapter} value={chapter}>
            Chapter {chapter}
          </option>
        ))}
      </select>
      <select
        aria-label="Select Verse"
        className="search-select"
        onChange={(e) => setSelectedVerse(Number(e.target.value))}
        value={selectedVerse === null ? '' : selectedVerse}
        disabled={selectedChapter === null}
      >
        <option value="">Select Verse</option>
        {Array.from({ length: maxVerse }, (_, i) => i + 1).map((verse) => (
          <option key={verse} value={verse}>
            Verse {verse}
          </option>
        ))}
      </select>
      <button
        className="search-button"
        onClick={handleSearch}
        disabled={selectedChapter === null || selectedVerse === null}
      >
        Search
      </button>
    </div>
  );
}

export default Search;
