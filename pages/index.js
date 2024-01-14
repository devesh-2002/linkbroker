import React, { useState, useRef, useEffect } from 'react';
import Navbar from './components/Navbar';
import ExpandedCard from './components/ExpandedCard';
import { RingLoader } from 'react-spinners';


const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchBarMargin, setSearchBarMargin] = useState('5px');
  const [searchClicked, setSearchClicked] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null);
  const [loading, setLoading] = useState(false);

  const navbarRef = useRef(null);

  useEffect(() => {
    if (navbarRef.current) {
      const navbarHeight = navbarRef.current.offsetHeight;
      setSearchBarMargin(searchClicked ? `${navbarHeight + 5}px` : `${navbarHeight + 10}px`);
    }
  }, [searchQuery, searchClicked, navbarRef.current]);  
  
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const images = [
    "https://cdn.pixabay.com/photo/2014/10/28/19/26/matterhorn-507014_1280.jpg",
    "https://images.unsplash.com/photo-1554176259-aa961fc32671?q=80&w=2018&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://cdn.pixabay.com/photo/2023/01/05/22/10/mountains-7699910_1280.jpg",
    "https://cdn.pixabay.com/photo/2018/03/02/19/21/nature-3194001_1280.jpg"
  ];
  
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setBackgroundIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); 

    return () => clearInterval(intervalId); 
  }, []); 

  const backgroundStyle = {
    backgroundImage: `url("${images[backgroundIndex]}")`,
    backgroundSize: 'cover',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    textAlign: 'center',
    position: 'relative',
  };

  const searchBarStyle = {
    backgroundColor: 'rgba(217, 217, 217, 0.115)',
    boxShadow: 'inset 4px -4px 4px rgba(182, 182, 182, 0.43), inset -4px 4px 4px rgba(255, 255, 255, 0.43)',
    backdropFilter: 'blur(10px)',
    borderRadius: '8px',
    width: '60%',
    padding: '8px',
    marginTop: searchClicked ? 'auto' : searchBarMargin,
    display: 'flex',
    alignItems: 'center',
  };

  const iconStyle = {
    width: '20px',
    height: '20px',
  };

  const goButtonStyle = {
    marginLeft: '25px',
    color: 'white',
    backgroundColor: 'rgba(217, 217, 217, 0.115)',
    padding: '8px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
  };

  const trendingButtonStyle = {
    marginTop: '15px',
    backgroundColor: 'rgba(217, 217, 217, 0.115)',
    boxShadow: 'inset 4px -4px 4px rgba(182, 182, 182, 0.43), inset -4px 4px 4px rgba(255, 255, 255, 0.43)',
    backdropFilter: 'blur(10px)',
    borderRadius: '12px',
    padding: '10px',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
  };

  const textAboveSearchBarStyle = {
    marginBottom: '4px',
    opacity: searchClicked || searchQuery !== '' ? 0 : 1,
    transition: 'opacity 0.3s ease',
  };

  const textBelowSearchBarStyle = {
    marginTop: '4px',
    opacity: searchClicked || searchQuery !== '' ? 0 : 1,
    transition: 'opacity 0.3s ease',
  };

  const searchResultsContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: searchClicked ? 'auto' : searchBarMargin,
    height: searchResults.length > 0 ? '70%' : '0',
    overflow: 'hidden',
    transition: 'height 0.3s ease',
    backgroundColor: 'white',
    width: '100%',
  };

  const gridContainerStyle = {
    display: 'grid',
    gap: '10%',
    marginTop: '16px',
    maxHeight: '100%',
    overflowX: 'auto',
    whiteSpace: 'nowrap',
    gridTemplateColumns: 'repeat(3, minmax(250px, 1fr))',
  };
  
  const cardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    height: '100%',
    cursor: 'pointer',
    width: '100%',
  };
  
  const imageStyle = {
    width: '100%',
    height: '60%', 
    objectFit: 'cover',
  };

  const contentStyle = {
    padding: '16px',
    height: '40%', // Adjust the height as needed
  };

  const tagStyle = {
    fontSize: '14px',
    fontWeight: 'bold',
    color: 'black',
  };

  const tagItemStyle = {
    backgroundColor: 'rgba(217, 217, 217, 0.5)',
    borderRadius: '8px',
    padding: '4px 8px',
    margin: '4px',
    fontSize: '12px',
    color: 'black'
  };

  const tagCardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    height: '100%', 
  };

  const tagContentStyle = {
    padding: '16px',
    height: '100%', // Adjust the height as needed
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const handleSearch = async () => {
    try {
      setLoading(true);

      setTimeout(async () => {
        const apiKey = '26398466-4842e76a74f45b571283d3bad';
        const response = await fetch(
          `https://pixabay.com/api/?key=${apiKey}&q=${searchQuery}&image_type=photo&per_page=9`
        );
        const data = await response.json();

        if (navbarRef.current) {
          setSearchBarMargin(`${navbarRef.current.offsetHeight + 5}px`);
        }

        setSearchResults(data.hits);
        setSearchClicked(true);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }, 2000);
    } catch (error) {
      console.error('Error fetching images:', error);
      setLoading(false);
    }
  };

  const handleCardClick = (result) => {
    setExpandedCard(result);
  };

  const handleCloseExpandedCard = () => {
    setExpandedCard(null);
  };

  return (
    <>
      <Navbar ref={navbarRef} />
      <div style={backgroundStyle}>
        <h1 className="text-4xl font-bold mb-4" style={textAboveSearchBarStyle}>
          Discover over 2,000,000 <br /> free Stock Images
        </h1>
        <div style={searchBarStyle}>
          <span className="text-white">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" style={iconStyle}>
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search..."
            className="flex-grow px-2 py-1 border-none bg-transparent text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button style={goButtonStyle} onClick={handleSearch}>
            Go
          </button>
        </div>

        <button style={{ ...trendingButtonStyle, ...textBelowSearchBarStyle, textAboveSearchBarStyle }}>
          Trending: <span style={{ marginLeft: '8px' }}>flowers, love, forest, river</span>
        </button>

        <div style={searchResultsContainerStyle}>
              {loading && (
                <div className="flex items-center justify-center" style={{ minHeight: '100px' }}>
                  <RingLoader color={'#3498db'} loading={loading} size={60} />
                </div>
              )}
          <div style={gridContainerStyle} >
            {searchResults.map((result) => (
              <div
                key={result.id}
                className="max-w-sm rounded-lg shadow-lg "
                style={cardStyle}
                onClick={() => handleCardClick(result)}
              >
                <img src={result.webformatURL} alt={result.tags} style={imageStyle} />
                <div style={contentStyle}>
                  <p style={tagStyle}>{result.tags}</p>
                </div>
                {result.tags.split(',').map((tag, index) => (
                  <div key={index} style={tagCardStyle}>
                    <div style={tagContentStyle}>
                      <div style={tagItemStyle}>{tag.trim()}</div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        {expandedCard && (
        <ExpandedCard result={expandedCard} onClose={handleCloseExpandedCard} />
      )}

      </div>
    </>
  );
};

export default Home;
