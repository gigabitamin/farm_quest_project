import React, { useState } from 'react';
import prevButtonImage from '../../images/assets/prevButton.png';
import nextButtonImage from '../../images/assets/nextButton.png';

function genRandomInt(max) {
  return Math.floor(Math.random() * (max + 1));
}

function CalendarHeader({ currentDate, onPrevMonth, onNextMonth }) {
  const crops = ['딸기', '고추', '포도', '파프리카', '토마토', '오이'];
  const description = crops[genRandomInt(5)];

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
      <p>{description} 메시지 출력</p>
    </div>
  );
}
function CalendarBody({ currentDate }) {
  const generateGrid = () => {
    const rows = 6;
    const columns = 7;
    const grid = [];

    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startDayOfWeek = firstDayOfMonth.getDay();
    const lastDay = lastDayOfMonth.getDate();
    let currentDay = 1;

    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

    const dayNamesRow = dayNames.map((day, index) => (
      <td key={`day-${index}`} className={`dayNameCell ${day === '일' ? 'sundayStyle' : (day === '토' ? 'saturdayStyle' : '')}`}>
        {day}
      </td>
    ));
    grid.push(<tr key={`dayNamesRow`}>{dayNamesRow}</tr>);

    for (let i = 0; i < rows; i++) {
      const row = [];
      let isCurrentMonthRow = false; // 해당 행이 이번 달의 날짜를 포함하는지 여부

      for (let j = 0; j < columns; j++) {
        const cellKey = `cell-${i}-${j}`;

        if (i === 0 && j < startDayOfWeek) {
          // 지난달
          const prevMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0 - (startDayOfWeek - j - 1));
          row.push(<td key={cellKey} className="prevMonthCell calendarBodyDateCell">{prevMonthDate.getDate()}</td>);
        } else if (currentDay <= lastDay) {
          // 이번달
          row.push(<td key={cellKey} className="calendarBodyDateCell">{`${currentDay}`}</td>);
          isCurrentMonthRow = true; // 현재 달의 날짜가 포함되어 있음을 표시
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


const SchedulerCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  return (
    <div>
      <CalendarHeader currentDate={currentDate} onPrevMonth={handlePrevMonth} onNextMonth={handleNextMonth} />
      <CalendarBody currentDate={currentDate} />
    </div>
  );
};

export default SchedulerCalendar;
