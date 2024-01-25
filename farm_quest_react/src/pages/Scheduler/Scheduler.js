import React from 'react';

import SchedulerFilter from './SchedulerFilter';
// import SchedulerNotice from './SchedulerNotice';
import SchedulerCalendar from './SchedulerCalendar';
import './SchedulerCSS.css'



const Scheduler = () => {
    return (
        <div className="Scheduler">
            <div className="filter-container">
                <SchedulerFilter />
            </div>
            {/* <SchedulerNotice /> */}
            <div className="calendar-container">
                <SchedulerCalendar />
            </div>
        </div>
    );

};

export default Scheduler;