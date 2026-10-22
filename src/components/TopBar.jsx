// import React from 'react';

// export default function TopBar({ platform, setPlatform, region, setRegion }) {
//   return (
//     <div className="top-bar">
//       {/* ३ वटा अप्सन: TikTok, Reels, र Both (दुवै एकैसाथ) */}
//       <div className="tabs">
//         <button 
//           className={platform === 'both' ? 'active' : ''} 
//           onClick={() => setPlatform('both')}
//         >
//           🔥 Both
//         </button>
//         <button 
//           className={platform === 'tiktok' ? 'active' : ''} 
//           onClick={() => setPlatform('tiktok')}
//         >
//           🎵 TikTok
//         </button>
//         <button 
//           className={platform === 'reels' ? 'active' : ''} 
//           onClick={() => setPlatform('reels')}
//         >
//           📸 Reels
//         </button>
//       </div>

//       {/* देश (Region) छान्ने अप्सन */}
//       <select 
//         className="region-select" 
//         value={region} 
//         onChange={(e) => setRegion(e.target.value)}
//       >
//         <option value="NP">🇳🇵 Nepal</option>
//         <option value="IN">🇮🇳 India</option>
//         <option value="AE">🇦🇪 Dubai (UAE)</option>
//         <option value="US">🇺🇸 USA</option>
//         <option value="JP">🇯🇵 Japan</option>
//         <option value="KR">🇰🇷 Korea</option>
//         <option value="GB">🇬🇧 UK</option>
//       </select>
//     </div>
//   );
// }

export default function TopBar({ region, setRegion }) {
  return (
    <div className="top-bar" style={{ justifyContent: 'flex-end', padding: '10px 15px' }}>
      <select 
        className="region-select" 
        value={region} 
        onChange={(e) => setRegion(e.target.value)}
      >
        <option value="NP">🇳🇵</option>
        <option value="IN">🇮🇳</option>

      </select>
    </div>
  );
}