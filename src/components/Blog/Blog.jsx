import React, { useState, useEffect } from 'react';
import { FaBookmark } from 'react-icons/fa';

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

const Blog = ({ blog, updateTotalTimeRead, setBookmarkedBlogs }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isRead, setIsRead] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);

    const truncatedDetails = blog.details.length > 100 ? blog.details.slice(0, 100) + '...' : blog.details;

    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    const toggleReadStatus = () => {
        setIsRead(!isRead);
        if (!isRead) {
            updateTotalTimeRead(blog.reading_time);
        } else {
            updateTotalTimeRead(-blog.reading_time);
        }
    };

    const toggleBookmark = () => {
        setIsBookmarked(!isBookmarked);
        if (!isBookmarked) {
            addToBookmarks(blog.id);
        } else {
            removeFromBookmarks(blog.id);
        }

        const updatedBookmarks = getBookmarkedBlogs();
        setBookmarkedBlogs(updatedBookmarks); // Update the parent component with the new bookmark list
    };

    useEffect(() => {
        const readBlogs = JSON.parse(localStorage.getItem('readBlogs')) || [];
        if (readBlogs.includes(blog.id)) {
            setIsRead(true);
        }

        const bookmarks = getBookmarkedBlogs();
        if (bookmarks.includes(blog.id)) {
            setIsBookmarked(true);
        }
    }, [blog.id]);

    useEffect(() => {
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
                <div className="flex items-center justify-center space-x-3">
                    <img
                        src={blog.author_img}
                        alt={blog.author}
                        className="rounded-full w-10 h-10 border-2 border-gray-300"
                    />
                    <p className="text-sm text-gray-500">{blog.author}</p>
                </div>

                <p className="text-sm text-gray-500 mt-2">{blog.reading_time} min read</p>

                <p className="my-4">
                    {isExpanded ? blog.details : truncatedDetails}
                </p>

                <button onClick={toggleDescription} className="text-blue-500 hover:underline">
                    {isExpanded ? 'See Less' : 'See More'}
                </button>

                <div className="card-actions justify-between w-full mt-4">
                    <button
                        onClick={toggleReadStatus}
                        className={`btn ${isRead ? 'btn-success' : 'btn-outline'}`}
                    >
                        {isRead ? 'Marked as Read' : 'Mark as Read'}
                    </button>
                    <button
                        onClick={toggleBookmark}
                        className={`btn ${isBookmarked ? 'btn-warning' : 'btn-outline'} hover:bg-yellow-500 cursor-pointer`}
                    >
                        <FaBookmark className="mr-2" />
                        {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Blog;
