import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const LoginLink = ({ user }) => {
  const DjangoServer = useSelector(state => state.DjangoServer);
  const { isLoggedIn, username } = useSelector(state => state.loginUser);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch({
      part: 'loginUser',
      type: 'logout'
    });
    fetch(`${DjangoServer}/logout/`, {
       method: 'POST',
       headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(localStorage);
      // localStorage.clear();
      window.location.replace(`${DjangoServer}/login`);
    });
  };
  console.log(username)
  console.log(user)

  return (
    <div className="loginBox_hd">
      {isLoggedIn ? (
        <>
          <div className="login">{username}</div>
          <div className="logout">            
            <button key="logout" onClick={handleLogout}>
              로그아웃
            </button>
            <button key="logout_real" onClick={handleLogout}>
              진짜 로그아웃
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
        </>
      )}
    </div>
  );
};

export default LoginLink;
