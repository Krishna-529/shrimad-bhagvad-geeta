import React, { useState, useEffect } from 'react';
import '../../styles/Bookmarks.css';

function Bookmarks ({ bookmarks, goToBookmark, currentChapter, currentVerse }) {
    const [isOpen, setIsOpen] = useState(false);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (!event.target.closest('.bookmark-dropdown')) {
                setIsOpen(false);
            }
        }

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    if (bookmarks.length === 0) {
        return (
            <div className="bookmark-dropdown">
                <button 
                    className="bookmark-dropdown-button"
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsOpen(!isOpen);
                    }}
                >
                    Bookmarks (0)
                </button>
                {isOpen && (
                    <div className="bookmark-dropdown-content">
                        <p className="no-bookmarks">No bookmarks yet</p>
                    </div>
                )}
            </div>
        );
    }
    
    return (
        <div className="bookmark-dropdown">
            <button 
                className="bookmark-dropdown-button"
                onClick={() => setIsOpen(!isOpen)}
            >
                ★ Bookmarks ({bookmarks.length})
            </button>
            {isOpen && (
                <div className="bookmark-dropdown-content">
                    {bookmarks.map(bookmark => {
                        const [chapter, verse] = bookmark.split(':');
                        const isActive = currentChapter === Number(chapter) && 
                                       currentVerse === Number(verse);
                        
                        return (
                            <button
                                key={bookmark}
                                className={`bookmark-item ${isActive ? 'active' : ''}`}
                                onClick={() => {
                                    goToBookmark(bookmark);
                                    setIsOpen(false);
                                }}
                            >
                                Chapter {chapter}, Verse {verse}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default Bookmarks;