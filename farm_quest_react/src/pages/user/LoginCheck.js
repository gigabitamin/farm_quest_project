import{ useEffect } from 'react';
// import React, { useEffect } from 'react';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

const LoginCheck = () => {
    const DjangoServer = useSelector(state => state.DjangoServer);
    const [cookies] = useCookies(['id', 'username']);
    const dispatch = useDispatch();
    // const history = useNavigate();

    useEffect(() => {
        checkLoginStatus();
    }, []);

    const checkLoginStatus = () => {
        const token = cookies.id;
        
        if (token) {            
            axios.post(`${DjangoServer}/login_check/`, { token: token })
                .then((response) => {                    
                    if (response.status < 300) {                    
                        dispatch({
                            part: 'loginUser',
                            type: 'login',
                            username: response.data.username
                        });
                        // history("/");                        
                    }
                })
                .catch(() => {                    
                    dispatch({
                        part: 'loginUser',
                        type: 'logout',
                    });
                });
        }
    };

    console.log('cookies.id = ', cookies.id)
    console.log('cookies = ', cookies)
    console.log('cookie.username = ', cookies.username)

    return null;
    // return <div></div>;
};

export default LoginCheck;
