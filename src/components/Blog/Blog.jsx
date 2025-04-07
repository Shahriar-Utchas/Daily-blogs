import React, { useState, useEffect } from 'react';
import { FaBookmark } from 'react-icons/fa';

// Helper functions to manage bookmarks in localStorage
const getBookmarkedBlogs = () => {
    const bookmarks = localStorage.getItem('bookmarks');
    return bookmarks ? JSON.parse(bookmarks) : [];
};

const addToBookmarks = (id) => {
    const bookmarks = getBookmarkedBlogs();
    if (!bookmarks.includes(id)) {
        bookmarks.push(id);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
};

const removeFromBookmarks = (id) => {
    let bookmarks = getBookmarkedBlogs();
    bookmarks = bookmarks.filter(blogId => blogId !== id);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
};

const Blog = ({ blog, updateTotalTimeRead }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isRead, setIsRead] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);

    // Truncate after a certain number of characters to simulate "one line"
    const truncatedDetails = blog.details.length > 100 ? blog.details.slice(0, 100) + '...' : blog.details;

    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    const toggleReadStatus = () => {
        setIsRead(!isRead); // Toggle the read status
        if (!isRead) {
            updateTotalTimeRead(blog.reading_time); // Add reading time to total time if marked as read
        } else {
            updateTotalTimeRead(-blog.reading_time); // Subtract reading time if unmarked as read
        }
    };

    const toggleBookmark = () => {
        setIsBookmarked(!isBookmarked);
        if (!isBookmarked) {
            addToBookmarks(blog.id);
        } else {
            removeFromBookmarks(blog.id);
        }
    };

    useEffect(() => {
        // Retrieve the read status for each blog from localStorage on initial load
        const readBlogs = JSON.parse(localStorage.getItem('readBlogs')) || [];
        if (readBlogs.includes(blog.id)) {
            setIsRead(true);
        }

        // Check if the blog is bookmarked from localStorage
        const bookmarks = getBookmarkedBlogs();
        if (bookmarks.includes(blog.id)) {
            setIsBookmarked(true);
        }
    }, [blog.id]);

    useEffect(() => {
        // Save the read status of the blog to localStorage
        const readBlogs = JSON.parse(localStorage.getItem('readBlogs')) || [];
        if (isRead) {
            if (!readBlogs.includes(blog.id)) {
                readBlogs.push(blog.id);
            }
        } else {
            const index = readBlogs.indexOf(blog.id);
            if (index > -1) {
                readBlogs.splice(index, 1);
            }
        }
        localStorage.setItem('readBlogs', JSON.stringify(readBlogs));
    }, [isRead, blog.id]);

    return (
        <div className="card bg-base-300 w-130 shadow-sm">
            <figure className="px-10 pt-10">
                <img
                    src={blog.cover}
                    alt={blog.title}
                    className="rounded-xl w-full h-64 object-cover"
                />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{blog.title}</h2>

                {/* Author Info - Profile Image and Name in a Row */}
                <div className="flex items-center justify-center space-x-3">
                    <img
                        src={blog.author_img}
                        alt={blog.author}
                        className="rounded-full w-10 h-10 border-2 border-gray-300"
                    />
                    <p className="text-sm text-gray-500">{blog.author}</p>
                </div>

                {/* Display Reading Time Before Description */}
                <p className="text-sm text-gray-500 mt-2">{blog.reading_time} min read</p>

                {/* Display truncated or full description based on state */}
                <p className="my-4">
                    {isExpanded ? blog.details : truncatedDetails}
                </p>

                {/* Toggle button */}
                <button onClick={toggleDescription} className="text-blue-500 hover:underline">
                    {isExpanded ? 'See Less' : 'See More'}
                </button>

                {/* Buttons - Mark as Read and Bookmark Side by Side */}
                <div className="card-actions justify-between w-full mt-4">
                    <button
                        onClick={toggleReadStatus}
                        className={`btn ${isRead ? 'btn-success' : 'btn-outline'}`}
                    >
                        {isRead ? 'Marked as Read' : 'Mark as Read'}
                    </button>
                    <button
                        onClick={toggleBookmark}
                        className={`btn ${isBookmarked ? 'btn-primary' : 'btn-outline'}`}
                    >
                        <FaBookmark className="mr-2" /> {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Blog;
