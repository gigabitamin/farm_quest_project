import React from 'react';
import MyProfile from './MyProfile'
import MypageSidebar from './MypageSidebar';

const MypageMain = () => {
    return (
        <div className='mypageWrap'>
            <div>
                <MypageSidebar />
                </div>
            <div>
                <MyProfile />
            </div>
        </div>
    );
};

export default MypageMain;