import React from 'react';
import Logout from './Logout';
import Resister from './Resister';
import Login from './Login';
import { Routes, Route } from 'react-router-dom';
import LoginValid from './LoginValid';
import UserInfo from './UserInfo';
import TestLink from './TestLink'
import LoginCookie from './LoginCookie'

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

        </Routes>
    );
};

export default UserRouter;