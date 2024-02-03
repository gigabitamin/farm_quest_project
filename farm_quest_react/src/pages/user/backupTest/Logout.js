import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


function Logout() {
  const dispatch = useDispatch();
  const { isLoggedIn, username } = useSelector(state => state.loginUser);
  const [auth, setAuth] = useState('')

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      setAuth(true);
    }
  }, [])

  const handleLogout = () => {
    dispatch({
      part: 'loginUser',
      type: 'logout'
    });
    fetch('http://127.0.0.1:8000/logout/', {
       method: 'POST',
       headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      localStorage.clear();
      window.location.replace('http://localhost:3000/login');
    });
  };

  return(
    <div>

          { isLoggedIn ?
            <button key="logout" onClick={handleLogout}>
              로그아웃
            </button>
            :
            <button key="login">
              <Link to="/login">
              로그인
              </Link>
            </button>
          }
          { isLoggedIn ?
            <></>
          :
            <button key="register">
              <Link to="/register">
              회원가입
              </Link>
            </button>
          }

    </div>
  )
}

export default Logout;