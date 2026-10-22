
export default function TopBar({ category, setCategory }) {
  return (
    <div className="top-bar">
      <div className="category-tabs">
        <button 
          className={`cat-btn ${category === 'dance' ? 'active-cat' : ''}`} 
          onClick={() => setCategory('dance')}
        >
           💃 Dance
        </button>
        <button 
          className={`cat-btn ${category === 'funny' ? 'active-cat' : ''}`} 
          onClick={() => setCategory('funny')}
        >
          😂 Funny
        </button>
      </div>
    </div>
  );
}