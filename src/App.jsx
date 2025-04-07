import './App.css';
import React, { useState, useEffect } from 'react';
import Blogs from './components/Blogs/Blogs';
import Navbar from './components/Navbar/Navbar';

function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Get the saved theme from localStorage or default to 'light' if it's not found
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    setIsDark(savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    setIsDark(!isDark);
  };

  return (
    <>
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />
      <Blogs isDark={isDark} />
    </>
  );
}

export default App;
