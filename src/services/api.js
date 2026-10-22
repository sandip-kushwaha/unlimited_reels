
// const removeDuplicates = (videos) => {
//   const seen = new Set();
//   return videos.filter(video => {
//     if (!video.url || seen.has(video.id)) return false;
//     seen.add(video.id);
//     return true;
//   });
// };

// // १ सेकेन्डमा धेरै रिक्वेस्ट गएर 531 Error नआओस् भनेर १.२ सेकेन्ड कुर्ने फङ्सन
// let lastFetchTime = 0;
// const waitRateLimit = async () => {
//   const now = Date.now();
//   const timeSinceLast = now - lastFetchTime;
//   if (timeSinceLast < 1200) {
//     await new Promise(resolve => setTimeout(resolve, 1200 - timeSinceLast));
//   }
//   lastFetchTime = Date.now();
// };

// const tempCache = {};

// // १. TikTok को ट्रेन्डिङ भिडियो तान्ने (देश अनुसार)
// export const fetchTikTokVideos = async (region = 'NP') => {
//   const cacheKey = `tiktok_${region}`;
//   if (tempCache[cacheKey]) return tempCache[cacheKey];

//   try {
//     await waitRateLimit();
    
//     // यो लिङ्क १००% खुल्ला छ र कहिल्यै CORS ब्लक हुँदैन
//     const res = await fetch(`https://www.tikwm.com/api/feed/list?region=${region}&count=20`);
//     const json = await res.json();
    
//     if (json.code === 0 && json.data) {
//       const formatted = removeDuplicates(
//         json.data.map(item => ({
//           id: item.video_id,
//           url: item.play,
//           author: item.author?.unique_id || 'tiktok_user',
//           title: item.title || '',
//           source: 'tiktok'
//         }))
//       );
//       tempCache[cacheKey] = formatted;
//       return formatted;
//     }
//   } catch (err) {
//     console.error("TikTok API Error:", err);
//   }
//   return [];
// };

// // २. Reels भिडियो तान्ने (ब्लक हुने /search हटाएर १००% चल्ने /feed/list प्रयोग गरिएको)
// export const fetchReelsVideos = async () => {
//   if (tempCache['reels']) return tempCache['reels'];

//   try {
//     await waitRateLimit();

//     // Reels को लागि ग्लोबल इंग्लिश/भाइरल रिजनहरू (जहाँ रिल्स र भाइरल सर्ट्स आउँछन्)
//     const reelsRegions = ['GB', 'CA', 'AU', 'SG', 'MY'];
//     const randomRegion = reelsRegions[Math.floor(Math.random() * reelsRegions.length)];
    
//     const res = await fetch(`https://www.tikwm.com/api/feed/list?region=${randomRegion}&count=25`);
//     const json = await res.json();

//     if (json.code === 0 && json.data) {
//       // भिडियोहरूलाई मिक्स (Shuffle) गरेर रिल्स फिड बनाउने
//       const shuffled = [...json.data].sort(() => 0.5 - Math.random());
      
//       const formatted = removeDuplicates(
//         shuffled.map(item => ({
//           id: item.video_id,
//           url: item.play,
//           author: item.author?.unique_id || 'reels_creator',
//           title: item.title || 'Trending Reel ✨',
//           source: 'reels'
//         }))
//       );
      
//       tempCache['reels'] = formatted;
//       return formatted;
//     }
//   } catch (err) {
//     console.error("Reels Fetch Error:", err);
//   }

//   return [];
// };


const removeDuplicates = (videos) => {
  const seen = new Set();
  return videos.filter(video => {
    if (!video.url || seen.has(video.id)) return false;
    seen.add(video.id);
    return true;
  });
};

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

// युनिफाइड फिड (जसमा अटो-लूप / इन्फिनिट सिस्टम जोडिएको छ)
export const fetchUnifiedFeed = async (region = 'NP') => {
  // यदि क्यास छ भने पनि त्यसलाई फेरि मिक्स गरेर नयाँ सिक्वेन्स बनाउने
  try {
    await waitRateLimit();
    const res1 = await fetch(`https://www.tikwm.com/api/feed/list?region=${region}&count=25`);
    const json1 = await res1.json();

    await waitRateLimit();
    const secondRegion = region === 'NP' ? 'IN' : (region === 'IN' ? 'US' : 'GB');
    const res2 = await fetch(`https://www.tikwm.com/api/feed/list?region=${secondRegion}&count=25`);
    const json2 = await res2.json();

    let combinedList = [];

    if (json1.code === 0 && json1.data) {
      const v1 = json1.data.map(item => ({
        id: `t_${item.video_id}_${Math.random()}`, // युनिक आइडी ताकि लूपमा नअल्झियोस्
        url: item.play,
        author: item.author?.unique_id || 'creator',
        title: item.title || '',
        source: 'TikTok'
      }));
      combinedList.push(...v1);
    }

    if (json2.code === 0 && json2.data) {
      const v2 = json2.data.map(item => ({
        id: `r_${item.video_id}_${Math.random()}`,
        url: item.play,
        author: item.author?.unique_id || 'creator',
        title: item.title || '',
        source: 'Reels'
      }));
      combinedList.push(...v2);
    }

    if (combinedList.length === 0) {
      // यदि लिमिटले गर्दा डेटा आएन भने, पहिले सेभ भएको डेटालाई नै फेरि दोहोर्याएर वा मिक्स गरेर पठाउने
      return tempCache['backup'] || [];
    }

    // भिडियोहरूलाई पूर्ण रूपमा मिक्स (Shuffle) गर्ने
    const shuffled = combinedList.sort(() => 0.5 - Math.random());
    const finalVideos = removeDuplicates(shuffled);

    // ब्याकअपको लागि सेभ राख्ने
    tempCache['backup'] = finalVideos;
    return finalVideos;

  } catch (err) {
    console.error("Feed Fetch Error:", err);
    // एरर वा लिमिट आएमा पुरानै डेटालाई फेरि फर्काइदिने (कहिले पनि रोकिँदैन)
    return tempCache['backup'] || [];
  }
};