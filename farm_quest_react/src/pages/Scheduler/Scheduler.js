import React from 'react';

import SchedulerFilter from './SchedulerFilter';
// import SchedulerNotice from './SchedulerNotice';
import SchedulerCalendar from './SchedulerCalendar';
import SchedulerWeatherLocation from './SchedulerWeatherLocation';
import SchedulerDateWeather from './SchedulerDateWeather';
import './SchedulerCSS.css'



const Scheduler = () => {
    
    return (
        <div className="Scheduler">
            <div className="filter-container">
                <SchedulerFilter />
                <SchedulerDateWeather />
            </div>
            
            {/* <SchedulerNotice /> */}
            <div className="calendar-container">
                <SchedulerWeatherLocation />
                <SchedulerCalendar />
            </div>
        </div>
    );

};

export default Scheduler;