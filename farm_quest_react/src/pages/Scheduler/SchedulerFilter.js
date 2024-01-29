import React, { useState, useEffect } from 'react';

const SchedulerFilter = () => {
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

  useEffect(() => {
    if (selectedPlant !== null) {
      const plantNo = plantNameToNoMapping[selectedPlant];
      fetch(`/api/scheduler/${plantNo}`)
        .then((response) => response.json())
        .then((data) => {

          console.log('Received data:', data); 

          setFetchedData(data);
        })
        .catch((error) => {
          console.error('Error fetching scheduler data:', error);
        });
    }
  }, [selectedPlant]);

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
        <h3>불러온 데이터:</h3>
        {/* 불러온 데이터를 그대로 렌더링 */}
        <pre>{JSON.stringify(fetchedData, null, 2)}</pre>      </div>
        
    </div>
  );
};

export default SchedulerFilter;
