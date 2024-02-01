import React, { useState } from 'react'; 
import { useSelector } from 'react-redux';
import { getDiseaseColor } from './getDiseaseColor'; // 경로에 맞게 수정

import prevButtonImage from '../../images/assets/prevButton.png';
import nextButtonImage from '../../images/assets/nextButton.png';
// import CalendarOverlay from './CalendarOverlay';
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
      <h3 style={{marginTop:'6px'}}>알림판</h3>
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
      <button className="MonthBtn" onClick={onPrevMonth}>
        <img className="MonthBtnImg" src={prevButtonImage} alt="이전 달" />
      </button>
      <h1 className="calendarTitle">{getCurrentDate()}</h1>
      <button className="MonthBtn" onClick={onNextMonth}>
        <img className="MonthBtnImg" src={nextButtonImage} alt="다음 달" />
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

    
  // const getDiseaseColor = (disease_code) => {
  //   const diseaseColorMap = {
  //     'a1': '#b88b8b',
  //     'a2': '#496349',
  //     'a3': '#89b9ab',
  //     'a4': '#e799cd',
  //     'a5': '#1f6148',
  //     'a6': '#c7c979',
  //     'a7': '#7c78b3',
  //     'a8': '#c5845e',
  //     'a9': '#29e09a',
  //     'a10': '#63f863',
  //     'a11': '#c22561',
  //     'a12': '#3e70cc',
  //     'b1': '#442222',
  //     'b2': '#094b09',
  //     'b3': '#130e31',
  //     'b4': '#95aa20',
  //     'b5': '#2eb185',
  //     'b6': '#697069',
  //     'b7': '#a4a712',
  //     'b8': '#00e1ff',
  //   };
  
  //   // 질병 코드에 해당하는 색상이 매핑에 있는지 확인하고 반환
  //   return diseaseColorMap[disease_code] || 'defaultColor'; // 적절한 기본 색상을 지정하거나 기본값으로 설정
  // };

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
            startDate.setDate(startDate.getDate() - 1);

            return item.disease_code && currentDateCell >= startDate && currentDateCell <= endDate;
          }) : [];
          // console.log("데이터임",diseaseInfoArray)

          
          const lineHeights = diseaseInfoArray.map((info, index) => (index + 2));

          
          const diseaseStyles = lineHeights.reduce((styles, _, index) => {
            const diseaseCode = diseaseInfoArray[index].disease_code;
            styles[diseaseCode] = {
              background: `${getDiseaseColor(diseaseCode)}`,
              height: '4px',
              width: '100%', // 선의 전체 너비를 셀의 가로 크기에 맞게 조절
              display: 'block', // block 요소로 설정하여 한 줄에 하나의 선만 표시
            };
            return styles;
          }, {});
          

        
          console.log('diseaseStyles:', diseaseStyles);

          
        // 오늘날짜표시
        const todayStyle = isToday
        ? {
            border: '4px dashed green',
            background: diseaseInfoArray.map(info => getDiseaseColor(info.disease_code)).join(', '), // 여러 질병에 대한 배경색을 콤마로 구분하여 적용
          }
        : {};
      
          row.push(
            <td key={cellKey} className="calendarBodyDateCell" style={{ ...todayStyle, ...(isToday && diseaseInfoArray.length > 0 && { background: getDiseaseColor(diseaseInfoArray[0].disease_code) }) }}>
              {`${currentDay}`}
              { diseaseInfoArray.map((info, index) => (
                <div
                  key={info.disease_code}
                  className={`diseaseLine line${index}`}
                  style={{
                    background: `${getDiseaseColor(info.disease_code)}`,
                    height: `${index === 0 ? 10 : 10}px`, // 첫 번째 질병 코드에는 2px, 나머지에는 1px의 높이를 부여
                  }}
                />
              ))}
            </td>
          );
          

          isCurrentMonthRow = true;
          currentDay++;
        } else {
          // 다음 달
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
