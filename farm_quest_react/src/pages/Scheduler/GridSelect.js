import React, { useEffect, useState } from 'react';

const GridSelect = ({ setStoredNx, setStoredNy }) => {
    const [location1, setLocation1] = useState([]);
    const [location2, setLocation2] = useState([]);
    const [location3, setLocation3] = useState([]);
    const [selectedLocation1, setSelectedLocation1] = useState('');
    const [selectedLocation2, setSelectedLocation2] = useState('');
    const [selectedLocation3, setSelectedLocation3] = useState('');
    const [informations, setInformations] = useState({});

    // 위치선택 가져오기
    useEffect(() => {
        fetch('/api/get_grid_data/')
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
                const response = await fetch(`/api/get_location2_data/?location1=${selectedLocation1}`);
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
                const response = await fetch(`/api/get_location3_data/?location1=${selectedLocation1}&location2=${selectedLocation2}`);
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
const onFetchWeatherData = async () => {
    const formattedDate = 20240129
    const baseTime = 1100
    const storedNx = 92
    const storedNy = 132
    
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

    const data = await response.json();
    console.log('data:', data)


    const rawData = data.response.body.items.item;
    const informations = {};

    rawData.forEach(item => {
    const { category, fcstTime, fcstValue } = item;

    if (!informations[fcstTime]) {
        informations[fcstTime] = {};
    }

    informations[fcstTime][category] = fcstValue;
    });

    console.log(informations);
    setInformations(informations); 

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
        // sessionStorage.setItem('selectedLocation1', selectedLocation1);
        // sessionStorage.setItem('selectedLocation2', selectedLocation2);
        // sessionStorage.setItem('selectedLocation3', selectedLocation3);
        onFetchWeatherData ();


        // 세션 정보를 SchedulerWeatherLocation 모듈에 전송
        onFetchLocationData(selectedLocation1, selectedLocation2, selectedLocation3,
            // sessionStorage.getItem('selectedLocation1'),
            // sessionStorage.getItem('selectedLocation2'),
            // sessionStorage.getItem('selectedLocation3'),
            setStoredNx, // setStoredNx 함수 전달
            setStoredNy  // setStoredNy 함수 전달

        );
    };
    const onFetchLocationData = (location1, location2, location3) => {
        console.log('Location 1:', location1);
        console.log('Location 2:', location2);
        console.log('Location 3:', location3);

        fetch('/api/get_nx_ny/', {
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
                sessionStorage.setItem('nx', data.nx);
                sessionStorage.setItem('ny', data.ny);
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

                {/* informations를 렌더링하는 코드 추가 */}
                <h2>날씨정보</h2>
                <ul>
                {Object.keys(informations).map(time => (
                    <li key={time}>
                        <strong>{formatTime(time)}</strong>
                        <ul>
                        {Object.entries(informations[time]).map(([category, value]) => (
                                // 선택한 카테고리만 렌더링
                                renderCategories.includes(getRenderName(category)) && (
                                    <li key={category}>
                                        {getRenderName(category)}: {value}
                                    </li>
                                )
                            ))}

                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const formatTime = (time) => {
    // 20240129 1200 -> 2024-01-29 12:00
    return `${time.substring(0, 4)}-${time.substring(4, 6)}-${time.substring(6, 8)} ${time.substring(8, 10)}:${time.substring(10, 12)}`;
};

export default GridSelect;
