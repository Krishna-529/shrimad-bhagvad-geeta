import React from 'react';
import '../../../public/bookmark.css';

function Bookmarks({ bookmarks, goToBookmark, currentChapter, currentVerse }) {
    if (bookmarks.length === 0) {
        return null;
    }

    return (
        <div className="bookmarks-container">
            <h3>Bookmarks</h3>
            <div className="bookmarks-list">
                {bookmarks.map(bookmark => {
                    const [chapter, verse] = bookmark.split(':');
                    const isActive = currentChapter === Number(chapter) && 
                                   currentVerse === Number(verse);
                    
                    return (
                        <button
                            key={bookmark}
                            className={`bookmark-item ${isActive ? 'active' : ''}`}
                            onClick={() => goToBookmark(bookmark)}
                        >
                            Chapter {chapter}, Verse {verse}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default Bookmarks;