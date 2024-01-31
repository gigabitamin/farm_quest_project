import React, { useEffect, useState } from 'react';

const GridSelect = ({}) => {
    const [location1, setLocation1] = useState([]);
    const [location2, setLocation2] = useState([]);
    const [location3, setLocation3] = useState([]);
    const [selectedLocation1, setSelectedLocation1] = useState('');
    const [selectedLocation2, setSelectedLocation2] = useState('');
    const [selectedLocation3, setSelectedLocation3] = useState('');
    // const [informations, setInformations] = useState({});
    const [storedNx, setStoredNx] = useState(null); 
    const [storedNy, setStoredNy] = useState(null); 
    const [weatherInfo, setWeatherInfo] = useState([]);
    const deg_code = {0 : 'N', 360 : 'N', 180 : 'S', 270 : 'W', 90 : 'E', 22.5 :'NNE',
                        45 : 'NE', 67.5 : 'ENE', 112.5 : 'ESE', 135 : 'SE', 157.5 : 'SSE',
                        202.5 : 'SSW', 225 : 'SW', 247.5 : 'WSW', 292.5 : 'WNW', 315 : 'NW',
                        337.5 : 'NNW'}
    const sky_code = {1: '맑음', 2: '맑음', 3: '맑음', 4: '맑음', 5: '맑음', 6: '구름많음', 7: '구름많음', 8: '구름많음', 9: '흐림', 10: '흐림'}
    const pyt_code = {0: '강수 없음', 1: '비', 2: '비/눈', 3: '눈', 5: '빗방울', 6: '진눈깨비', 7: '눈날림'}


    function degToDir(deg) {
        let closeDir = '';
        let minAbs = 360;
      
        if (!(deg in deg_code)) {
          for (const key in deg_code) {
            if (Math.abs(key - deg) < minAbs) {
              minAbs = Math.abs(key - deg);
              closeDir = deg_code[key];
            }
          }
        } else {
          closeDir = deg_code[deg];
        }
      
        return closeDir;
      }
      
      console.log(degToDir(0));

      const getWindStrength = (vec, wsd) => {
        if (vec && wsd) {
          const vecTemp = degToDir(parseFloat(vec));
          const wsdTemp = parseFloat(wsd);
      
          if (wsdTemp < 4) {
            return '약한 바람';
          } else if (wsdTemp >= 4 && wsdTemp < 9) {
            return '약간 강한 바람';
          } else if (wsdTemp >= 9 && wsdTemp < 14) {
            return '강한 바람';
          } else {
            return '매우 강한 바람';
          }
        }
        return '바람 없음';
      };

    // 위치선택 가져오기
    useEffect(() => {
        fetch('http://localhost:8000/api/get_grid_data/')
            .then(response => response.json())
            .then(data => {
                setLocation1(data.location1.sort());
                setLocation2(data.location2.sort());
                setLocation3(data.location3.sort());
            })
            .catch(error => console.error('데이터 가져오기 오류:', error));
    }, []);

    useEffect(() => {
        const fetchLocations2 = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/get_location2_data/?location1=${selectedLocation1}`);
                const data = await response.json();
                setLocation2(data.location2.sort());
            } catch (error) {
                console.error('데이터 가져오기 오류:', error);
            }
        };

        if (selectedLocation1) {
            fetchLocations2();
        } else {
            setLocation2([]);
            setLocation3([]);
        }
    }, [selectedLocation1]);

    useEffect(() => {
        const fetchLocations3 = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/get_location3_data/?location1=${selectedLocation1}&location2=${selectedLocation2}`);
                const data = await response.json();
                setLocation3(data.location3.sort());
            } catch (error) {
                console.error('데이터 가져오기 오류:', error);
            }
        };

        if (selectedLocation1 && selectedLocation2) {
            fetchLocations3();
        } else {
            setLocation3([]);
        }
    }, [selectedLocation1, selectedLocation2]);


    
    const handleLocation1Change = (event) => {
        setSelectedLocation1(event.target.value);
    };

    const handleLocation2Change = (event) => {
        setSelectedLocation2(event.target.value);
    };

    const handleLocation3Change = (event) => {
        setSelectedLocation3(event.target.value);
    };
