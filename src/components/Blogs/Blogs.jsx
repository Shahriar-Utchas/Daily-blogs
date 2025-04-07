import React, { useEffect, useState } from 'react';
import Blog from '../Blog/Blog';

const Blogs = ({ isDark }) => {
    const [blogs, setBlogs] = useState([]);
    const [totalTimeRead, setTotalTimeRead] = useState(0);
    const [showBookmarks, setShowBookmarks] = useState(false);
    const [bookmarkedBlogs, setBookmarkedBlogs] = useState([]);

    useEffect(() => {
        fetch('blogs.json')
            .then(res => res.json())
            .then(data => {
                setBlogs(data);
            });

        const savedTime = localStorage.getItem('totalTimeRead');
        if (savedTime) {
            setTotalTimeRead(parseInt(savedTime));
        }

        const savedBookmarks = localStorage.getItem('bookmarks');
        if (savedBookmarks) {
            setBookmarkedBlogs(JSON.parse(savedBookmarks));
        }
    }, []);

    const updateTotalTimeRead = (time) => {
        const newTotalTime = totalTimeRead + time;
        setTotalTimeRead(newTotalTime);
        localStorage.setItem('totalTimeRead', newTotalTime);
    };

    const toggleShowBookmarks = () => {
        setShowBookmarks(!showBookmarks);
    };

    const filteredBlogs = showBookmarks
        ? blogs.filter(blog => bookmarkedBlogs.includes(blog.id))
        : blogs;

    return (
        <>
            <div className="flex flex-col sm:flex-row justify-between items-center m-4">
                <h2 className="mb-2 sm:mb-0">Total Time Read: {totalTimeRead} mins</h2>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={toggleShowBookmarks}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
                    >
                        {showBookmarks ? 'Show All Blogs' : 'Show All Bookmarks'}
                    </button>
                    {showBookmarks && (
                        <span className="text-sm font-semibold text-gray-700">{bookmarkedBlogs.length}</span>
                    )}
                </div>
            </div>
            <div className="flex flex-wrap gap-8 m-4 justify-center">
                {filteredBlogs.map(blog => (
                    <Blog
                        key={blog.id}
                        blog={blog}
                        isDark={isDark}
                        updateTotalTimeRead={updateTotalTimeRead}
                        setBookmarkedBlogs={setBookmarkedBlogs}
                    />
                ))}
            </div>
        </>
    );
};

export default Blogs;
