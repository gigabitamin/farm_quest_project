import React, { Component } from 'react';
import SchedulerFilter from './SchedulerFilter';
// import SchedulerFilter from './SchedulerNotice';
// import SchedulerFilter from './SchedulerCalender';

class Scheduler extends Component {
    render() {
        return (
            <div>
                <SchedulerFilter />
                {/* <SchedulerNotice /> */}
                {/* <SchedulerCalender> */}
                    
                {/* </SchedulerCalender> */}
            </div>
        );
    }
}

export default Scheduler;