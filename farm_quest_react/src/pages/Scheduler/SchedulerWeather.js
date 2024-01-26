import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LocationDropdown = () => {
  const [locationOptions1, setLocationOptions1] = useState([]);
  const [locationOptions2, setLocationOptions2] = useState([]);
  const [locationOptions3, setLocationOptions3] = useState([]);
  const [selectedLocation1, setSelectedLocation1] = useState('');
  const [selectedLocation2, setSelectedLocation2] = useState('');
  const [selectedLocation3, setSelectedLocation3] = useState('');

  const [weatherData, setWeatherData] = useState(null);

  const handleLocationChange = async () => {
    try {
      // 각 드롭다운의 위치 정보를 서버에 전송
      
      const response1 = await axios.get('http://localhost:8000/get_location_options/1/');
      setLocationOptions1(response1.data.options);

      if (selectedLocation1) {
        const response2 = await axios.get(`http://localhost:8000/get_location_options/2/?parent_location=${selectedLocation1}`);
        setLocationOptions2(response2.data.options);
      }

      if (selectedLocation2) {
        const response3 = await axios.get(`http://localhost:8000/get_location_options/3/?parent_location=${selectedLocation2}`);
        setLocationOptions3(response3.data.options);
      }
    } catch (error) {
      console.error('Error fetching location options:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      const csrfCookie = document.cookie.split('; ').find(row => row.startsWith('csrftoken'));
      const csrfToken = csrfCookie ? csrfCookie.split('=')[1] : null;
      
      // Axios 설정
      axios.defaults.headers.common['X-CSRFToken'] = csrfToken;
      axios.defaults.withCredentials = true;
      
  
      // 선택된 세 위치 정보를 서버에 전송
      const response4 = await axios.post('http://localhost:8000/submit_selected_locations/', {
        location_1: selectedLocation1,
        location_2: selectedLocation2,
        location_3: selectedLocation3,
      });

      const weatherResponse = await axios.get('http://localhost:8000/weather', {
        params: {
          location_1: selectedLocation1,
          location_2: selectedLocation2,
          location_3: selectedLocation3,
        },
      });
    setWeatherData(weatherResponse.data);
  } catch (error) {
    console.error('Error submitting selected locations:', error);
  }
};
  
  

  useEffect(() => {
    // level 1 options 가져오기
    axios.get('http://localhost:8000/get_location_options/1/')
      .then(response => {
        setLocationOptions1(response.data.options);
      })
      .catch(error => {
        console.error('Error fetching location options:', error);
      });
  }, []);

  useEffect(() => {
    // level 2 options 가져오기
    if (selectedLocation1) {
      axios.get(`http://localhost:8000/get_location_options/2/?parent_location=${selectedLocation1}`)
        .then(response => {
          setLocationOptions2(response.data.options);
        })
        .catch(error => {
          console.error('Error fetching location options:', error);
        });
    }
  }, [selectedLocation1]);

  useEffect(() => {
    // level 3 options 가져오기
    if (selectedLocation2) {
      axios.get(`http://localhost:8000/get_location_options/3/?parent_location=${selectedLocation2}`)
        .then(response => {
          setLocationOptions3(response.data.options);
        })
        .catch(error => {
          console.error('Error fetching location options:', error);
        });
    }
  }, [selectedLocation2]);

  return (
    <div id='weatherDropDown'>
      <select
        value={selectedLocation1}
        onChange={(e) => {
          setSelectedLocation1(e.target.value);
          setSelectedLocation2('');
          setSelectedLocation3('');
          handleLocationChange(); // 선택이 변경될 때마다 서버로 보내는 로직 호출
        }}
      >
        <option value="">시/도</option>
        {locationOptions1.map(option => (
          <option key={option.id} value={option.id}>{option.name}</option>
        ))}
      </select>

      {selectedLocation1 && (
        <select
          value={selectedLocation2}
          onChange={(e) => {
            setSelectedLocation2(e.target.value);
            setSelectedLocation3('');
            handleLocationChange(); // 선택이 변경될 때마다 서버로 보내는 로직 호출
          }}
        >
          <option value="">시/군/구</option>
          {locationOptions2.map(option => (
            <option key={option.id} value={option.id}>{option.name}</option>
          ))}
        </select>
      )}

      {selectedLocation2 && (
        <select
          value={selectedLocation3}
          onChange={(e) => {
            setSelectedLocation3(e.target.value);
            handleLocationChange(); // 선택이 변경될 때마다 서버로 보내는 로직 호출
          }}
        >
          <option value="">읍/면/동</option>
          {locationOptions3.map(option => (
            <option key={option.id} value={option.id}>{option.name}</option>
          ))}
        </select>
      )}

      {selectedLocation3 && (
        <button onClick={handleSubmit}>위치 조회</button>
      )}
      
      {/* 날씨 데이터 출력 */}
      {weatherData && (
        <div>
          <h2>날씨 정보</h2>
          <p>TMP: {weatherData.TMP}</p>
          <p>NX: {weatherData.nx}</p>
          <p>NX: {weatherData.nx}</p>
          <p>NY: {weatherData.ny}</p>
          {/* 추가적인 날씨 정보 표시 가능 */}
        </div>
      )}
    </div>
  );
};

export default LocationDropdown;