//// /////////////////////
const onFetchWeatherData = async (nx, ny) => {

    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}${(currentDate.getMonth() + 1).toString().padStart(2, '0')}${currentDate.getDate().toString().padStart(2, '0')}`;
    const currentHour = currentDate.getHours();
    console.log('Base Date:', formattedDate);

    let baseTime;

    if (currentHour < 2 ) {
        console.error('Not service time');
        return;
    } else if (currentHour < 6) {
        baseTime = '0200';
    } else if (currentHour < 9) {
        baseTime = '0500';
    } else if (currentHour < 12) {
        baseTime = '0800';
    } else if (currentHour < 15) {
        baseTime = '1100';
    } else if (currentHour < 18) {
        baseTime = '1400';
    } else if (currentHour < 21) {
        baseTime = '1700';
    } else if (currentHour < 24) {
        baseTime = '2000';
    } else {
        console.error('Not service time');
        return;
    }

    console.log('Base Time:', baseTime);

    console.log('storedNx:', storedNx);
    console.log('storedNy:', storedNy);
    // console.log('보내기전:', process.env.REACT_APP_API_KEY)

    const response = await fetch(
    `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst` +
    `?serviceKey=${process.env.REACT_APP_API_KEY}` +
    `&pageNo=1` +
    `&numOfRows=10` +
    `&dataType=json` +
    `&base_date=${formattedDate}` +
    `&base_time=${baseTime}` +
    `&nx=${storedNx}` +
    `&ny=${storedNy}`
    );

    if (!response.ok) {
    throw new Error('Failed to fetch weather data');
    }
    // console.log('보낸후:', process.env.REACT_APP_API_KEY)
    console.log('response:', response)

    const data = await response.json();
    console.log('data:', data)



    const rawData = data.response.body.items.item;
    const weatherInfo = [];

    rawData.forEach(item => {
        const { category, fcstTime, fcstValue } = item;

        if (!weatherInfo[fcstTime]) {
            weatherInfo[fcstTime] = {};
        }

        weatherInfo[fcstTime][category] = fcstValue;
    });

    Object.keys(weatherInfo).forEach(time => {
        const vec = weatherInfo[time]['VEC'];
        const wsd = weatherInfo[time]['WSD'];
        
        weatherInfo[time]['WindStrength'] = getWindStrength(vec, wsd);
      });
    
      setWeatherInfo(weatherInfo);
    };


const renderCategories = ['TMP', 'REH', 'SKY', 'POP', 'PTY', 'PCP', 'VEC', 'WSD'];


const getRenderName = (originalCategory) => {
    switch (originalCategory) {
        case 'TMP':
            return '온도'; //
        case 'UUU':
            return '풍속(동서)';
        case 'VEC':
            return '풍향'; //
        case 'WSD':
            return '풍속'; //
        case 'SKY':
            return '구름'; //
        case 'POP':
            return '강수확률'; //
        case 'WAV':
            return '파도높이';
        case 'PTY':
            return '강수형태'; //         
        case 'VVV':
            return '풍속(남북)';
        case 'PCP':
            return '강수량'; //
        case 'REH':
            return '습도'; //
        case 'SNO':
            return '적설';
        default:
            return originalCategory; 
    }
};

// useEffect(() => {
//     onFetchWeatherData ();
// }, []);

// /////////////////////
    const handleSaveAndFetch = () => {

        // onFetchWeatherData(setStoredNx, setStoredNy);


        // 세션 정보를 SchedulerWeatherLocation 모듈에 전송
        onFetchLocationData(
            selectedLocation1,
            selectedLocation2,
            selectedLocation3,
            // setStoredNx,
            // setStoredNy
        );
    };

    const onFetchLocationData = (location1, location2, location3) => {
        console.log('Location 1:', location1);
        console.log('Location 2:', location2);
        console.log('Location 3:', location3);

        fetch('http://localhost:8000/api/get_nx_ny/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                location1,
                location2,
                location3,
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('서버 응답:', data);
    
            if (data.error && data.error.includes('Not service time')) {
                console.error('서비스 시간이 아닙니다');
            } else {
                const { nx, ny } = data;
                setStoredNx(nx);
                setStoredNy(ny);

            // sessionStorage.setItem('nx', nx);
            // sessionStorage.setItem('ny', ny);

            onFetchWeatherData(nx, ny);

            }
        })
        .catch(error => console.error('서버 통신 오류:', error));
    };
    
    return (
        <div>
            <label>시/도:</label>
            <select onChange={handleLocation1Change} value={selectedLocation1}>
                <option value="">선택</option>
                {location1.map((location, index) => (
                    <option key={index} value={location}>
                        {location}
                    </option>
                ))}
            </select>

            <label>시/군/구:</label>
            <select onChange={handleLocation2Change} value={selectedLocation2}>
                <option value="">선택</option>
                {location2.map((location, index) => (
                    <option key={index} value={location}>
                        {location}
                    </option>
                ))}
            </select>

            <label>읍/면/동:</label>
            <select onChange={handleLocation3Change} value={selectedLocation3}>
                <option value="">선택</option>
                {location3.map((location, index) => (
                    <option key={index} value={location}>
                        {location}
                    </option>
                ))}
            </select>

            <button onClick={handleSaveAndFetch}>날씨 정보 가져오기</button>


            <h2>날씨정보</h2>
            <ul>
                {Object.keys(weatherInfo).map(time => (
                    <li key={time}>
                        <strong>기준시간 : {formatTime(time)}</strong>
                        {/* <ul>
                            {renderCategories.map(category => (
                                <li key={category}>
                                    {getRenderName(category)}: {weatherInfo[time][category]}
                                </li>
                            ))}
                        </ul> */}

                        {weatherInfo[time]['SKY'] && weatherInfo[time]['PTY'] && (
                            <div>
                                <p>구름: {sky_code[parseInt(weatherInfo[time]['SKY'])]}</p>
                                <p>강수형태: {pyt_code[parseInt(weatherInfo[time]['PTY'])]}</p>
                                {weatherInfo[time]['PCP'] !== '강수없음' && (
                                    <p>시간당 강수량: {weatherInfo[time]['PCP']}mm</p>
                                )}
                                {weatherInfo[time]['TMP'] && (
                                    <p>평균기온: {parseFloat(weatherInfo[time]['TMP'])}℃</p>
                                )}
                                {weatherInfo[time]['REH'] && (
                                    <p>습도: {parseFloat(weatherInfo[time]['REH'])}%</p>
                                )}
                                {weatherInfo[time]['VEC'] && weatherInfo[time]['WSD'] && (
                                    <p>
                                        풍향: {degToDir(parseFloat(weatherInfo[time]['VEC']))}{' '}<br />
                                        풍속: {parseFloat(weatherInfo[time]['WSD'])}m/s &nbsp;
                                        {getWindStrength(weatherInfo[time]['VEC'], weatherInfo[time]['WSD'])}

                                    </p>
                                )}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

const formatTime = () => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}${(currentDate.getMonth() + 1).toString().padStart(2, '0')}${currentDate.getDate().toString().padStart(2, '0')}`;
    const currentHour = currentDate.getHours();
    console.log(currentDate);
    console.log('시간:',currentHour);

    // formattedDate: 20240129, time: 0900 -> 2024-01-29 09:00
    return `${formattedDate.substring(0, 4)}년 ${formattedDate.substring(4, 6)}월 ${formattedDate.substring(6, 8)}일 ${currentHour}시`;
};


export default GridSelect;
