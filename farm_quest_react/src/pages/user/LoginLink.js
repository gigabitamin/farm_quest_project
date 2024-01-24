import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const LoginLink = ({ user }) => {
  const { isLoggedIn, username } = useSelector(state => state.loginUser);

  const dispatch = useDispatch();
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


  return (
    <div className="loginBox_hd">
      {isLoggedIn ? (
        <>
          <div className="login">{username}</div>
          <div className="logout">
            {/* <Link to="/logout">Logout</Link> */}
            <button key="logout" onClick={handleLogout}>
              로그아웃
            </button>            
          </div>
        </>
      ) : (
        <>
          <div className="resister">
            <Link to="/resister">회원가입</Link>
          </div>
          <div> / </div>
          <div className="login">
            <Link to="/login">로그인</Link>
          </div>
          {/* <Link to="/logout">Logout</Link> */}

        </>
      )}
    </div>
  );
};

export default LoginLink;
