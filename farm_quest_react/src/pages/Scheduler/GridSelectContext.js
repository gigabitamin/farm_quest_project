// GridSelectContext.js
import React, { createContext, useContext, useState } from 'react';

const GridSelectContext = createContext();

export const GridSelectProvider = ({ children }) => {
  const [selectedLocation1, setSelectedLocation1] = useState('');
  const [selectedLocation2, setSelectedLocation2] = useState('');
  const [selectedLocation3, setSelectedLocation3] = useState('');

  return (
    <GridSelectContext.Provider
      value={{
        selectedLocation1,
        setSelectedLocation1,
        selectedLocation2,
        setSelectedLocation2,
        selectedLocation3,
        setSelectedLocation3,
      }}
    >
      {children}
    </GridSelectContext.Provider>
  );
};

export const useGridSelectContext = () => {
  const context = useContext(GridSelectContext);
  if (!context) {
    throw new Error('useGridSelectContext must be used within a GridSelectProvider');
  }
  return context;
};
