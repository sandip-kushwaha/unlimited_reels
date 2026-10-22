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
      <video
        ref={videoRef}
        src={video.url}
        className="reel-video"
        loop
        playsInline
        controls
      />
      <div className="video-info">
        <p>@{video.author}</p>
        <span>{video.title}</span>
      </div>
    </div>
  );
}