
const removeDuplicates = (videos) => {
  const seen = new Set();
  return videos.filter(video => {
    if (!video.url || seen.has(video.id)) return false;
    seen.add(video.id);
    return true;
  });
};

// API Rate Limit (531 Error) 
let lastFetchTime = 0;
const waitRateLimit = async () => {
  const now = Date.now();
  const timeSinceLast = now - lastFetchTime;
  if (timeSinceLast < 1200) {
    await new Promise(resolve => setTimeout(resolve, 1200 - timeSinceLast));
  }
  lastFetchTime = Date.now();
};

const tempCache = {};

export const fetchTikTokByCategory = async (category = 'dance') => {
  const cacheKey = `tiktok_${category}`;
  if (tempCache[cacheKey]) return tempCache[cacheKey];

  try {
    await waitRateLimit();
    
    const region = 'IN';
    const res = await fetch(`https://www.tikwm.com/api/feed/list?region=${region}&count=10`);
    const json = await res.json();

    if (json.code === 0 && json.data) {
      const formatted = removeDuplicates(
        json.data.map(item => ({
          id: item.video_id,
          url: item.play,
          author: item.author?.unique_id || 'tiktok_user',
          title: item.title || (category === 'dance' ? 'Dance Trend 💃' : 'Funny Video 😂'),
          source: 'tiktok'
        }))
      );

      const shuffled = formatted.sort(() => 0.5 - Math.random());
      tempCache[cacheKey] = shuffled;
      return shuffled;
    }
  } catch (err) {
    console.error("TikTok API Error:", err);
  }
  return [];
};