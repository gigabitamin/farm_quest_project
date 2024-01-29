import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GardeningShopIndex from './GardeningShopIndex';
import GardeningShopDetail from './GardeningShopDetail';

const GardeningShopRouter = () => {
        return (

        <Routes>                  

            <Route path="/gardening_shop_index" element={<GardeningShopIndex />} />
            <Route path="/gardening_shop_detail/:id" element={<GardeningShopDetail />} />

        </Routes>
        
    );
};

export default GardeningShopRouter;
