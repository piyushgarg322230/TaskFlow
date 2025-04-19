import { useState, useEffect } from 'react';
import './HomeSence.css';

function HomeSence() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  
  const wallpapers = [
    { url: 'https://source.unsplash.com/random/800x600?nature', category: 'Nature' },
    { url: 'https://source.unsplash.com/random/800x600?space', category: 'Space' },
    { url: 'https://source.unsplash.com/random/800x600?abstract', category: 'Abstract' },
    { url: 'https://source.unsplash.com/random/800x600?minimal', category: 'Minimal' },
    { url: 'https://source.unsplash.com/random/800x600?art', category: 'Art' },
    { url: 'https://source.unsplash.com/random/800x600?technology', category: 'Technology' },
    { url: 'https://source.unsplash.com/random/800x600?architecture', category: 'Architecture' },
    { url: 'https://source.unsplash.com/random/800x600?pattern', category: 'Abstract' },
    { url: 'https://source.unsplash.com/random/800x600?pattern', category: 'Abstract' },
    { url: 'https://source.unsplash.com/random/800x600?pattern', category: 'Abstract' },
    { url: 'https://source.unsplash.com/random/800x600?pattern', category: 'Abstract' },
    { url: 'https://source.unsplash.com/random/800x600?pattern', category: 'Abstract' },
    { url: 'https://source.unsplash.com/random/800x600?pattern', category: 'Abstract' },
    { url: 'https://source.unsplash.com/random/800x600?pattern', category: 'Abstract' },
    { url: 'https://source.unsplash.com/random/800x600?pattern', category: 'Abstract' },
    { url: 'https://source.unsplash.com/random/800x600?pattern', category: 'Abstract' },
    { url: 'https://source.unsplash.com/random/800x600?pattern', category: 'Abstract' },
    { url: 'https://source.unsplash.com/random/800x600?pattern', category: 'Abstract' },
    { url: 'https://source.unsplash.com/random/800x600?pattern', category: 'Abstract' },
    { url: 'https://source.unsplash.com/random/800x600?pattern', category: 'Abstract' },
    { url: 'https://source.unsplash.com/random/800x600?pattern', category: 'Abstract' },
    { url: 'https://source.unsplash.com/random/800x600?pattern', category: 'Abstract' },
  ];

  const categories = ['All', 'Nature', 'Abstract', 'Space', 'Minimal', 'Art'];

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [activeCategory, searchQuery]);

  const filteredWallpapers = wallpapers.filter(wp => {
    const matchesCategory = activeCategory === 'All' || wp.category === activeCategory;
    const matchesSearch = wp.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container">
      <header>
        <div className="header-decor">
          <div className="floating-shapes">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div className="header-content">
          <h1>Wallpaper Flare</h1>
          <p>Transform Your Devices with Stunning HD Wallpapers</p>
        </div>
      </header>

      <div style={{ padding: '20px' }}>
        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Search 4K wallpapers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-btn">
            <i className="fas fa-search"></i> Search
          </button>
        </div>

        <div className="categories">
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="wallpaper-grid">
          {loading && <div className="loading">Loading Amazing Wallpapers...</div>}
          {!loading && filteredWallpapers.map((wallpaper, index) => (
            <div key={index} className="wallpaper-item">
              <img src={wallpaper.url} loading="lazy" alt={`${wallpaper.category} wallpaper`} />
              <div className="download-btn">
                <i className="fas fa-download">s</i>
                <span>1920x1080</span>
              </div>
              <div className="overlay">
                <div className="image-info">
                  <h3>{wallpaper.category}</h3>
                  <p>Premium HD Quality</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer>
        <p>Follow us for daily wallpaper inspiration</p>
        <div className="social-links">
          <a href="#"><i className="fab fa-instagram"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-pinterest"></i></a>
        </div>
      </footer>
    </div>
  );
}

export default HomeSence;