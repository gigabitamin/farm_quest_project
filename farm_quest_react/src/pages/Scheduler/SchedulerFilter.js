import React, { useState, useEffect, useMemo  } from 'react';
import { useDispatch } from 'react-redux';


const SchedulerFilter = ({ onFetchedDataChange }) => {
  const [selectedPlant, setSelectedPlant] = useState(null);
  const dispatch = useDispatch();

  const plantNameToNoMapping = useMemo(() => ({ // 또는 usememo 삭제
    '딸기': 1,
    '토마토': 2,
    '파프리카': 3,
    '오이': 4,
    '고추': 5,
    '포도': 6,
  }), []);

  const handleRadioChange = (plantName) => {
    console.log('Selected plant:', plantName);

    setSelectedPlant(plantName);
  };

  const handleClearSelection = () => {
    setSelectedPlant(null);
    dispatch({
      part: 'scheduler',
      type: 'filter',
      item: []
    });
    // setFetchedData(null);

  };

  useEffect(() => {
    if (selectedPlant !== null) {
      const plantNo = plantNameToNoMapping[selectedPlant];
      fetch(`http://localhost:8000/api/scheduler/${plantNo}`)
        .then((response) => response.json())
        .then((data) => {
          // 됏다!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          dispatch({
            part: 'scheduler',
            type: 'filter',
            item: data
        });
          console.log(data);

          // console.log('Received data:', data);
          // setFetchedData(data); // Update fetchedData state with the received data
          if (onFetchedDataChange) {

          console.log('Dispatched data:', data);


          }
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
        
    }
  }, [selectedPlant, onFetchedDataChange, dispatch, plantNameToNoMapping]);

  return (
    <div id="schedulerFilter">
      <h2>달력 보기</h2>
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
        {/* <p>{selectedPlant}</p> */}
        <button onClick={handleClearSelection}>달력 비우기</button>
      </div>
    </div>
  );
};

// function SchedulerAnnouncement({ fetchedData }) {
//   const renderAnnouncements = () => {
//     if (fetchedData) {
//       const announcements = fetchedData
//         .filter(item => item.disease_announcement !== null && item.disease_announcement !== "")
//         .map(item => item.disease_announcement);
//       console.log('announcements:', announcements);

//       return (
//         <div>
//           {announcements.map((announcement, index) => (
//             <p key={index}>{announcement}</p>
//           ))}
//         </div>
//       );
//     }

//     return null;
//   };

//   return (
//     <div>
//       <h3>공지사항:</h3>
//       {renderAnnouncements()}
//     </div>
//   );
// }

export default SchedulerFilter;
