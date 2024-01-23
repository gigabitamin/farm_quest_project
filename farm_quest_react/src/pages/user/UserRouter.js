import React from 'react';
import Logout from './Logout';
import Resister from './Resister';
import Login from './Login';
import { Routes, Route } from 'react-router-dom';

const UserRouter = () => {
    

    return (
       

            <Routes>
                <Route path="/logout" component={Logout} />
                <Route path="/resister" component={Resister} />
                <Route path="/login" component={Login} />                
            </Routes>            

    );
};

export default UserRouter;