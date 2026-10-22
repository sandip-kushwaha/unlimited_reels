## React Unlimited Reels

A modern, mobile-friendly React application that provides an endless, TikTok/Instagram Reels-style vertical video feed. It features infinite scrolling, automatic duplicate video skipping, creator profiles, auto-playing active videos, and an optional hands-free auto-scroll mode.

## ✨ Key Features

* **No-Login Required:** Open the app and start watching instantly. No sign-up, sign-in, or OAuth setup needed.
* **Database-Free Architecture:** Fetches trending data directly from public endpoints via client-side requests.
* **Unified Infinite Feed:** Seamlessly mixes and loops short-form videos with continuous vertical scrolling.
* **Auto-Scroll Mode (Hands-free):** Features an **Auto ON/OFF** toggle button that automatically scrolls to the next video as soon as the current one ends.
---

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
