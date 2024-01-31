import React, { useState, useEffect } from 'react';

const SchedulerFilter = ({ onFetchedDataChange }) => {
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [fetchedData, setFetchedData] = useState(null);

  const plantNameToNoMapping = {
    '딸기': 1,
    '토마토': 2,
    '파프리카': 3,
    '오이': 4,
    '고추': 5,
    '포도': 6,
  };

  const handleRadioChange = (plantName) => {
    setSelectedPlant(plantName);
  };

  const handleClearSelection = () => {
    setSelectedPlant(null);
    setFetchedData(null);

  };

  useEffect(() => {
    if (selectedPlant !== null) {
      const plantNo = plantNameToNoMapping[selectedPlant];
      fetch(`http://localhost:8000/api/scheduler/${plantNo}`)
        .then((response) => response.json())
        .then((data) => {
          console.log('Received data:', data);
          setFetchedData(data); // Update fetchedData state with the received data
          if (onFetchedDataChange) {
            onFetchedDataChange(data); // Notify the parent component about the fetched data
          }
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [selectedPlant, onFetchedDataChange]);

  return (
    <div id="schedulerFilter">
      <h2>선택 작목</h2>
      {Object.entries(plantNameToNoMapping).map(([plantName, plantNo]) => (
        <div id="schedulerFilterUi" key={plantName}>
          <input
            type="radio"
            id={plantName}
            name="plantRadio"
            checked={selectedPlant === plantName}
            onChange={() => handleRadioChange(plantName)}
          />
          <label className='schedulerFilterUi' htmlFor={plantName}>{plantName}</label>
        </div>
      ))}

      <div>
        <h3>선택된 작목:</h3>
        <p>{selectedPlant}</p>
        <button onClick={handleClearSelection}>Clear</button>
        <div id="anno">
        <SchedulerAnnouncement fetchedData={fetchedData} />
        </div>
      </div>
    </div>
  );
};

function SchedulerAnnouncement({ fetchedData }) {
  const renderAnnouncements = () => {
    if (fetchedData) {
      const announcements = fetchedData
        .filter(item => item.disease_announcement !== null && item.disease_announcement !== "")
        .map(item => item.disease_announcement);
      console.log('announcements:', announcements);

      return (
        <div>
          {announcements.map((announcement, index) => (
            <p key={index}>{announcement}</p>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <div>
      <h3>공지사항:</h3>
      {renderAnnouncements()}
    </div>
  );
}

export default SchedulerFilter;
