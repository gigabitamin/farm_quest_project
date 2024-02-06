import{ useEffect } from 'react';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';

const LoginCheck = () => {
    const DjangoServer = useSelector(state => state.DjangoServer);
    const [cookies] = useCookies(['id', 'username']);
    const dispatch = useDispatch();

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


    return null;

};

export default LoginCheck;
