import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Community from "./community/Community";
import UserRouter from "./user/UserRouter"
import DiagnosisRouter from "./diagnosis/DiagnosisRoute"
// import GardeningShopIndex from './gardeningshop/GardeningShopIndex';
// import GardeningShopDetail from './gardeningshop/GardeningShopDetail';
import Scheduler from './Scheduler/Scheduler';
import GardeningShopRouter from './gardeningshop/GardeningShopRouter';


const Top = () => {    


    // 추가: 상품 필터링 및 페이지네이션을 위한 상태
    // const [currentCategory, setCurrentCategory] = useState('all');
    // const [currentPage, setCurrentPage] = useState(1);

    return (
        <div>            
            <Routes>
                {/* <Route path="/gardening_shop_index" element={<GardeningShopIndex />} /> */}
                {/* <Route path="/gardening_shop_detail/:id" element={<GardeningShopDetail />} /> */}
                <Route path="/community/:mainType" element={<Community />} />
                <Route path="Scheduler" element={<Scheduler />} />
            </Routes>
            <GardeningShopRouter />
            <UserRouter />
            <DiagnosisRouter />
            
        </div>
    );
};

export default Top;