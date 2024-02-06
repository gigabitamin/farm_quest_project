import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import alarm from '../../images/assets/alarm.png';


const LoginLink = ({ user }) => {
  const { isLoggedIn, username } = useSelector(state => state.loginUser);
  const [cookies, setCookie, removeCookie] = useCookies(['id']);   
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    alert('안녕히 가세요, 용사님!');
    dispatch({
      part: 'loginUser',
      type: 'logout'
    })
    removeCookie('id');    
    removeCookie('user'); 
    // localStorage.clear();
    navigate('/')
  };

  
  return (
    <div className="loginBox_hd">
      {isLoggedIn ? (
      <div className="flexContainer">
          <div className='logonUserNotice'>
              <img className='logonUserNotice' src={alarm} alt="Right-aligned image" />
          </div>

          <div className='loggedinContainer'>
            <div className="logonUserFunction">
              <button key="logout" className="logoutBtn" onClick={handleLogout}>
                <Link to="/"></Link>로그아웃
              </button>
              <div style={{textAlign: 'center'}} title="회원정보로 이동" className="loginUser">            
                <Link to="/MyPageMain">
                  {username}
                </Link>       
              </div>                
            </div>
          </div>
        </div>
      ) : (
        <>
        <div id='logoffUserFunction'>
          <div className='userNotice'>
          </div>
            <div className='logOn'>
              <Link to="/resister">
                <div className="resister">
                  회원가입
                </div>
              </Link>
              <Link to="/login">
                <div className="login">
                  로그인
                </div>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LoginLink;
