import { useState, useEffect, useRef } from 'react';
import VideoCard from './components/VideoCard';
import { fetchInfiniteVideos } from './services/api';
import './App.css';

export default function App() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const isFetchingMore = useRef(false);

  
  useEffect(() => {
    loadInitialVideos();
  }, []);

  const loadInitialVideos = async () => {
    setLoading(true);
    const initialData = await fetchInfiniteVideos();
    setVideos(initialData);
    setLoading(false);
  };


  const loadMoreVideos = async () => {
    if (isFetchingMore.current) return;
    isFetchingMore.current = true;

    const moreData = await fetchInfiniteVideos();
    if (moreData.length > 0) {
      setVideos(prevVideos => [...prevVideos, ...moreData]);
    }
    
    isFetchingMore.current = false;
  };

  const handleScroll = (e) => {
    const element = e.target;
    const index = Math.round(element.scrollTop / element.clientHeight);
    
    if (index !== currentIndex) {
      setCurrentIndex(index);
    }

    if (videos.length > 0 && index >= videos.length - 3) {
      loadMoreVideos();
    }
  };

  return (
    <div className="app-container">
      <div className="video-feed-container" onScroll={handleScroll}>
        {loading ? (
          <div className="loading">videos loading... ⏳</div>
        ) : videos.length === 0 ? (
          <div className="loading">No videos found.</div>
        ) : (
          videos.map((video, index) => (
            <VideoCard 
              key={video.uid || `${video.id}-${index}`} 
              video={video} 
              isActive={index === currentIndex} 
            />
          ))
        )}
      </div>
    </div>
  );
}