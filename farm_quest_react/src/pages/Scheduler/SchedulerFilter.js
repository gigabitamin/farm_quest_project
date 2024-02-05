import React, { useState, useEffect, useMemo  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDiseaseColor } from './getDiseaseColor'; // 경로에 맞게 수정

import CalendarOverlay from './CalendarOverlay'

const SchedulerFilter = ({ onFetchedDataChange }) => {
  const DjangoServer = useSelector(state => state.DjangoServer);

  const [selectedPlant, setSelectedPlant] = useState(null);
  const [selectedPlantData, setSelectedPlantData] = useState(null); // 추가된 부분

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
    setSelectedPlantData(null);

  };

  const handleClearSelection = () => {
    setSelectedPlant(null);
    setSelectedPlantData(null);

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
      fetch(`${DjangoServer}/api/scheduler/${plantNo}`)
        .then((response) => response.json())
        .then((data) => {
          // 됏다!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          dispatch({
            part: 'scheduler',
            type: 'filter',
            item: data
        });
          console.log(data);
          setSelectedPlantData(data); // 작물 데이터 업데이트

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
    <div>
      <div id="schedulerFilter">
        <div className='questionOverlayContainer'>
          <h3 id='schedulerselector'>달력 보기</h3>
          <CalendarOverlay tooltipText="작물별 질병의 빈발 시기를 알려드립니다." />
        </div>
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
          {selectedPlantData && (
            <div id='shcedulerDiseaseExp'>
              {/* <div className='qustionOverlayContainer'> */}
                <br /><h3>질병 색상</h3>
                {/* <CalendarOverlay tooltipText="흰 테두리는 생리장해, 검은 테두리는 병해입니다." /> */}
              {/* </div> */}
                <ul id='shcedulerDiseaseExpColor'>
                  {selectedPlantData.map((item, index) => (
                    <li key={index}>
                      <span style={{ background: getDiseaseColor(item.disease_code), paddingRight:'6px', paddingLeft:'6px' }}>{`${item.disease_name} `}</span>
                    </li>
                  ))}
                </ul>
                <button className='schedulerBtn' onClick={handleClearSelection}>달력 비우기</button>

              </div>
            )}
          </div>
        </div>
      </div>
    );
};

export default SchedulerFilter;
