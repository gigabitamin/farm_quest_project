import React from 'react';
import Resister from './Resister';
import Login from './Login';
import { Routes, Route } from 'react-router-dom';
import UserInfo from './UserInfo';
import LoginCookie from './LoginCookie'
import LoginCheck from './LoginCheck'
import Profile from './Profile'
import DeleteProfile from './DeleteProfile'

const UserRouter = () => {
        return (

        <Routes>                  
            <Route path="/resister" element={<Resister />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user_info" element={<UserInfo />} />            
            <Route path="/login_cookie" element={<LoginCookie />} />
            <Route path="/login_check" element={<LoginCheck />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/delete_profile" element={<DeleteProfile />} />
        </Routes>
        
    );
};

export default UserRouter;
