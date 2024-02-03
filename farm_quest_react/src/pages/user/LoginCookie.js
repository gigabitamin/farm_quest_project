
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const LoginCheck = (props) => {
	const DjangoServer = useSelector(state => state.DjangoServer);
	const [cookies, removeCookie] = useCookies(['id']);
	const [username, setUserId] = useState(null);
	const navigate = useNavigate();

	const authCheck = () => { 
		const token = cookies.id; 
    console.log(token)
		axios
			.post(`${DjangoServer}/login_check`, { token: token }) 
			.then((response) => {
        console.log(response.data.id)
				setUserId(response.data.id); 
        console.log('cookies')
        console.log(token)
			})
			.catch(() => {
				// logOut();
        alert('로그인 쿠키 저장 에러')
			});
	};

	useEffect(() => {
		authCheck();
  });

	const logOut = () => {
		removeCookie('id'); 
		navigate('/'); 
	};

	return (
		<>
			{username && <h1>{username}</h1>} 
			<button onClick={logOut}>로그아웃</button>
		</>
	);
};
export default LoginCheck;