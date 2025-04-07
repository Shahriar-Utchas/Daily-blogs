import React, { useState } from 'react';
import { FaBookmark } from 'react-icons/fa';

const Blog = ({ blog }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isRead, setIsRead] = useState(false); // State to track if the blog is marked as read

    // Truncate after a certain number of characters to simulate "one line"
    const truncatedDetails = blog.details.length > 100 ? blog.details.slice(0, 100) + '...' : blog.details;

    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    const toggleReadStatus = () => {
        setIsRead(!isRead); // Toggle the read status
    };

    return (
        <div className="card bg-base-300 w-96 shadow-sm">
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
                    <button className="btn btn-outline">
                        <FaBookmark className="mr-2" /> Bookmark
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Blog;
