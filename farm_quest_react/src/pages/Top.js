import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import GardeningShopIndex from './gardeningshop/GardeningShopIndex';
import DiagnosisLink from "./diagnosis/DiagnosisLink";
import DiagnosisIndex from "./diagnosis/DiagnosisIndex";
import DiagnosisChoice from "./diagnosis/DiagnosisChoice";
import DiagnosisAnswer from "./diagnosis/DiagnosisAnswer";
import DiagnosisResult from "./diagnosis/DiagnosisResult";
import DiagnosisUpload from "./diagnosis/DiagnosisUpload";
import DiagnosisUploadResult from "./diagnosis/DiagnosisUploadResult";
import DiagnosisRecommend from "./diagnosis/DiagnosisRecommend";
import Community from "./community/Community";


const Top = () => {    
    // const [currentPath, setCurrentPath] = useState('/');
    const [plantSpecies, setPlantSpecies] = useState(5);

    // 추가: 상품 필터링 및 페이지네이션을 위한 상태
    const [currentCategory, setCurrentCategory] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <div>
            <Routes>
                <Route path="/gardening_shop_index" element={<GardeningShopIndex currentCategory={currentCategory} setCurrentCategory={setCurrentCategory} currentPage={currentPage} setCurrentPage={setCurrentPage} />} />
                <Route path="/community/:mainType" element={<Community />} />
                                
                {/* 진단 페이지 시작 -kdy */}
                <Route path="/diagnosis_link" element={<DiagnosisLink />} />
                <Route path="/diagnosis_index" element={<DiagnosisIndex />} />
                <Route path="/diagnosis_choice" element={<DiagnosisChoice/>} />
                <Route path="/diagnosis_answer" element={<DiagnosisAnswer />} />
                <Route path="/diagnosis_result" element={<DiagnosisResult />} />
                <Route path="/diagnosis_upload" element={<DiagnosisUpload plantSpecies={plantSpecies} setPlantSpecies={setPlantSpecies} />} />
                <Route path="/diagnosis_upload_result" element={<DiagnosisUploadResult/>} />
                <Route path="/diagnosis_recommend/:solutionWord" element={<DiagnosisRecommend />}/>
                {/* 진단 페이지 끝 -kdy */}

            </Routes>
        </div>
    );
};

export default Top;





