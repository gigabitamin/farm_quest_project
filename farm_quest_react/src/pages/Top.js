import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Community from "./community/Community";
import UserRouter from "./user/UserRouter"
import DiagnosisRouter from "./diagnosis/DiagnosisRoute"
import DiagnosisBoardRoute from "./diagnosisBoard/DiagnosisBoardRoute";
import GardeningShopIndex from './gardeningshop/GardeningShopIndex';
import GardeningShopDetail from './gardeningshop/GardeningShopDetail';
import GardeningShopSearch from './gardeningshop/GardeningShopSearch';
import GuideIndex from './guide/GuideIndex';
import GuideDetail from './guide/GuideDetail';
import Scheduler from './Scheduler/Scheduler';
import CsRouter from './customerCenter/CsRouter';
import MypageMain from './mypage/MypageMain';
import Body from './Body';
const Top = () => {    

    return (
        <div>
            <Routes>
                <Route path="/" element={<Body />}/>
                <Route path="/gardening_shop_index" element={<GardeningShopIndex />} />
                <Route path="/gardening_shop_detail/:id" element={<GardeningShopDetail />} />
                <Route path="/gardening_shop_search/:keyword/:user_id" element={<GardeningShopSearch />} />
                <Route path="/guide_index" element={<GuideIndex />} />
                <Route path="/guide_detail" element={<GuideDetail />} />
                <Route path="/community/:mainType" element={<Community />} />
                <Route path="Scheduler" element={<Scheduler />} />
            </Routes>
            {/* <GardeningShopRouter /> */}
            <DiagnosisBoardRoute />
            <UserRouter />
            <DiagnosisRouter />
            <CsRouter />
        </div>
    );
};

export default Top;
