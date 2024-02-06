import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CalendarOverlay from './CalendarOverlay';

const GridSelect = ({}) => {
    const dispatch = useDispatch();
    const DjangoServer = useSelector(state => state.DjangoServer);

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
    const [where, setWhere] = useState([]);
    const deg_code = {0 : '북', 360 : '북', 180 : '남', 270 : '서', 90 : '동', 22.5 :'북북동',
                        45 : '북동', 67.5 : '동북동', 112.5 : '동남동', 135 : '남동', 157.5 : '남남동',
                        202.5 : '남남서', 225 : '남서', 247.5 : '서남서', 292.5 : '서북서', 315 : '북서',
                        337.5 : '북북서'}
    const sky_code = {1: '맑음', 2: '맑음', 3: '맑음', 4: '맑음', 5: '맑음', 6: '구름많음', 7: '구름많음', 8: '구름많음', 9: '흐림', 10: '흐림'}
    const pty_code = {0: '강수 없음', 1: '비', 2: '비/눈', 3: '눈', 5: '빗방울', 6: '진눈깨비', 7: '눈날림'}

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
        fetch(`${DjangoServer}/api/get_grid_data/`)
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
                const response = await fetch(`${DjangoServer}/api/get_location2_data/?location1=${selectedLocation1}`);
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
                const response = await fetch(`${DjangoServer}/api/get_location3_data/?location1=${selectedLocation1}&location2=${selectedLocation2}`);
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

    if (currentHour < 1 ) {
        console.error('Not service time');
        return;
    } else if (currentHour <= 2) {
        baseTime = '0030';
    } else if (currentHour <= 3) {
        baseTime = '0130';
    } else if (currentHour <= 4) {
        baseTime = '0230';
    } else if (currentHour <= 5) {
        baseTime = '0330';
    } else if (currentHour <= 6) {
        baseTime = '0430';
    } else if (currentHour <= 7) {
        baseTime = '0530';
    } else if (currentHour <= 8) {
        baseTime = '0630';
    } else if (currentHour <= 9) {
        baseTime = '0730';
    } else if (currentHour <= 10) {
        baseTime = '0830';
    } else if (currentHour <= 11) {
        baseTime = '0930';
    } else if (currentHour <= 12) {
        baseTime = '1030';
    } else if (currentHour <= 13) {
        baseTime = '1130';
    } else if (currentHour <= 14) {
        baseTime = '1230';
    } else if (currentHour <= 15) {
        baseTime = '1330';
    } else if (currentHour <= 16) {
        baseTime = '1430';
    } else if (currentHour <= 17) {
        baseTime = '1530';
    } else if (currentHour <= 18) {
        baseTime = '1630';
    } else if (currentHour <= 19) {
        baseTime = '1730';
    } else if (currentHour <= 20) {
        baseTime = '1830';
    } else if (currentHour <= 21) {
        baseTime = '1930'
    } else if (currentHour <= 22) {
        baseTime = '2030';
    } else if (currentHour <= 23) {
        baseTime = '2130';
    } else if (currentHour <= 24) {
        baseTime = '2230';

    // } else if (currentHour >= 24) {
    //     baseTime = '2330';
    } else {
        console.error('Not service time');
        return;
    }

    console.log('Base Time:', baseTime);

    console.log('storedNx:', storedNx);
    console.log('storedNy:', storedNy);
    // console.log('보내기전:', process.env.REACT_APP_API_KEY)

    const response = await fetch(
    `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst` +
    `?serviceKey=${process.env.REACT_APP_API_KEY}` +
    `&pageNo=1` +
    `&numOfRows=60` +
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

    dispatch({
        part: 'scheduler',
        type: 'location',
        weather: weatherInfo
    });
    console.log(weatherInfo)

// const renderCategories = ['TMP', 'REH', 'SKY', 'POP', 'PTY', 'PCP', 'VEC', 'WSD'];


const getRenderName = (originalCategory) => {
    switch (originalCategory) {
        case 'T1H':
            return '온도'; //
        case 'UUU':
            return '풍속(동서)';
        case 'VEC':
            return '풍향'; //
        case 'WSD':
            return '풍속'; //
        case 'SKY':
            return '구름'; //
        // case 'POP':
        //     return '강수확률'; //
        // case 'WAV':
        //     return '파도높이';
        case 'PTY':
            return '강수형태'; //         
        case 'VVV':
            return '풍속(남북)';
        case 'RN1':
            return '강수량'; //
        case 'REH':
            return '습도'; //
        case 'LGT':
            return '낙뢰';
        // case 'SNO':
        //     return '적설';
        default:
            return originalCategory; 
    }
};


// /////////////////////
    const handleSaveAndFetch = () => {
        // 세션 정보를 SchedulerWeatherLocation 모듈에 전송
        onFetchLocationData(
            selectedLocation1,
            selectedLocation2,
            selectedLocation3,
        );

    };

    const handleClearSelection = () => {
        if (weatherInfo !== null) {
            setWeatherInfo([]);
            dispatch({
                part: 'scheduler',
                type: 'location',
                weather: [],
                where: []
            });
        }
    };
    
    

    const onFetchLocationData = async (location1, location2, location3) => {
        console.log('Location 1:', location1);
        console.log('Location 2:', location2);
        console.log('Location 3:', location3);

        try {
            const response = await fetch(`${DjangoServer}/api/get_nx_ny/`, {
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

        if (!response.ok) {
            console.error('Failed to fetch nx and ny data.');
            return;
        }

        const data = await response.json();
        console.log('서버 응답:', data);

        if (data.error && data.error.includes('Not service time')) {
            console.error('서비스 시간이 아닙니다');
        } else {
            const { nx, ny } = data;
            const where = { nx, ny };

            setStoredNx(nx);
            setStoredNy(ny);
    
            // nx와 ny가 설정된 후에 onFetchWeatherData 호출
            await onFetchWeatherData(nx, ny);
            setWhere(where);

            dispatch({
                part: 'scheduler',
                type: 'location',
                where: where
            });
            console.log(where)
        }
    } catch (error) {
        console.error('서버 통신 오류:', error);
    }
};
    
    return (
        <div id="weatherInfoViewer">
            <div className='locationSelectorBox'>

            <div id='weatherselectbox'>
                <div className='questionOverlayContainer wet'>
                <h3>날씨정보</h3>
                <CalendarOverlay tooltipText={<>선택하신 지역의 현재 날씨를 알려드립니다.
                <br />1시부터 1시 사이에는 날씨 정보가 제공되지 않습니다.</>} />
                </div>
                    {/* <label className='locationSelector'>시/도:</label> */}
                    <select className='locationDropdown' onChange={handleLocation1Change} value={selectedLocation1}>
                        <option className='location' value="">시/도</option>
                        {location1.map((location, index) => (
                            <option key={index} value={location}>
                                {location}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='locationSelectorBox'>
                    {/* <label className='locationSelector'>시/군/구:</label> */}
                    <select className='locationDropdown' onChange={handleLocation2Change} value={selectedLocation2}>
                        <option value="">시/군/구</option>
                        {location2.map((location, index) => (
                            <option key={index} value={location}>
                                {location}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='locationSelectorBox'>
                    {/* <label className='locationSelector'>읍/면/동:</label> */}
                    <select className='locationDropdown' onChange={handleLocation3Change} value={selectedLocation3}>
                        <option value="">읍/면/동</option>
                        {location3.map((location, index) => (
                            <option key={index} value={location}>
                                {location}
                            </option>
                        ))}
                    </select><br />
                </div>
                <div>
                    <button className='schedulerBtn' onClick={handleSaveAndFetch}>날씨 확인하기</button>
                </div>
            </div>

                <ul style={{ listStyleType: 'none' }}>
                {Object.keys(weatherInfo).map((time, index) => (
                        <li key={time}>
                        <div id='printedWeatherInfo'>
                        <strong className={`weatherPrintTitle ${index === 0 ? 'firstItem' : ''}`}>{formatTime(time)}</strong>
                            {weatherInfo[time]['SKY'] && weatherInfo[time]['PTY'] ? (
                        <>          
                            <div className={`weatherPrintContainer ${index === 0 ? 'firstItem' : ''}`}>

                                <div className='weatherTextPrint'>
                                <span>&nbsp;구 름 양   </span><br/>
                                <span>&nbsp;강수형태  </span><br/>
                                <span>&nbsp;강 수 량    </span><br/>
                                <span>&nbsp;평균기온  </span><br/>
                                <span>&nbsp;습 &nbsp;&nbsp; 도   </span><br/>
                                <span>&nbsp;풍 &nbsp;&nbsp; 향   </span><br/>
                                <span>&nbsp;풍 &nbsp;&nbsp; 속   </span><br/>
                                </div>
                                <div className='weatherInfoPrint'>
                                <span>: {sky_code[parseInt(weatherInfo[time]['SKY'])]}</span><br/>
                                <span>: {pty_code[parseInt(weatherInfo[time]['PTY'])]}</span><br/>
                                <span>: {weatherInfo[time]['RN1'] !== '강수없음' ? weatherInfo[time]['RN1'] : '-'}</span><br/>
                                <span>: {weatherInfo[time]['T1H'] && parseFloat(weatherInfo[time]['T1H'])}℃</span><br/>
                                <span>: {weatherInfo[time]['REH'] && parseFloat(weatherInfo[time]['REH'])}%</span><br/>
                                <span>: {weatherInfo[time]['VEC'] && weatherInfo[time]['WSD'] && degToDir(parseFloat(weatherInfo[time]['VEC']))}{' '}</span><br/>
                                <span>: {weatherInfo[time]['VEC'] && weatherInfo[time]['WSD'] && parseFloat(weatherInfo[time]['WSD'])}m/s</span>
                                <span id='windstr' style={{marginBottom:'10px'}}>{getWindStrength(weatherInfo[time]['VEC'], weatherInfo[time]['WSD'])}</span>

                                </div>

                                </div>
                                <hr />
                            </>
                            ) : (
                            <div>-</div>
                            )}
                        </div>
                        </li>
                    ))}
                </ul>

            {Object.keys(weatherInfo).length > 0 && (
                    <button className='schedulerBtn weatherClear' onClick={handleClearSelection}>날씨 비우기</button>
                )}                
        </div>
    );
};


const formatTime = (fcstTime) => {
    const currentDate = new Date();
    // const nextDate = currentDate.getDay()+1;
    // const currentHour = currentDate.getHours();
    const year = currentDate.getFullYear();
    let month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    let day = currentDate.getDate().toString().padStart(2, '0');
    let hours = fcstTime.slice(0, 2);

    // if ((parseInt(hours, 10) > currentHour) && (parseInt(day, 10) > nextDate))
        // day = nextDate
    

    // if (parseInt(hours, 10) < currentHour) {
    //     if ((currentDate.getDate() + 1) > new Date(year, currentDate.getMonth() + 1, 0).getDate()) {
    //         month = (currentDate.getMonth() + 2).toString().padStart(2, '0');
    //         day = '01';
    //     } else {
    //         day = (currentDate.getDate() + 1).toString().padStart(2, '0');
    //     }
    // }

    return `${parseInt(year, 10)}년 ${parseInt(month, 10)}월 ${parseInt(day, 10)}일 ${hours}시`;
};

export default GridSelect;
