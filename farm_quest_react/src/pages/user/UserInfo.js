import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const UserInfo = () => {
  const DjangoServer = useSelector(state => state.DjangoServer);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

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
        <p>loading..</p>
      )}
    </div>
  );
};

export default UserInfo;
