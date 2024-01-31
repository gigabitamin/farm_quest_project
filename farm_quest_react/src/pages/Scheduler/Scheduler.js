import React, { useState, useEffect } from 'react';
import SchedulerModal from './SchedulerModal';
import SchedulerFilter from './SchedulerFilter';
import SchedulerCalendar from './SchedulerCalendar';
// import SchedulerDateWeather from './SchedulerDateWeather';
import GridSelect from './GridSelect';
import './SchedulerCSS.css';

const Scheduler = () => {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const currentTime = new Date();
        const currentHour = currentTime.getHours();
        console.log(currentTime)
        if (currentHour >= 0 && currentHour < 2 && !showModal) {
            console.log('Initial showModal state:', showModal);

            setShowModal(true);
        }
    }, []); 

    const handleCloseModal = () => {
        setShowModal(false);
    };


    return (
        <div className="Scheduler">
            <div className="filter-container">
                <SchedulerFilter />
                {/* <SchedulerDateWeather /> */}
            </div>

            {showModal && <SchedulerModal handleCloseModal={handleCloseModal} />}

            <div className="calendar-container">
                <GridSelect /> 
                <SchedulerCalendar />
            </div>
        </div>
    );
};

export default Scheduler;
