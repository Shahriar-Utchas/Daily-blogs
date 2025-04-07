import React, { useEffect, useState } from 'react';
import Blog from '../Blog/Blog';

const Blogs = (isDark) => {
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        fetch('blogs.json')
            .then(res => res.json())
            .then(data => {
                setBlogs(data);
            })
    }, []);


    return (
        <>
            <div className="flex flex-wrap gap-8 m-8">

                {blogs.map(blog => (
                    <Blog key={blog.id} blog={blog} isDark = {isDark}></Blog>
                ))}
            </div>

        </>

    );
};

export default Blogs;