import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const LoginValid = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const jsh = useRef();
  console.log(jsh.current)
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(state => state.loginUser)

  // redux 쓰면 딱히 필요 없어짐
  // useEffect(() => {    
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     setIsLoggedIn(true);
  //   } else {
  //     setIsLoggedIn(false);
  //   }
  // }, []);

  const handleLogout = () => {    
    localStorage.clear();
    // setIsLoggedIn(false);
    dispatch({
      part: 'loginUser',
      type: 'logout'
    });
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
