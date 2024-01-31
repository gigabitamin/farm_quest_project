import React from 'react';
import { useSelector } from 'react-redux';

function SchedulerWarningDate({ currentDate }) {
  const fetchedData = useSelector((state) => state.scheduler.item);

  const getDayColor = (diseaseStart, diseaseEnd) => {
    const startDate = new Date(diseaseStart);
    const endDate = new Date(diseaseEnd);

    // 현재 날짜가 해당 범위에 속하는지 확인
    if (currentDate >= startDate && currentDate <= endDate) {
      // 여기에서 원하는 스타일을 반환하면 됩니다.
      return { backgroundColor: 'red', color: 'white' };
    }

    return {}; // 기본 스타일
  };

  const renderCells = () => {
    return fetchedData.map((item, index) => {
      const { disease_start, disease_end, disease_name } = item;

      return (
        <div key={index} style={getDayColor(disease_start, disease_end)}>
          {disease_name}
        </div>
      );
    });
  };

  return <div>{renderCells()}</div>;
}

export default SchedulerWarningDate;
