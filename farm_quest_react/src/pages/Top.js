import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import GardeningShopIndex from './gardeningshop/GardeningShopIndex';
import DiagnosisIndex from "./diagnosis/DiagnosisIndex";
import DiagnosisChoice from "./diagnosis/DiagnosisChoice";
import DiagnosisAnswer from "./diagnosis/DiagnosisAnswer";
import DiagnosisResult from "./diagnosis/DiagnosisResult";
import Upload from "./diagnosis/Upload";
import UploadResult from "./diagnosis/UploadResult";
import Community from "./community/Community"
import DiagnosisRecommend from "./diagnosis/DiagnosisRecommend";



const Top = () => {
    const [solutionContent, setSolutionContent] = useState(null);
    const [diagnosisQuestions, setDiagnosisQuestions] = useState(null);    

    // 추가: 상품 필터링 및 페이지네이션을 위한 상태
    const [currentCategory, setCurrentCategory] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    return (
        <div>
            <Routes>
                <Route path="/gardening_shop_index" element={<GardeningShopIndex currentCategory={currentCategory} setCurrentCategory={setCurrentCategory} currentPage={currentPage} setCurrentPage={setCurrentPage} />} />
                <Route path="/diagnosis_index" element={<DiagnosisIndex solutionContent={solutionContent} setSolutionContent={setSolutionContent} />} />
                <Route path="/diagnosis_answer" element={<DiagnosisAnswer diagnosisQuestions={diagnosisQuestions} setDiagnosisQuestions={setDiagnosisQuestions} />} />
                <Route path="/diagnosis_result" element={<DiagnosisResult />} />
                <Route path="/diagnosis_choice" element={<DiagnosisChoice/>} />
                <Route path="/upload" element={<Upload/>} />
                <Route path="/upload_result" element={<UploadResult/>} />
                <Route path="/community/:mainType" element={<Community />} />
                <Route
                    path="/diagnosis_recommend/:solutionWord"
                    element={<DiagnosisRecommend />}
                />
            </Routes>
        </div>
    );
};

export default Top;





