import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const UserInfo = () => {
  const DjangoServer = useSelector(state => state.DjangoServer);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    // 토큰이 있는 경우에만 사용자 정보를 불러옴
    if (token) {
      axios.get(`${DjangoServer}/user_info/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
    }
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <h2>사용자 정보</h2>          
          <p>이메일: {user.email}</p>          
        </div>
      ) : (
        <p>카레 먹고 싶다</p>
      )}
    </div>
  );
};

export default UserInfo;
