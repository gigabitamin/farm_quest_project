import React, { useState } from 'react';
import SchedulerFilter from './SchedulerFilter';
import SchedulerCalendar from './SchedulerCalendar';

const SchedulerDataFile = () => {
  const [filteredData, setFilteredData] = useState(null);

  const handleFilterDataChange = (data) => {
    
    console.log('Received data in handleFilterDataChange:', data);

    setFilteredData(data);
    
  };

  return (
    <div>
      <SchedulerFilter onDataChange={handleFilterDataChange} />
      <SchedulerCalendar filteredData={filteredData} />
    </div>
  );
};

export default SchedulerDataFile;
