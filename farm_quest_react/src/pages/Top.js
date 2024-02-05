import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Community from "./community/Community";
import UserRouter from "./user/UserRouter"
import DiagnosisRouter from "./diagnosis/DiagnosisRoute"
import GardeningShopIndex from './gardeningshop/GardeningShopIndex';
import GardeningShopDetail from './gardeningshop/GardeningShopDetail';
import GardeningShopSearch from './gardeningshop/GardeningShopSearch';
import GuideIndex from './guide/GuideIndex';
import GuideDetail from './guide/GuideDetail';
import GuideDetail2 from './guide/GuideDetail2';
import GuideDetail3 from './guide/GuideDetail3';
import GuideDetail4 from './guide/GuideDetail4';
import GuideDetail5 from './guide/GuideDetail5';
import GuideDetail6 from './guide/GuideDetail6';
import Scheduler from './Scheduler/Scheduler';
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
                <Route path="/guide_detail2" element={<GuideDetail2 />} />
                <Route path="/guide_detail3" element={<GuideDetail3 />} />
                <Route path="/guide_detail4" element={<GuideDetail4 />} />
                <Route path="/guide_detail5" element={<GuideDetail5 />} />
                <Route path="/guide_detail6" element={<GuideDetail6 />} />
                <Route path="/community/:mainType" element={<Community />} />
                <Route path="Scheduler" element={<Scheduler />} />
            </Routes>
            <UserRouter />
            <DiagnosisRouter />
        </div>
    );
};

export default Top;
