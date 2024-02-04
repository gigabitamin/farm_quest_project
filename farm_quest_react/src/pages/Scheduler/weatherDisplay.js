import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";

const sky_code = {1: 'sunny', 2: 'sunny', 3: 'sunny', 4: 'sunny', 5: 'sunny', 6: 'cloudy', 7: 'cloudy', 8: 'cloudy', 9: 'gray', 10: 'gray'}
const pty_code = {0: 'clear', 1: 'rainy', 2: 'rainy', 3: 'snowy', 5: 'littlerain', 6: 'snowy', 7: 'snowy'}
// 6,7은 sleet이지만 snowy로 통일
const weatherImg = 'farm_quest_react\src\images\assets\weatherGIFs'

const formatTime = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString(); // 문자열로 변환
    const day = currentDate.getDate().toString();
    const hours = currentDate.getHours().toString().padStart(2, '0'); // 시간

    // formattedDate: 20240129, time: 0900 -> 2024-01-29 09:00
    const formattedDate = `${year}${month.padStart(2, '0')}${day.padStart(2, '0')}`;
    
    return `${parseInt(year, 10)}년 ${parseInt(month, 10)}월 ${parseInt(day, 10)}일 ${hours}시`;
  };


const renderWeatherImg = (formatTime) => {
const fetchedData = useSelector(state => state.scheduler.weather);

return (
    <div>
        <span>{sky_code[parseInt(weatherInfo[time]['SKY'])]}</span><br/>
        <span>{pty_code[parseInt(weatherInfo[time]['PTY'])]}</span><br/>
    </div>
    )
};

export default weatherDisplay;