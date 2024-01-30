import React, { useState, useEffect } from 'react';
import SchedulerModal from './SchedulerModal';
import SchedulerFilter from './SchedulerFilter';
import SchedulerCalendar from './SchedulerCalendar';
import SchedulerDateWeather from './SchedulerDateWeather';
import GridSelect from './GridSelect';
import './SchedulerCSS.css';

const Scheduler = () => {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {

        const currentTime = new Date();
        const isModalVisible = currentTime.getHours() >= 0 && currentTime.getHours() < 2;

        setShowModal(isModalVisible);

        if (isModalVisible) {
            const timeoutId = setTimeout(() => {
                setShowModal(false);
            }, (2 - currentTime.getHours()) * 60 * 60 * 1000);

            return () => {
                clearTimeout(timeoutId);
            };
        }
    }, []); 

    return (
        <div className="Scheduler">
            <div className="filter-container">
                <SchedulerFilter />
                <SchedulerDateWeather />
            </div>

            {showModal && <SchedulerModal handleCloseModal={() => setShowModal(false)} />}

            <div className="calendar-container">
                <GridSelect />
                <SchedulerCalendar />
            </div>
        </div>
    );
};

export default Scheduler;
