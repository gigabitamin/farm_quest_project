import React, { useEffect, useState } from 'react';
import GridSelect from './GridSelect';
import SchedulerModal from './SchedulerModal';

const SchedulerWeatherLocation = () => {
  // 날씨정보
  const [weatherData, setWeatherData] = useState(null);
  // 위치정보
  const [selectedLocation1, setSelectedLocation1] = useState('');
  const [selectedLocation2, setSelectedLocation2] = useState('');
  const [selectedLocation3, setSelectedLocation3] = useState('');
  const [storedNx, setStoredNx] = useState(null); 
  const [storedNy, setStoredNy] = useState(null);  
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  useEffect(() => {
    const storedNx = sessionStorage.getItem('nx');
    const storedNy = sessionStorage.getItem('ny');

    const onFetchWeatherData = async () => {
      try {
        if (!storedNx || !storedNy) {
          console.error('nx or ny not available');
          return;
        }
        
        console.log('Location Info:', selectedLocation1, selectedLocation2, selectedLocation3);

        const currentDate = new Date();
        const formattedDate = `${currentDate.getFullYear()}${(currentDate.getMonth() + 1).toString().padStart(2, '0')}${currentDate.getDate().toString().padStart(2, '0')}`;
        const currentHour = currentDate.getHours();
        console.log('Base Date:', formattedDate);

        let baseTime;

        if (currentHour < 2 ) {
          console.error('Not service time');
          handleOpenModal(); 
          return;
        } else if (currentHour < 5) {
          baseTime = '0200';
        } else if (currentHour < 8) {
          baseTime = '0500';
        } else if (currentHour < 11) {
          baseTime = '0800';
        } else if (currentHour < 14) {
          baseTime = '1100';
        } else if (currentHour < 17) {
          baseTime = '1400';
        } else if (currentHour < 20) {
          baseTime = '1700';
        } else if (currentHour < 23) {
          baseTime = '2000';
        } else {
          console.error('Not service time');
          handleOpenModal();
          return;
        }

        console.log('Base Time:', baseTime);

        const response = await fetch(
          `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst` +
          `?serviceKey=${process.env.REACT_APP_API_KEY}` +
          `&pageNo=1` +
          `&numOfRows=50` +
          `&dataType=json` +
          `&base_date=${formattedDate}` +
          `&base_time=${baseTime}` +
          `&nx=${storedNx}` +
          `&ny=${storedNy}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }

        const data = await response.json();

        const fcstTimes = Object.keys(data.response.body.items.item);
        const formattedWeatherData = {};
        console.log('Data structure:', data.response.body.items.item);
        console.log('Weather data fetched successfully:', data);

        fcstTimes.forEach(fcstTime => {
          const weatherInfo = data.response.body.items.item[fcstTime];
          formattedWeatherData[fcstTime] = {
            TMP: weatherInfo.TMP,
            UUU: weatherInfo.UUU,
            VVV: weatherInfo.VVV,
            VEC: weatherInfo.VEC,
            WSD: weatherInfo.WSD, 
            SKY: weatherInfo.SKY,
            PTY: weatherInfo.PTY,
            POP: weatherInfo.POP,
            WAV: weatherInfo.WAV,
            PCP: weatherInfo.PCP,
            REH: weatherInfo.REH,
            SNO: weatherInfo.SNO,
          };
        });

        console.log('Weather Data:', formattedWeatherData);
        setWeatherData(formattedWeatherData);

      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    onFetchWeatherData();
  }, [storedNx, storedNy, selectedLocation1, selectedLocation2, selectedLocation3]);

  return (
    <div>
      <GridSelect
        setSelectedLocation1={setSelectedLocation1}
        setSelectedLocation2={setSelectedLocation2}
        setSelectedLocation3={setSelectedLocation3}
        setStoredNx={setStoredNx}
        setStoredNy={setStoredNy}
      />
      <SchedulerModal showModal={showModal} handleCloseModal={handleCloseModal} />

      <h2>날씨정보</h2>

      {weatherData && Object.keys(weatherData).map(fcstTime => (
        <div key={fcstTime}>
          <h3>{fcstTime}</h3>
          <p>온도: {weatherData[fcstTime].TMP}</p>
          <p>습도: {weatherData[fcstTime].REH}</p>
          <p>구름: {weatherData[fcstTime].SKY}</p>
          <p>강수: {weatherData[fcstTime].PCP}</p>
          <p>적설: {weatherData[fcstTime].SNO}</p>
          <p>풍향: {weatherData[fcstTime].VEC}</p>
          <p>풍속: {weatherData[fcstTime].WSD}</p>
        </div>
      ))}
    </div>
  );
};

export default SchedulerWeatherLocation;
