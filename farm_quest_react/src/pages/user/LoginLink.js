import React from 'react';
import { Link } from 'react-router-dom';

const LoginLink = ({ user }) => {
  return (
    <div className="loginBox_hd">
      {user && user.is_authenticated ? (
        <>
          <div className="login">{user.username}</div>
          <div className="logout">
            <Link to="/logout">Logout</Link>
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
          <Link to="/logout">Logout</Link>
          <Link to="/login_valid">Login_valid</Link>
          <Link to="/user_info">User_info</Link>
        </>
      )}
    </div>
  );
};

export default LoginLink;
