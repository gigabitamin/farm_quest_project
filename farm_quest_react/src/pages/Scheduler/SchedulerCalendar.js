import React, { useState } from 'react'; 
import { useSelector } from 'react-redux';

import prevButtonImage from '../../images/assets/prevButton.png';
import nextButtonImage from '../../images/assets/nextButton.png';
import './SchedulerCSS.css';


// SchedulerAnnouncement 컴포넌트
function SchedulerAnnouncement() {
  const fetchedData = useSelector(state => state.scheduler.item);

  const renderAnnouncements = () => {
      console.log('fetchedData:', fetchedData);

    if (Array.isArray(fetchedData)) {
      const announcements = fetchedData
        .filter(item => item.disease_announcement !== null && item.disease_announcement !== "")
        .map(item => item.disease_announcement);
      console.log('announcements:', announcements);

      if (announcements.length > 0) {
        return (
          <div>
            {announcements.map((announcement, index) => (
              <p key={index}>{announcement}</p>
            ))}
          </div>
        );
      } else {
        return <p>발령된 예보가 없습니다.</p>;
      }
    }

    return <p>달력을 선택해주세요.</p>;
  };

  return (
    <div>
      <h3>알림판 :</h3>
      {renderAnnouncements()}
    </div>
  );
}

// CalendarHeader 컴포넌트
const CalendarHeader = ({ currentDate, onPrevMonth, onNextMonth}) => {

  const getCurrentDate = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.toLocaleString('default', { month: 'long' });
    return `${year}년 ${month} `;
  };

  return (
    <div id="calendarTitle">
      <button className="calendarTitle" onClick={onPrevMonth}>
        <img className="MonthBtn" src={prevButtonImage} alt="이전 달" />
      </button>
      <h1 className="calendarTitle">{getCurrentDate()}</h1>
      <button className="calendarTitle" onClick={onNextMonth}>
        <img className="MonthBtn" src={nextButtonImage} alt="다음 달" />
      </button>

      <div>
        <SchedulerAnnouncement />

      </div>
    </div>
  );
};



function CalendarBody({ currentDate }) {
  const fetchedData = useSelector(state => state.scheduler.item);
  console.log('Received filteredData in SchedulerCalendar:', fetchedData);
  
  const generateGrid = () => {

    
  const getDiseaseColor = (disease_code) => {
    const diseaseColorMap = {
      'a1': '#b88b8b',
      'a2': '#496349',
      'a3': '#89b9ab',
      'a4': '#e799cd',
      'a5': '#1f6148',
      'a6': '#c7c979',
      'a7': '#7c78b3',
      'a8': '#c5845e',
      'a9': '#29e09a',
      'a10': '#63f863',
      'a11': '#c22561',
      'a12': '#3e70cc',
      'b1': '#442222',
      'b2': '#094b09',
      'b3': '#130e31',
      'b4': '#95aa20',
      'b5': '#2eb185',
      'b6': '#697069',
      'b7': '#a4a712',
      'b8': '#00e1ff',
    };
  
    // 질병 코드에 해당하는 색상이 매핑에 있는지 확인하고 반환
    return diseaseColorMap[disease_code] || 'defaultColor'; // 적절한 기본 색상을 지정하거나 기본값으로 설정
  };

    const rows = 6;
    const columns = 7;
    const grid = [];

    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startDayOfWeek = firstDayOfMonth.getDay();
    const lastDay = lastDayOfMonth.getDate();
    let currentDay = 1;

    const today = new Date();//

    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

    const dayNamesRow = dayNames.map((day, index) => (
      <td key={`day-${index}`} className={`dayNameCell ${day === '일' ? 'sundayStyle' : (day === '토' ? 'saturdayStyle' : '')}`}>
        {day}
      </td>
    ));
    grid.push(<tr key={`dayNamesRow`}>{dayNamesRow}</tr>);

    for (let i = 0; i < rows; i++) {
      const row = [];
      let isCurrentMonthRow = false;

      for (let j = 0; j < columns; j++) {
        const cellKey = `cell-${i}-${j}`;

        if (i === 0 && j < startDayOfWeek) {
          // 지난달
          const prevMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0 - (startDayOfWeek - j - 1));
          row.push(<td key={cellKey} className="prevMonthCell calendarBodyDateCell">{prevMonthDate.getDate()}</td>);
        } else if (currentDay <= lastDay) {
          // 이번달
          const currentDateCell = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDay);
          const isToday = currentDateCell.toDateString() === today.toDateString();
  
          const diseaseInfoArray = Array.isArray(fetchedData) ? fetchedData.filter(item => {
            const startDate = new Date(item.disease_start);
            const endDate = new Date(item.disease_end);
            return item.disease_code && currentDateCell >= startDate && currentDateCell <= endDate;
          }) : [];
          // console.log("데이터임",diseaseInfoArray)

          
          const diseaseStyles = diseaseInfoArray.reduce((styles, diseaseInfo, index) => {
            const height = (index + 1) * 6;
            styles[diseaseInfo.disease_code] = {
              borderBottom: `${height}px solid ${getDiseaseColor(diseaseInfo.disease_code)}`
            };
            return styles;
          }, {});

        
          console.log('diseaseStyles:', diseaseStyles);

          
        // 오늘날짜표시
          const todayStyle = isToday ? { border: '4px dashed green' } : {};


          row.push(
            <td key={cellKey} className="calendarBodyDateCell" style={{ ...diseaseStyles[diseaseInfoArray[0]?.disease_code], ...todayStyle }}>
              {`${currentDay}`}
              {isToday && diseaseInfoArray.map(info => (
                <div key={info.disease_code}>{info.disease_name}</div>
              ))}
            </td>
          );


        isCurrentMonthRow = true;
        currentDay++;
      } else {

          // 다음달
          const nextMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDay - lastDay);
          row.push(<td key={cellKey} className="nextMonthCell calendarBodyDateCell">{nextMonthDate.getDate()}</td>);
          currentDay++;
        }
      }

      // 해당 행이 이번 달의 날짜를 포함하고 있는 경우에만 행 추가
      if (isCurrentMonthRow) {
        grid.push(<tr key={`row-${i}`}>{row}</tr>);
      }
    }

    return grid;
  };

  return (
    <div id="thisMonthBody">
      <table id="thisMonth">
        <tbody>{generateGrid()}</tbody>
      </table>

    </div>
  );
}


const SchedulerCalendar = ({ filteredData, fetchedData }) => {
  console.log('Received filteredData in SchedulerCalendar:', filteredData);
  console.log('Received fetchedData in SchedulerCalendar:', fetchedData);

  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  return (
    <div>
      <CalendarHeader
        currentDate={currentDate}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        fetchedData={fetchedData}
      />
      <CalendarBody currentDate={currentDate} />
    </div>
  );
};

export default SchedulerCalendar;
