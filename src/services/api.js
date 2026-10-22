
let lastFetchTime = 0;
const waitRateLimit = async () => {
  const now = Date.now();
  const timeSinceLast = now - lastFetchTime;
  if (timeSinceLast < 1300) {
    await new Promise(resolve => setTimeout(resolve, 1300 - timeSinceLast));
  }
  lastFetchTime = Date.now();
};

const REGIONS = ['NP', 'IN'];

let backupPool = [];

export const fetchInfiniteVideos = async () => {
  try {
    await waitRateLimit();
    
    const randomRegion = REGIONS[Math.floor(Math.random() * REGIONS.length)];
    
    const res = await fetch(`https://www.tikwm.com/api/feed/list?region=${randomRegion}`);
    const json = await res.json();

    if (json.code === 0 && json.data && json.data.length > 0) {
      const formatted = json.data
        .filter(item => item.play)
        .map(item => ({
          uid: `${item.video_id}_${Date.now()}_${Math.random()}`,
          id: item.video_id,
          url: item.play,
          author: item.author?.unique_id || 'creator',
          title: item.title || '',
        }));

      const shuffled = formatted.sort(() => 0.5 - Math.random());
      backupPool = [...backupPool, ...shuffled].slice(-60);
      return shuffled;
    }
  } catch (err) {
    console.warn("API busy, recycling videos for infinite scroll...");
  }

  //if api is busy, recycle videos for infinite scroll
  if (backupPool.length > 0) {
    return backupPool
      .sort(() => 0.5 - Math.random())
      .map(v => ({ ...v, uid: `${v.id}_${Date.now()}_${Math.random()}` }));
  }

  return [];
};