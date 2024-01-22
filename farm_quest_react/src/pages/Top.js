import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import GardeningShopIndex from './gardeningshop/GardeningShopIndex';
import DiagnosisIndex from "./diagnosis/DiagnosisIndex";
import DiagnosisAnswer from "./diagnosis/DiagnosisAnswer";
import DiagnosisResult from "./diagnosis/DiagnosisResult";

const Top = () => {
    // Define the initial values for the variables
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
            </Routes>
        </div>
    );
};

export default Top;





