import React from 'react';



function genRandomInt(max) {
    return Math.floor(Math.random() * (max + 1));
  }

function CalendarHeader() {
    const days = ['월','화','수']
    const description = days[genRandomInt(2)]
    return (
        <div id="calendarTitle">
            <h1>This Month</h1>
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