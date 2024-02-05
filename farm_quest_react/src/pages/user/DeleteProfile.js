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
            const token = cookies.id;
            const userId = cookies.user.id;
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
            window.confirm('회원 탈퇴를 하시겠습니까?')
            alert('그동안 팜퀘스트를 이용해 주셔서 감사합니다')
            history("/");            
           
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
