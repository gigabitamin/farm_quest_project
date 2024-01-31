import React from 'react';


const SchedulerAnnouncement = ({ fetchedData }) => {
  const renderAnnouncements = () => {
    if (fetchedData) {
      const announcements = fetchedData
        .filter(item => item.disease_announcement !== null && item.disease_announcement !== "")
        .map(item => item.disease_announcement);

      return (
        <div>
          {announcements.map((announcement, index) => (
            <p key={index}>{announcement}</p>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <div>
      <h3>공지사항:</h3>
      {renderAnnouncements()}
    </div>
  );
};

export default SchedulerAnnouncement;
