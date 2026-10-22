// 
import { useState, useEffect } from 'react';
import TopBar from './components/TopBar';
import VideoCard from './components/VideoCard';
import { fetchUnifiedFeed } from './services/api';
import './App.css';

export default function App() {
  const [region, setRegion] = useState('NP');
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    loadFeed();
  }, [region]);

  const loadFeed = async () => {
    setLoading(true);
    setCurrentIndex(0);
    const data = await fetchUnifiedFeed(region);
    setVideos(data);
    setLoading(false);
  };

  const handleScroll = (e) => {
    const element = e.target;
    const index = Math.round(element.scrollTop / element.clientHeight);
    
    // यदि प्रयोगकर्ता अन्तिम भिडियोको नजिक पुग्यो भने आफैं फेरि सुरुमा वा थप लोड गर्ने
    if (index >= videos.length - 2 && videos.length > 0) {
      // यहाँ चाहेमा नयाँ फेरि लोड गर्न सकिन्छ वा लूप गर्न सकिन्छ
    }

    if (index !== currentIndex) {
      setCurrentIndex(index);
    }
  };

  return (
    <div className="app-container">
      {/* माथि केवल देश (Region) छान्ने ड्रपडाउन मात्र आउँछ, कुनै आइकन वा ट्याब छैन */}
      <TopBar region={region} setRegion={setRegion} />

      <div className="video-feed-container" onScroll={handleScroll}>
        {loading ? (
          <div className="loading">video loading... ⏳</div>
        ) : videos.length === 0 ? (
          <div className="loading">No videos found, try another region.</div>
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