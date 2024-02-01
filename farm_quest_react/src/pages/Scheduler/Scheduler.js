import React, { useState, useEffect } from 'react';
import SchedulerModal from './SchedulerModal';
import SchedulerFilter from './SchedulerFilter';
import SchedulerCalendar from './SchedulerCalendar';
// import SchedulerDateWeather from './SchedulerDateWeather';
import GridSelect from './GridSelect';
// import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import './SchedulerCSS.css';

const Scheduler = () => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    // const show = useSelector(state => state.scheduler.show);

    useEffect(() => {
        const currentTime = new Date();
        const currentHour = currentTime.getHours();
        console.log(currentTime)

        if (currentHour >= 0 && currentHour < 2 && !showModal) {
            console.log('Initial showModal state:', showModal);

            setShowModal(true);
        }        
        
        return () => dispatch({
            part: 'scheduler',
            type: 'reset'
        });

    }, []);

    const handleCloseModal = () => {
        setShowModal(false);
    };


    return (
        <div className="Scheduler">
            <div className="filter-container">
                <SchedulerFilter />

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
