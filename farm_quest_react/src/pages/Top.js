import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import GardeningShopIndex from './gardeningshop/GardeningShopIndex';
import Community from "./community/Community";
import UserRouter from "./user/UserRouter"
import DiagnosisRouter from "./diagnosis/DiagnosisRoute"


const Top = () => {    


    // 추가: 상품 필터링 및 페이지네이션을 위한 상태
    const [currentCategory, setCurrentCategory] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <div>            
            <Routes>
                <Route path="/gardening_shop_index" element={<GardeningShopIndex currentCategory={currentCategory} setCurrentCategory={setCurrentCategory} currentPage={currentPage} setCurrentPage={setCurrentPage} />} />
                <Route path="/gardening_shop_detail/:id" element={<GardeningShopDetail />} />

                <Route path="/community/:mainType" element={<Community />} />

            </Routes>
            <UserRouter />
            <DiagnosisRouter />
            
        </div>
    );
};

export default Top;





