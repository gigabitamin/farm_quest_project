import React, { useState } from 'react';
import prevButtonImage from '../../images/assets/prevButton.png';
import nextButtonImage from '../../images/assets/nextButton.png';

function genRandomInt(max) {
    return Math.floor(Math.random() * (max + 1));
  }

function CalendarHeader() {
    const crops = ['딸기', '고추', '포도','파프리카','토마토','오이']
    const description = crops[genRandomInt(5)]
  const [currentDate, setCurrentDate] = useState(new Date());

    const getCurrentDate = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.toLocaleString('default', { month: 'long' });


        return `${year}년 ${month} `;
    };

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    }; 

    return (
        
        <div id="calendarTitle">
            <button className="calendarTitle" onClick={handlePrevMonth}>
                <img className="MonthBtn" src={prevButtonImage} alt="Previous Month" />
            </button>
            <h1 className="calendarTitle">{getCurrentDate()}</h1>
            <button className="calendarTitle" onClick={handleNextMonth}>
                <img className="MonthBtn" src={nextButtonImage} alt="Next Month" />
            </button>
        <p>
            {description} print your warning
        </p>
        </div>
    );
};

function CalendarBody() {
    const generateGrid = () => {
        const rows = 5;
        const columns = 7;
        const grid = [];
    
        for (let i = 0; i < rows; i++) {
            const row = [];
      
            for (let j = 0; j < columns; j++) {
              const cellKey = `cell-${i}-${j}`;
              row.push(<td key={cellKey}>{`${i + 1}주 ${j + 1}일`}</td>);
            }
      
            grid.push(<tr key={`row-${i}`}>{row}</tr>);
          }
      
          return grid;
        };
    
      return (
        <table id="thisMonth">
          <tbody>
            {generateGrid()}
          </tbody>
        </table>
      );
    }


function CalendarDays(props) {

};

const SchedulerCalendar = () => {
    return (
        <div>
            <CalendarHeader />
            <CalendarBody />


        </div>
    );
};

export default SchedulerCalendar;