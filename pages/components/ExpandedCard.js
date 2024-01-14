import React, { useState } from 'react';
import { Permission, Role, ID } from "appwrite"; 
import { database } from "../../config/appwrite";

const ExpandedCard = ({ result, onClose }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const isOptionSelected = (option) => {
    return option === selectedOption;
  };
  if (!result || !result.webformatURL) {
    return null; 
  }
  const handleCopyLink = () => {
    navigator.clipboard.writeText(result.previewURL);
    alert('Link copied to clipboard!');
  };
  const handleDownload = async () => {
    try {
      const databaseId = '65a32ba23207cf3657a4'; 
      const collectionId = '65a32beb228ea458c052'; 
      const documentId = ID.unique();
  
      const downloadData = await database.createDocument(
        databaseId,
        collectionId,
        documentId,
        {
          UrlKey: result.webformatURL,
          isFavorite: false,
        },
        
      );
      console.log('Download information saved:', downloadData);
  
      const link = document.createElement('a');
      link.href = result.webformatURL;
      link.download = 'downloaded_image.jpg';
      link.click();
    } catch (error) {
      console.error('Error saving download information:', error);
    }
  };
    
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 text-black z-50 flex justify-center items-center overflow-y-auto">
      <div className="p-2 md:p-4 lg:p-8 bg-white rounded-lg shadow-lg max-h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 max-w-3xl relative">
        <div className="md:col-span-1 lg:col-span-2 mt-2">
          <img
            src={result.webformatURL}
            alt={result.tags}
            className="w-full h-52 md:h-72 lg:h-96 object-cover rounded-md mb-2 md:mb-4"
          />
          <h2 className="text-lg md:text-xl lg:text-2xl font-bold mb-2">{result.tags}</h2>
        </div>
        <button
          className="bg-blue-500 text-white px-2 py-1 rounded-md absolute right-20 top-10"
          onClick={handleCopyLink}
        >
          Copy Link
        </button>
        <button
          onClick={onClose}
          className="absolute top-1 right-1 p-1 md:top-2 md:right-2 lg:top-4 lg:right-4 rounded-full bg-gray-300 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-4 w-4 md:h-6 md:w-6 lg:h-8 lg:w-8 text-black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
        <div className="md:col-span-2 lg:col-span-1 mt-2 md:mt-0 lg:mt-0 flex justify-center items-center">
          <div className="flex flex-col items-center mt-4 md:mt-10 lg:mt-12">
            <DownloadOption
              label="Small 640x980"
              isSelected={isOptionSelected('Small')}
              onSelect={() => handleOptionSelect('Small')}
            />
            <DownloadOption
              label="Medium 1920x2660"
              isSelected={isOptionSelected('Medium')}
              onSelect={() => handleOptionSelect('Medium')}
            />
            <DownloadOption
              label="Big 2400x3600"
              isSelected={isOptionSelected('Big')}
              onSelect={() => handleOptionSelect('Big')}
            />
            <DownloadOption
              label="Original 3850x5640"
              isSelected={isOptionSelected('Original')}
              onSelect={() => handleOptionSelect('Original')}
            />
            <button 
            className="bg-blue-500 text-white px-2 md:px-4 
            lg:px-6 py-1 md:py-2 lg:py-3 rounded-md mt-2
            " onClick={handleDownload}>
              Download For Free!
            </button>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-10">
            <div className="col-span-2">
              <div className="text-xs md:text-sm lg:text-base">
                <p className="">
                  <span className="font-bold">User : </span> {result.user}
                </p>
                <p>
                  <span className="font-bold">User ID :</span> {result.user_id}
                </p>
                <p>
                  <span className="font-bold">Type : </span> {result.type}
                </p>
              </div>
            </div>
            <div className="col-span-2">
              <div>
                <p className="text-xs md:text-sm lg:text-base">
                  <span className="font-bold">Views : </span> {result.views}
                </p>
                <p className="text-xs md:text-sm lg:text-base">
                  <span className="font-bold">Downloads : </span>{result.downloads}
                </p>
                <p className="text-xs md:text-sm lg:text-base">
                  <span className="font-bold">Likes :</span> {result.likes}
                </p>
              </div>
            </div>
          </div>

      </div>
      </div>
  );
};

const DownloadOption = ({ label, isSelected, onSelect }) => {
  return (
    <div
      className={`bg-gray-200 p-1 md:p-2 lg:p-4 mx-1 md:mx-2 lg:mx-4 rounded-md mb-1 md:mb-2 lg:mb-4 text-center ${
        isSelected ? 'bg-gray-300' : ''
      }`}
      onClick={onSelect}
      style={{
        position: 'relative',
        height: '32px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {isSelected && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="20"
          height="20"
          viewBox="0 0 48 48"
          className="absolute top-0 right-1"
        >
          <linearGradient
            id="IMoH7gpu5un5Dx2vID39Ra_pIPl8tqh3igN_gr1"
            x1="9.858"
            x2="38.142"
            y1="9.858"
            y2="38.142"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#9dffce"></stop>
            <stop offset="1" stopColor="#50d18d"></stop>
          </linearGradient>
          <path
            fill="url(#IMoH7gpu5un5Dx2vID39Ra_pIPl8tqh3igN_gr1)"
            d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"
          ></path>
          <linearGradient
            id="IMoH7gpu5un5Dx2vID39Rb_pIPl8tqh3igN_gr2"
            x1="13"
            x2="36"
            y1="24.793"
            y2="24.793"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset=".824" stopColor="#135d36"></stop>
            <stop offset=".931" stopColor="#125933"></stop>
            <stop offset="1" stopColor="#11522f"></stop>
          </linearGradient>
          <path
            fill="url(#IMoH7gpu5un5Dx2vID39Rb_pIPl8tqh3igN_gr2)"
            d="M21.293,32.707l-8-8c-0.391-0.391-0.391-1.024,0-1.414l1.414-1.414	c0.391-0.391,1.024-0.391,1.414,0L22,27.758l10.879-10.879c0.391-0.391,1.024-0.391,1.414,0l1.414,1.414	c0.391,0.391,0.391,1.024,0,1.414l-13,13C22.317,33.098,21.683,33.098,21.293,32.707z"
          ></path>
        </svg>
      )}
      <p className="text-2xs md:text-xs lg:text-sm">{label}</p>
    </div>
  );
};

export default ExpandedCard;
