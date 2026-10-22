import React, { useState, useEffect } from 'react';
import TopBar from './components/TopBar';
import VideoCard from './components/VideoCard';
import { fetchTikTokByCategory } from './services/api';
import './App.css';

export default function App() {
  const [category, setCategory] = useState('dance');
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    loadVideos();
  }, [category]);

  const loadVideos = async () => {
    setLoading(true);
    setCurrentIndex(0);
    const data = await fetchTikTokByCategory(category);
    setVideos(data);
    setLoading(false);
  };

  const handleScroll = (e) => {
    const index = Math.round(e.target.scrollTop / e.target.clientHeight);
    if (index !== currentIndex) {
      setCurrentIndex(index);
    }
  };

  return (
    <div className="app-container">
      <TopBar category={category} setCategory={setCategory} />

      <div className="video-feed-container" onScroll={handleScroll}>
        {loading ? (
          <div className="loading">videos loading... ⏳</div>
        ) : videos.length === 0 ? (
          <div className="loading">No videos found!</div>
        ) : (
          videos.map((video, index) => (
            <VideoCard 
              key={`${video.id}-${index}`} 
              video={video} 
              isActive={index === currentIndex} 
            />
          ))
        )}
      </div>
    </div>
  );
}