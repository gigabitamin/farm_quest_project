import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Community from "./community/Community";
import UserRouter from "./user/UserRouter"
import DiagnosisRouter from "./diagnosis/DiagnosisRoute"
import GardeningShopIndex from './gardeningshop/GardeningShopIndex';
import GardeningShopDetail from './gardeningshop/GardeningShopDetail';
import GardeningShopSearch from './gardeningshop/GardeningShopSearch';
import Scheduler from './Scheduler/Scheduler';

const Top = () => {    

    return (
        <div>
            <Routes>
                <Route path="/gardening_shop_index" element={<GardeningShopIndex />} />
                <Route path="/gardening_shop_detail/:id" element={<GardeningShopDetail />} />
                <Route path="/gardening_shop_search/:keyword" element={<GardeningShopSearch />} />
                <Route path="/community/:mainType" element={<Community />} />
                <Route path="Scheduler" element={<Scheduler />} />
            </Routes>
            <UserRouter />
            <DiagnosisRouter />
        </div>
    );
};

export default Top;
