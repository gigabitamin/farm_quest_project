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
          <div className="Resister">
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
