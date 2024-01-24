import{ useEffect } from 'react';
// import React, { useEffect } from 'react';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
// import { useNavigate } from 'react-router-dom';

const LoginCheck = () => {
    const [cookies] = useCookies(['id', 'username']);
    const dispatch = useDispatch();
    // const history = useNavigate();

    useEffect(() => {
        checkLoginStatus();
    }, []);

    const checkLoginStatus = () => {
        const token = cookies.id;
        if (token) {            
            axios.post("http://127.0.0.1:8000/login_check/", { token: token })
                .then((response) => {
                    console.log(response)
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
    
    console.log(cookies)

    return null;
    // return <div></div>;
};

export default LoginCheck;
