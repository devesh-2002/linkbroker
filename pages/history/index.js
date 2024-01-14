import React, { useEffect, useState } from 'react';
import ExpandedCard from '../components/ExpandedCard';
import { database } from '../../config/appwrite';
import Navbar from '../components/Navbar';
const HistoryPage = () => {
  const [downloadHistory, setDownloadHistory] = useState([]);
  const [selectedDownload, setSelectedDownload] = useState(null);
  const [addedToFavoritesMessage, setAddedToFavoritesMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { documents } = await database.listDocuments(
          '65a32ba23207cf3657a4',
          '65a32beb228ea458c052'
        );
        setDownloadHistory(documents);
      } catch (error) {
        console.error('Error fetching download history:', error);
      }
    };

    fetchData();
  }, []);

  const handleAddToFavorites = async (downloadId) => {
    console.log('downloadId:', downloadId);
    
    try {
      const collectionId = '65a32beb228ea458c052'; 
      const databaseId = '65a32ba23207cf3657a4'
      await database.updateDocument(databaseId, collectionId, downloadId, {
        isFavorite: true,
      });
  
      setDownloadHistory((prevHistory) =>
        prevHistory.map((item) =>
          item.$id === downloadId.$id ? { ...item, isFavorite: true } : item
        )
      );

      alert('Added to favorites');
      
      setTimeout(() => {
        setAddedToFavoritesMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };
      
  const handleViewDetails = (download) => {
    setSelectedDownload(download);
  };

  const handleCloseExpandedCard = () => {
    setSelectedDownload(null);
  };

  return (
    <div className="container mx-auto p-4">
      <Navbar />
      <h1 className="text-3xl font-bold mb-4">Download History</h1>

      {/* Display the message */}
      {addedToFavoritesMessage && (
        <div className="text-green-500 mb-4">{addedToFavoritesMessage}</div>
      )}

      <ul className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {downloadHistory.map((item) => (
          <li key={item.$id} className="bg-white p-4 my-6 rounded-md shadow-md">
            <img
              src={item.UrlKey}
              alt={item.tags} 
              className="w-full h-40 object-cover rounded-md mb-2"
            />
            <p className="text-sm text-gray-600 mb-2">
              Downloads: {item.downloads}
            </p>
            <div className="flex justify-between">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                onClick={() => handleAddToFavorites(item.$id)}
              >
                Add to Favorites
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                onClick={() => handleViewDetails(item)}
              >
                View Details
              </button>
            </div>
          </li>
        ))}
      </ul>

      {selectedDownload && (
        <ExpandedCard
          result={selectedDownload}
          onClose={handleCloseExpandedCard}
        />
      )}
    </div>
  );
};

export default HistoryPage;
