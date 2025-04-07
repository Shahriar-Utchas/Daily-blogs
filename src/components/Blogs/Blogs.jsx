import React, { useEffect, useState } from 'react';
import Blog from '../Blog/Blog';

const Blogs = ({ isDark }) => {
    const [blogs, setBlogs] = useState([]);
    const [totalTimeRead, setTotalTimeRead] = useState(0);
    const [showBookmarks, setShowBookmarks] = useState(false);  // State to toggle between showing all or bookmarked blogs

    useEffect(() => {
        // Fetch the blog data
        fetch('blogs.json')
            .then(res => res.json())
            .then(data => {
                setBlogs(data);
            });

        // Load total time read from localStorage
        const savedTime = localStorage.getItem('totalTimeRead');
        if (savedTime) {
            setTotalTimeRead(parseInt(savedTime));
        }
    }, []);

    const updateTotalTimeRead = (time) => {
        const newTotalTime = totalTimeRead + time;
        setTotalTimeRead(newTotalTime);
        localStorage.setItem('totalTimeRead', newTotalTime);
    };

    // Toggle between showing all blogs and only bookmarked blogs
    const toggleShowBookmarks = () => {
        setShowBookmarks(!showBookmarks);
    };

    // Get the list of bookmarked blog IDs from localStorage
    const getBookmarkedBlogIds = () => {
        const bookmarks = localStorage.getItem('bookmarks');
        return bookmarks ? JSON.parse(bookmarks) : [];
    };

    // Filter blogs based on whether they are bookmarked or not
    const filteredBlogs = showBookmarks
        ? blogs.filter(blog => getBookmarkedBlogIds().includes(blog.id))
        : blogs;

    return (
        <>
            <div className="flex justify-between items-center m-4">
                <h2>Total Time Read: {totalTimeRead} mins</h2>
                <button
                    onClick={toggleShowBookmarks}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    {showBookmarks ? 'Show All Blogs' : 'Show All Bookmarks'}
                </button>
            </div>
            <div className="flex flex-wrap gap-8 m-4 justify-center">
                {filteredBlogs.map(blog => (
                    <Blog
                        key={blog.id}
                        blog={blog}
                        isDark={isDark}
                        updateTotalTimeRead={updateTotalTimeRead}
                    />
                ))}
            </div>
        </>
    );
};

export default Blogs;
