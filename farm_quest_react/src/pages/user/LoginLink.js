import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';

const LoginLink = ({ user }) => {
  const { isLoggedIn, username } = useSelector(state => state.loginUser);
  const [cookies, setCookie, removeCookie] = useCookies(['id']); 
  // 구조 분해 할당 하느라 앞에 변수 3개 필요해서 넣은 것이니 오류 떠있어도 수정하지 말 것

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch({
      part: 'loginUser',
      type: 'logout'
    });
    // 'id' 키를 가진 쿠키를 삭제
    removeCookie('id');
  };
  

  return (
    <div className="loginBox_hd">
      {isLoggedIn ? (
        <>
          <div className="loginUser">{username}</div>
          <div className="logout">            
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
        </>
      )}
    </div>
  );
};

export default LoginLink;
