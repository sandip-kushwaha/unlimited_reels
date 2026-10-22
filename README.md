## React Unlimited Reels

A modern, mobile-friendly React application that provides an endless, TikTok/Instagram Reels-style vertical video feed. It features infinite scrolling, automatic duplicate video skipping, creator profiles, auto-playing active videos, and an optional hands-free auto-scroll mode.

## 🚀 Features

Infinite Vertical Scrolling: Seamlessly load and scroll through endless short-form videos without running out of content.

Smart Duplicate Prevention: Uses local storage to keep track of watched video IDs (seen_video_ids) to ensure previously viewed videos are automatically skipped across page refreshes.

Auto-Play & Pause: Only the currently visible (active) video plays automatically, while others pause and reset their timestamps.

Creator Profile Avatars: Displays the creator's circular profile picture alongside their username and title.

Auto-Scroll Mode (Hands-Free): An optional toggle switch (Auto: ON/OFF) that automatically smoothly scrolls to the next video as soon as the current one finishes playing.

Zero Database Required: Fetches live content dynamically utilizing public video APIs with built-in rate-limiting and fallback support.

## 📁 Project Structure

my-reels-app/
├── public/
├── src/
│   ├── components/
│   │   └── VideoCard.jsx
│   ├── services/
│   │   └── api.js            
│   ├── App.jsx               
│   ├── App.css                
│   └── main.jsx               
├── package.json
└── vite.config.js
