import React from 'react';
import Logout from './Logout';
import Resister from './Resister';
import Login from './Login';
import { Routes, Route } from 'react-router-dom';
import LoginValid from './LoginValid';
import UserInfo from './UserInfo';
import TestLink from './TestLink'
import LoginCookie from './LoginCookie'
import LoginCheck from './LoginCheck'
import Profile from './Profile'
import DeleteProfile from './DeleteProfile'

const UserRouter = () => {
        return (

        <Routes>                  
            <Route path="/logout" element={<Logout />} />
            <Route path="/login_valid" element={<LoginValid />} />
            <Route path="/resister" element={<Resister />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user_info" element={<UserInfo />} />
            <Route path="/test_link" element={<TestLink />} />
            <Route path="/login_cookie" element={<LoginCookie />} />
            <Route path="/login_check" element={<LoginCheck />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/delete_profile" element={<DeleteProfile />} />
        </Routes>
        
    );
};

export default UserRouter;
