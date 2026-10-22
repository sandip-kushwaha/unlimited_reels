import React, { useRef, useEffect } from 'react';

export default function VideoCard({ video, isActive }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      videoRef.current?.play().catch(() => {});
    } else {
      videoRef.current?.pause();
      if (videoRef.current) videoRef.current.currentTime = 0;
    }
  }, [isActive]);

  return (
    <div className="video-card">
      <div className="video-overlay">
        <p>Unlimited reels</p>
      </div>
      <video
        ref={videoRef}
        src={video.url}
        className="reel-video"
        loop
        playsInline
        controls
        preload="auto"
      />
      <div className="video-info">
        <div className="author-row">
          <img 
            src={video.avatar} 
            alt={video.author} 
            className="author-avatar" 
            onError={(e) => {
              e.target.src = 'https://ui-avatars.com/api/?name=TT&background=fe2c55&color=fff';
            }}
          />
          <p>@{video.author}</p>
        </div>
        <span>{video.title}</span>
      </div>
    </div>
  );
}