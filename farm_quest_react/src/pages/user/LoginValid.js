import React, { useState, useEffect } from 'react';

const LoginValid = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {    
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {    
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <p>로그인 중입니다</p>
          <button onClick={handleLogout}>로그아웃</button>
        </div>
      ) : (
        <p>로그아웃 중입니다</p>
      )}
    </div>
  );
};

export default LoginValid;
