import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';

const LoginLink = ({ user }) => {
  const { isLoggedIn, username } = useSelector(state => state.loginUser);
  const [cookies, setCookie, removeCookie] = useCookies(['id']);   
  
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch({
      part: 'loginUser',
      type: 'logout'
    });
    removeCookie('id');    
    removeCookie('user'); 
    // localStorage.clear();
  };


  return (
    <div className="loginBox_hd">
      {isLoggedIn ? (
        <div>
          <div className="logout">            
            <button key="logout" onClick={handleLogout}>
              로그아웃
            </button>
          </div>
          <div title="회원정보로 이동" className="loginUser">            
            <Link to="./MypageMain">
              {username}
            </Link>                        
          </div>
        </div>
      ) : (
        <>
          <div className="resister">
            <Link to="/resister">회원가입</Link>
          </div>
          <div> </div>
          <div className="login">
            <Link to="/login">로그인</Link>
          </div>          
        </>
      )}
    </div>
  );
};

export default LoginLink;
