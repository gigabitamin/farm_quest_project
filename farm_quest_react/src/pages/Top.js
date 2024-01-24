import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import GardeningShopIndex from './gardeningshop/GardeningShopIndex';
import DiagnosisLink from "./diagnosis/DiagnosisLink";
import DiagnosisIndex from "./diagnosis/DiagnosisIndex";
import DiagnosisChoice from "./diagnosis/DiagnosisChoice";
import DiagnosisAnswer from "./diagnosis/DiagnosisAnswer";
import DiagnosisResult from "./diagnosis/DiagnosisResult";
<<<<<<< HEAD
import Upload from "./diagnosis/Upload";
import UploadResult from "./diagnosis/UploadResult";
<<<<<<< HEAD
<<<<<<< HEAD
import Community from "./community/Community"
=======
import DiagnosisRecommend from "./diagnosis/DiagnosisRecommend";

>>>>>>> feather
=======
import Community from "./community/Community"
=======
import DiagnosisUpload from "./diagnosis/DiagnosisUpload";
import DiagnosisUploadResult from "./diagnosis/DiagnosisUploadResult";
>>>>>>> a55011dd9125ad715e68fe9bedea1d174aa5653f
import DiagnosisRecommend from "./diagnosis/DiagnosisRecommend";
import Community from "./community/Community";

>>>>>>> a3ac7b8498e223b920e3f02e264242a98ef30f80

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
<<<<<<< HEAD
                <Route path="/diagnosis_index" element={<DiagnosisIndex solutionContent={solutionContent} setSolutionContent={setSolutionContent} />} />
                <Route path="/diagnosis_answer" element={<DiagnosisAnswer diagnosisQuestions={diagnosisQuestions} setDiagnosisQuestions={setDiagnosisQuestions} />} />
                <Route path="/diagnosis_result" element={<DiagnosisResult />} />
                <Route path="/diagnosis_choice" element={<DiagnosisChoice/>} />
                <Route path="/upload" element={<Upload/>} />
                <Route path="/upload_result" element={<UploadResult/>} />
<<<<<<< HEAD
<<<<<<< HEAD
                <Route path="/community/:mainType" element={<Community />} />
=======
=======
                <Route path="/community/:mainType" element={<Community />} />
>>>>>>> a3ac7b8498e223b920e3f02e264242a98ef30f80
                <Route
                    path="/diagnosis_recommend/:solutionWord"
                    element={<DiagnosisRecommend />}
                />
<<<<<<< HEAD
>>>>>>> feather
=======
>>>>>>> a3ac7b8498e223b920e3f02e264242a98ef30f80
=======
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

>>>>>>> a55011dd9125ad715e68fe9bedea1d174aa5653f
            </Routes>
        </div>
    );
};

export default Top;





