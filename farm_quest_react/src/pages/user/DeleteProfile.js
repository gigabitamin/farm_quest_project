import React from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

const DeleteProfile = () => {
    const DjangoServer = useSelector(state => state.DjangoServer);
    const [cookies, setCookie] = useCookies(['id']);
    const history = useNavigate();    
    const handleDeleteAccount = async () => {
        try {
            // const token = cookies.id;
            const token = cookies.id;
    
            const userId = cookies.user.id;
            console.log('token 123213', token)

            const response = await axios.delete(`${DjangoServer}/delete_profile/${userId}`, 
            {
                // headers: {
                //     'X-CSRFToken': token,
                // }
                headers: {
                    // "content-type": "multipart/form-data",
                    Authorization: `Token ${token}`,
                },
            });
            console.log('ress', response)
            alert('회원 탈퇴 완료')
            history("/");
            console.log('red',response.data);
           
        } catch (error) {
            console.error('회원 탈퇴 오류:', error);
        }
    };

    return (
        <div>            
            <button onClick={handleDeleteAccount}>회원 탈퇴</button>
        </div>
    );
};

export default DeleteProfile;
